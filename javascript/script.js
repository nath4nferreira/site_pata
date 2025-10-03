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

// Sistema de animações de scroll
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScroll();
        this.setupParallaxEffects();
        this.setupHoverEffects();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Adicionar delay escalonado para elementos múltiplos
                    const siblings = entry.target.parentElement.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
                    siblings.forEach((sibling, index) => {
                        if (sibling === entry.target) {
                            setTimeout(() => {
                                sibling.classList.add('visible');
                            }, index * 200);
                        }
                    });
                }
            });
        }, this.observerOptions);

        // Observar todos os elementos com classes de animação
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupSmoothScroll() {
        // Adicionar smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupParallaxEffects() {
        // Efeito parallax suave para elementos de fundo
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.inicio, .apresentation');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupHoverEffects() {
        // Efeitos hover aprimorados
        const hoverElements = document.querySelectorAll('.texto1, .texto2, .img-pata');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar classe para indicar que JavaScript está funcionando
    document.body.classList.add('js-enabled');
    
    // Inicializar animações
    new ScrollAnimations();
    
    // Animar elementos que já estão visíveis
    const visibleElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    visibleElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });

    // Ativar Liquid Glass controlado por movimento em telas <= 1024px
    const enableLiquidGlass = () => {
        const maxWidth = 1024;
        const isSmallScreen = window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isSmallScreen || prefersReduced) return;

        let lastFrame = 0;
        const setVars = (xPerc, yPerc, bright) => {
            document.documentElement.style.setProperty('--lgx', `${xPerc}%`);
            document.documentElement.style.setProperty('--lgy', `${yPerc}%`);
            document.documentElement.style.setProperty('--lg-brightness', `${bright}`);
        };

        const handleOrientation = (event) => {
            const { beta, gamma } = event; // beta: x (front/back), gamma: y (left/right)
            const clampedBeta = Math.max(-45, Math.min(45, beta || 0));
            const clampedGamma = Math.max(-45, Math.min(45, gamma || 0));
            const xPerc = 50 + (clampedGamma / 45) * 35; // 15% margem
            const yPerc = 50 + (clampedBeta / 45) * 35;
            const bright = 0.9 + (Math.abs(clampedBeta) + Math.abs(clampedGamma)) / 200;

            const now = performance.now();
            if (now - lastFrame > 33) { // ~30fps
                setVars(xPerc, yPerc, Math.min(1.2, bright));
                lastFrame = now;
            }
        };

        const handleMouse = (e) => {
            const xPerc = (e.clientX / window.innerWidth) * 100;
            const yPerc = (e.clientY / window.innerHeight) * 100;
            setVars(xPerc, yPerc, 1);
        };

        // iOS permission flow
        const maybeRequestPermission = async () => {
            try {
                const anyDev = window.DeviceOrientationEvent || window.DeviceMotionEvent;
                if (!anyDev) return false;
                if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                    const res = await DeviceOrientationEvent.requestPermission();
                    return res === 'granted';
                }
                return true; // non-iOS
            } catch {
                return false;
            }
        };

        const initMotion = async () => {
            const granted = await maybeRequestPermission();
            if (granted) {
                window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            } else {
                // fallback para mouse/touchmove
                window.addEventListener('mousemove', handleMouse, { passive: true });
                window.addEventListener('touchmove', (e) => {
                    if (e.touches && e.touches[0]) {
                        const t = e.touches[0];
                        handleMouse({ clientX: t.clientX, clientY: t.clientY });
                    }
                }, { passive: true });
            }
        };

        initMotion();
    };

    enableLiquidGlass();
});

// Otimização para dispositivos móveis
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Reduzir animações em dispositivos móveis para melhor performance
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .fade-in,
        .touch-device .slide-in-left,
        .touch-device .slide-in-right,
        .touch-device .scale-in {
            transition-duration: 0.4s !important;
        }
        
        .touch-device .img-pata:hover {
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
}