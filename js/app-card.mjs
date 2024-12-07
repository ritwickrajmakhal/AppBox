export class AppCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          .app-card {
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            text-align: center;
            padding: 10px 20px;
            border-radius: 20px;
            text-decoration: none;
            background-color: var(--md-sys-color-surface-container-low);
            block-size: 160px;
            inline-size: 150px;
          }
          .app-card img{
            object-fit: cover;
            border-radius: 8px;
            margin-block-start: 10px;
          }
          .app-card p {
            color: var(--md-sys-color-on-surface);
            margin: auto;
            margin-block-start: 5px;
            inline-size: 11ch;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        </style>
        <a class="app-card" href="">
          <md-ripple></md-ripple>
          <img src="" alt="" height="80px" width="auto" loading="lazy">
          <p></p>
        </a>
      `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const link = this.getAttribute("link");
    const imageSrc = this.getAttribute("image-src");
    const title = this.getAttribute("title");

    const appCard = this.shadowRoot.querySelector(".app-card");
    const imgElement = this.shadowRoot.querySelector("img");
    const pElement = this.shadowRoot.querySelector("p");

    if (link) appCard.setAttribute("href", link);
    if (imageSrc) imgElement.setAttribute("src", imageSrc);
    if (title) pElement.textContent = title;
  }
}
