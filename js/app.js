import { getApps } from "./get-apps.mjs";
import { DownloadApp } from "./download-app.mjs";
import { getQueryParam } from "./query-param.mjs";
import { CarouselComponent } from "./carousel-component.mjs";

if (localStorage.getItem("store") === null) getApps("", true);

customElements.define("download-app", DownloadApp);
customElements.define("carousel-component", CarouselComponent);

window.onload = function () {
  const appName = getQueryParam("name");
  if (appName) {
    document.title = "GO Web Store | " + appName;
  }
};
