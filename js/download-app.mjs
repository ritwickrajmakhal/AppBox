import { getQueryParam } from "./query-param.mjs";

export class DownloadApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const storedData = JSON.parse(localStorage.getItem("store"));
    const data = storedData.find((item) => item.name === getQueryParam("name"));
    this.render(data);

    const installButton = this.shadowRoot.querySelector("md-filled-button");
    const progressBar = this.shadowRoot.querySelector("md-circular-progress");
    const progressText = this.shadowRoot.querySelector(".progress-text");

    if (data.type === "PWA" && data.pwa_link) {
      installButton.setAttribute("href", data.pwa_link);
      installButton.setAttribute("target", "_blank");
      installButton.textContent = "Open";
    } else {
      installButton.addEventListener("click", async () => {
        const url = `https://raw.githubusercontent.com/LiquidGalaxyLAB/Data/refs/heads/main${data.base_url}${data.file}`;
        alert(url);
        const response = await fetch(url);
        const contentLength = response.headers.get("content-length");

        if (!contentLength) {
          alert(
            "Unable to fetch content length. Progress tracking may not work."
          );
          return;
        }

        const total = parseInt(contentLength, 10);
        let received = 0;

        const reader = response.body.getReader();
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;

          const fractionComplete = received / total;
          progressBar.setAttribute("value", fractionComplete);
          progressText.textContent = `Progress: ${Math.floor(
            fractionComplete * 100
          )}%`;
        }

        const blob = new Blob(chunks);
        const downloadUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${data.file}`;
        a.click();

        URL.revokeObjectURL(downloadUrl);
      });
    }

    const shareButton = this.shadowRoot.querySelector(
      "md-filled-tonal-icon-button"
    );
    shareButton.addEventListener("click", async () => {
      const shareData = {
        title: data.name,
        text: data.content || `Check out the app ${data.name}`,
        url: `https://store.liquidgalaxy.eu/pages/app.html?name=${encodeURIComponent(
          data.name
        )}`,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error("Sharing failed:", err.message);
        }
      } else {
        alert("Web Share API is not supported on this device.");
      }
    });
  }

  render(data) {
    this.shadowRoot.innerHTML = `
      <style>
           .main {
                padding: 20px;
                margin-block-start: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 25px;
            }

            .main h1 {
                color: var(--md-sys-color-primary);
            }

            .main img {
                background-color: var(--md-sys-color-on-tertiary-container);
                padding: 10px;
                border-radius: 20px;
            }

            md-filled-tonal-icon-button {
                aspect-ratio: 1/1;
            }

            md-filled-button {
                max-inline-size: 600px;
                inline-size: 100%;
                margin: auto;
                font-size: 1rem;
            }

            .main p {
                color: var(--md-sys-color-on-background);
            }

            .button {
                text-align: center;
                padding: 20px;
            }

            .downloading {
                display: flex;
                gap: 10px;
                align-items: center;
                font-size: 1.2rem;
                margin-block-start: 10px;
                text-align: start;
            }

            .badge {
                display: flex;
                gap: 5px;
                text-transform: capitalize;
            }
      </style>
      <div class="main">
        <img src="https://raw.githubusercontent.com/LiquidGalaxyLAB/Data/refs/heads/main${
          data.base_url
        }${data.icon}" 
             alt="${data.name}" height="120px" width="auto">
        <div>
          <h1>${data.name}</h1>
          <div class="downloading">
            <md-circular-progress value="0"></md-circular-progress>
            <p class="progress-text">Progress: 0%</p>
          </div>
          <div class="badge">
            <md-assist-chip label="${data.category}"></md-assist-chip>
            <md-assist-chip label="${data.type}"></md-assist-chip>
          </div>
        </div>
        <md-filled-tonal-icon-button>
          <md-icon>share</md-icon>
        </md-filled-tonal-icon-button>
      </div>
      <div class="button">
        <md-filled-button>${
          data.type === "PWA" && data.pwa_link ? "Open" : "Install"
        }</md-filled-button>
      </div>
    `;
  }
}
