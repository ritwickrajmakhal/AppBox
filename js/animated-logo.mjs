export class AnimatedLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
        /* Centering and spacing */
        .animated-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px; /* Space between image and text */
            font-family: 'Pacifico', cursive;
            font-size: 3.2rem;
            font-weight: bold;
            color: #ffffff; /* Dark gray color */
            text-transform: none; /* Handwriting looks better without uppercase */
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 
                         0 0 20px rgba(255, 255, 255, 0.6);
        }

        /* Image styling */
        .animated-logo img {
            width: 120px; /* Adjust as needed */
            height: auto;
            animation: bounce 1.5s infinite ease-in-out;
        }

        /* Simple bounce animation */
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    </style>
    <div class="animated-logo">
        <img src="./assets/smartphone.png" alt="Smartphone" />
        <p>AppBox</p>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}