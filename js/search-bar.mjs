import { getQueryParam } from "./query-param.mjs";

export class Searchbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.value = getQueryParam("app") || "";
    this.timer = null;
    this.speechRecognitionExists = true;

    const appName = getQueryParam("app");

    if (appName) this.debouncedSearch(appName);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.debounce = this.debounce.bind(this);
    this.handleMicClick = this.handleMicClick.bind(this);

    this.speechRecognition = null;
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      this.speechRecognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      this.speechRecognition.continuous = false;
      this.speechRecognition.lang = "en-US";
      this.speechRecognition.interimResults = false;
    } else {
      this.speechRecognitionExists = false;
    }
  }

  debounce(func, delay) {
    return (...args) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => func(...args), delay);
    };
  }
  handleInputChange(e) {
    const inputValue = e.target.value;
    this.value = inputValue;
    this.debouncedSearch(inputValue);
  }

  debouncedSearch = this.debounce((searchValue) => {
    this.dispatchEvent(new CustomEvent("search", { detail: searchValue }));
  }, 1200);

  handleMicClick() {
    if (this.speechRecognition) {
      this.speechRecognition.start();
      setTimeout(() => {
        this.speechRecognition.stop();
      }, 5000);
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }

  static get observedAttributes() {
    return ["placeholder"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "placeholder" && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .searchbar {
          position: relative;
          inline-size: 100%;
        }

        .searchLabel {
          position: absolute;
          inset-inline-start: 20px;
          inset-block-start: 15px;
        }

        input[type="search"] {
          block-size: 50px;
          inline-size: 100%;
          font-size: 1.25rem;
          font-weight: 400;
          padding-inline-start: 55px;
          border-radius: 40px;
          border: none;
          background-color: var(--md-sys-color-surface-container-low);
          color: var(--md-sys-color-on-background)
        }

        input[type="search"]::placeholder {
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--md-sys-color-outline)
        }

        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }

        input[type="search"]::-webkit-search-cancel-button {
          position: relative;
          inset-inline-end: 60px;
          display: block;
          -webkit-appearance: none;
          block-size: 20px;
          inline-size: 20px;
          border-radius: 10px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('./assets/Cancel.svg');
        }

        input[type="search"]:focus {
          outline: 1px solid var(--md-sys-color-on-background);
        }

        button {
          position: absolute;
          inset-inline-end: 15px;
          inset-block-start: 12px;
          background: transparent;
          border: none;
          padding-inline: 10px;
          cursor: pointer;
        }

        button img {
          width: 24px;
          height: 24px;
        }
      </style>

      <div class="searchbar">
        <label class="searchLabel" for="search">
          <img src="./assets/Searchbar.svg" alt="Search icon" />
        </label>
        <input
          id="search"
          class="inputSearch"
          type="search"
          value="${this.value}"
          placeholder="${
            this.getAttribute("placeholder") || "Search the web store"
          }"
          aria-label="Search the web store"
        />
        <button class="mic"><img src="./assets/Microphone.svg" alt="voice search"></button>
      </div>
    `;

    this.shadowRoot
      .querySelector("input")
      .addEventListener("input", this.handleInputChange);
    this.shadowRoot
      .querySelector(".mic")
      .addEventListener("click", this.handleMicClick);
    if (!this.speechRecognitionExists)
      this.shadowRoot.querySelector(".mic").style.display = "none";
    if (this.speechRecognition) {
      this.speechRecognition.onstart = () => {
        console.log("Speech recognition started.");
      };

      this.speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.value = transcript;
        this.shadowRoot.querySelector("input").value = transcript;
        this.debouncedSearch(transcript);
      };

      this.speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      this.speechRecognition.onend = () => {
        console.log("Speech recognition ended.");
      };
    }
  }
}
