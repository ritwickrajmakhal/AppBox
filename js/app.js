import { DownloadApp } from "./download-app.mjs";
import { getQueryParam } from "./query-param.mjs";
import { getApps } from "./get-apps.mjs";

if (localStorage.getItem("store") === null) getApps("", true);

customElements.define("download-app", DownloadApp);

window.onload = function () {
  const appName = getQueryParam("name");
  if (appName) {
    document.title = "GO Web Store | " + appName;
  }
};
