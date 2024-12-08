import { getQueryParam } from "./query-param.mjs";

export class CarouselComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupCarousel();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            max-inline-size: 100%;
            overflow: hidden;
            position: relative;
          }

          .carousel {
            display: flex;
            scroll-snap-type: inline mandatory;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            gap: 1rem;
            scrollbar-width: none;
            margin-block-start: 50px;
          }

          .carousel::-webkit-scrollbar{
            display: none;
          }

          .carousel-item {
            flex: 0 0 500px;
            max-inline-size: 100%;
            scroll-snap-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .carousel-item img,
          .carousel-item iframe {
            inline-size: 100%;
            block-size: 100%;
            border-radius: 0.625rem;
          }

          .prev, .next{
            position: absolute;
            inset-block-start: 0;
            inset-inline-end: 20px;
          }

          .prev {
            translate: -60px
          }

        </style>
        <div>
          <md-filled-tonal-icon-button class="prev" aria-label="Previous" disabled>
           <md-icon>arrow_back</md-icon>
          </md-filled-tonal-icon-button>
          <div class="carousel">
            ${this.carouselAssets[0]
              .map((asset) =>
                asset.endsWith(".webp")
                  ? `<div class="carousel-item"><img src="https://raw.githubusercontent.com/LiquidGalaxyLAB/Data/refs/heads/main${
                      this.carouselAssets[1] + asset
                    }" alt="Carousel item" draggable="false"></div>`
                  : `<div class="carousel-item"><iframe title="video" src="https://www.youtube.com/embed/${
                      new URL(asset).pathname.split("/")[1]
                    }" frameborder="0" allowfullscreen></iframe></div>`
              )
              .join("")}
          </div>
          <md-filled-tonal-icon-button class="next" aria-label="Next">
           <md-icon>arrow_forward</md-icon>
          </md-filled-tonal-icon-button>
        </div>
      `;
  }

  get carouselAssets() {
    const storedData = JSON.parse(localStorage.getItem("store"));
    const data = storedData.find((item) => item.name === getQueryParam("name"));
    return [data.carousel_assets, data.base_url];
  }

  setupCarousel() {
    const carousel = this.shadowRoot.querySelector(".carousel");
    const prevButton = this.shadowRoot.querySelector(".prev");
    const nextButton = this.shadowRoot.querySelector(".next");

    nextButton.addEventListener("click", () => this.scrollToNext(carousel));
    prevButton.addEventListener("click", () => this.scrollToPrev(carousel));
  }

  scrollToNext(carousel) {
    const prevButton = this.shadowRoot.querySelector(".prev");
    const nextButton = this.shadowRoot.querySelector(".next");
    const itemWidth = 500;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft + itemWidth >= maxScrollLeft)
      nextButton.setAttribute("disabled", "true");
    prevButton?.removeAttribute("disabled");

    carousel.scrollBy({ left: itemWidth + 16, behavior: "smooth" });
  }

  scrollToPrev(carousel) {
    const prevButton = this.shadowRoot.querySelector(".prev");
    const nextButton = this.shadowRoot.querySelector(".next");
    const itemWidth = 500;
    if (carousel.scrollLeft <= 0) prevButton.setAttribute("disabled", "true");
    nextButton?.removeAttribute("disabled");

    carousel.scrollBy({ left: -(itemWidth + 16), behavior: "smooth" });
  }
}
