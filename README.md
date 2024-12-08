# GO Web Store  

**GO Web Store** is a dedicated platform for Liquid Galaxy applications, including Google Earth and Chromium-based apps, Progressive Web Apps (PWAs), and data visualization projects. These apps have been developed over time, many as part of the Google Summer of Code initiative.  

**Why "GO"?**  
The name "GO" reflects our focus on Google Earth as a foundational aspect of our work, emphasizing the Google Open Source community and its contributions.  

---

## Features  

### 🌍 A Platform for Liquid Galaxy Applications  
- Aggregates a collection of apps and PWAs built by the Liquid Galaxy community.  
- Showcases data visualization projects for Google Earth, Maps, and Street View.  

### 🔗 Data Repository  
All app metadata and assets are sourced from our dedicated [Data Repository](https://github.com/LiquidGalaxyLAB/Data).  

### 🌐 Deployment  
The web store is deployed at: [store.liquidgalaxy.eu](https://store.liquidgalaxy.eu).  
It supports use as a Progressive Web App (PWA), progressively enhanced with modern web APIs.  

---

## USE CASES

### 🏷️ Use Case of the Badging API  
GO Web Store leverages the **Badging API** to provide a more native app experience, inspired by **Project Fugu**.  
The Badging API enables dynamic badge updates directly within the PWA, enhancing user interaction during file downloads.  

#### Why the Badging API?  
Traditional download experiences rely on OS-level download bars or browser-specific badges (as shown below):  

1. **Usual Download**  
   ![Usual Download](https://github.com/user-attachments/assets/f7c0aa6f-2e7d-4e7a-a364-a66855d7d29e)  
   **Description:** A Chrome badge shows download counts.  

2. **What You Don’t Get with OS level Percentages**  
   ![What You Don’t Get](https://github.com/user-attachments/assets/f41f93f6-382f-4ed6-9fa4-9bc3d13aedfd)  
   **Description:** The default system download bar is displayed but lacks in-app progress details.  

#### Enhanced Experience with GO Web Store  
By integrating the **Fetch API**, GO Web Store transforms the download experience:  

- **In-app Percentage Experience**  
  ![In-app Percentage](https://github.com/user-attachments/assets/cdb81b7c-1c17-4032-846f-d2da7c03707a)  
  **Description:** Progress bars are displayed directly within the app, creating a seamless download experience.  

- **Native-like Badging Experience**  
  ![Badge Example](https://github.com/user-attachments/assets/6d40f963-261f-428f-a822-d0acd38d9f2c)  
  **Description:** The PWA shows a badge indicating there's any active downloads happening, resembling native app behavior.  

---

## Expanding Compatibility  

Currently, the Badging API is supported on **MacOS** and **Windows** via Chrome, and in Safari.  
Our goal is to:  
- Extend support to Linux for Chromium.  
- Advocate for adoption by other browser engines, such as **Firefox (Gecko)**.  

---

## Inspiration and Motivation  

This project is inspired by **Thomas Steiner**, a Google DevRel, and **Project Fugu's** mission to push real-world use cases for APIs. The focus on enhancing the user experience aligns with Liquid Galaxy's vision to create impactful, accessible apps for diverse communities.  

---

## About the Video Demos  

1. **Short Demo**  
   ![Video Demo](https://github.com/user-attachments/assets/a397559f-eabd-4d2d-bd9a-bd747b6e5594)  

2. **PWA Demo Video**  
   ![Short Demo](https://github.com/user-attachments/assets/2dee0070-8abd-4c0a-95f4-afd488e8f166)  

These demonstrate the enhanced download experience within the GO Web Store PWA.  

---

## Contributing  

Contributions to the GO Web Store and its underlying technology are welcome! To contribute:  
1. Clone the repository.  
2. Follow the [Data Repository](https://github.com/LiquidGalaxyLAB/Data) guidelines for app submissions.  
3. Open a pull request with your changes.  

---

## Acknowledgments  

Special thanks to the Liquid Galaxy community, Google Summer of Code contributors, and the Chrome team for their innovations and support.  
