import { getQueryParam } from "./query-param.mjs";

export class AppDetailsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  get data() {
    const storedData = JSON.parse(localStorage.getItem("store"));
    if (!storedData) {
      console.error("No data found in localStorage.");
      return null;
    }
    const data = storedData.find((item) => item.name === getQueryParam("name"));
    if (!data) {
      console.error(
        `No matching data found for name: ${getQueryParam("name")}`
      );
    }
    return data || this.defaultData();
  }

  defaultData() {
    return {
      name: "Unknown App",
      type: "Unknown Type",
      date: "1970-01-01",
      android_OS: "N/A",
      version: "N/A",
      content: "No content available.",
    };
  }

  render() {
    const appData = this.data;
    if (!appData) {
      this.shadowRoot.innerHTML = `<p>Error: Unable to load app details.</p>`;
      return;
    }

    const { name, type, date, android_OS, version, content } = appData;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          line-height: 1.6;
        }
        
        div{
          color: var(--md-sys-color-on-background);
        }
  
        h2 {
          font-size: 1.5rem;
          margin-block-end: 0.5rem;
        }
  
        .content {
          margin-block-start: 1rem;
        }
        md-assist-chip{
          text-transform: capitalize;
        }
      </style>
  
      <div>
        <h2>About ${name}</h2>
        <md-assist-chip label="${type}"></md-assist-chip>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Android OS:</strong> ${android_OS}</p>
        <p><strong>Version:</strong> ${version}</p>
        <div class="content">
          <p>${content.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `;
  }
}
