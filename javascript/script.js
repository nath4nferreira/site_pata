// para um menu de navegação futuro
const hamburguer = document.querySelector(".hamburguer");
const nav = document.querySelector(".nav");

hamburguer.addEventListener("click", () => nav.classList.toggle("active"));

import 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js'
// Carregar Ionicons dinamicamente
function loadIonicons() {
    // Script para módulos ES6
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    document.head.appendChild(moduleScript);
    
    // Script para navegadores sem suporte a módulos
    const nomoduleScript = document.createElement('script');
    nomoduleScript.setAttribute('nomodule', '');
    nomoduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    document.head.appendChild(nomoduleScript);
}

// Carregar Ionicons imediatamente para registrar o custom element <ion-icon>
loadIonicons();