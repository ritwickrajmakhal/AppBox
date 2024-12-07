import { AnimatedLogo } from "./animated-logo.mjs";
import { Searchbar } from "./search-bar.mjs";
import { AppCard } from "./app-card.mjs";
import { getApps } from "./get-apps.mjs";

customElements.define("animated-logo", AnimatedLogo);
customElements.define("search-bar", Searchbar);
customElements.define("app-card", AppCard);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("animated-logo").setAttribute("animate", "true");
  getApps();
});

const searchbar = document.querySelector("search-bar");
searchbar.addEventListener("search", (event) => {
  getApps(event.detail);
});
