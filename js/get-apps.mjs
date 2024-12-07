const section = document.querySelector("section");

export const getApps = async (query = "", justStore = false) => {
  const res = await fetch(
    "https://raw.githubusercontent.com/LiquidGalaxyLAB/Data/refs/heads/main/store.json"
  );
  const data = await res.json();
  if (!query) localStorage.setItem("store", JSON.stringify(data));
  if (justStore) return;
  while (section.firstChild) section.removeChild(section.firstChild);
  for (const app of data) {
    if (
      query &&
      !(app.name + app.category + app.type)
        .toLowerCase()
        .includes(query.toLowerCase())
    )
      continue;
    const appCard = document.createElement("app-card");
    appCard.setAttribute(
      "image-src",
      `https://raw.githubusercontent.com/LiquidGalaxyLAB/Data/refs/heads/main${app.base_url}${app.icon}`
    );
    appCard.setAttribute("title", app.name);
    appCard.setAttribute("link", `/pages/app.html?name=${app.name}`);
    section.appendChild(appCard);
  }
};
