import { DownloadApp } from "./download-app.mjs";
import { getQueryParam } from "./query-param.mjs";

customElements.define("download-app", DownloadApp);

window.onload = function () {
  const appName = getQueryParam("name");
  if (appName) {
    document.title = "GO Web Store | " + appName;
  }
};
