// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Inicializar funcionalidades
  initNavigation();
  initScrollEffects();
  initPortfolioInteractions();
  initMobileMenu();
  initAnimationCounters();
});

// Navegação e efeitos de scroll
function initNavigation() {
  const navbar = document.getElementById("navbar");

  // Efeito de scroll na navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Highlight do link ativo baseado na seção visível
    highlightActiveSection();
  });
}

// Destacar seção ativa na navegação
function highlightActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150; // Ajuste no offset
    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    // Adiciona a classe 'active' se o href corresponder ao ID da seção atual
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

// Menu mobile (hamburger)
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
}

// Efeitos de scroll e parallax
function initScrollEffects() {
  // Animação de entrada para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target); // Deixa de observar após animar
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .stat-item"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

// Interações do portfólio
function initPortfolioInteractions() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    // Efeito hover aprimorado
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });

    // Click para expandir (modal simples)
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      const overlay = this.querySelector(".portfolio-overlay");

      if (img && overlay) {
        showImageModal(
          img.src,
          overlay.querySelector("h4").textContent,
          overlay.querySelector("p").textContent
        );
      }
    });
  });
}

// Modal simples para imagens do portfólio
function showImageModal(imageSrc, title, description) {
  // Remover modal existente se houver
  const existingModal = document.getElementById("image-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Criar o modal
  const modal = document.createElement("div");
  modal.id = "image-modal";
  modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img class="modal-image" src="${imageSrc}" alt="${title}">
                <div class="modal-info">
                    <h3 class="modal-title">${title}</h3>
                    <p class="modal-description">${description}</p>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden"; // Evita scroll da página ao fundo

  // Adicionar estilos do modal via JS para não depender de um CSS separado
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
        #image-modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8); z-index: 10000;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; animation: fadeIn 0.3s forwards;
        }
        .modal-content {
            background: white; border-radius: 15px; overflow: hidden;
            position: relative; max-width: 90%; max-height: 90vh;
            width: 500px;
            transform: scale(0.9); animation: scaleIn 0.3s forwards;
        }
        .modal-close {
            position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5);
            color: white; border: none; width: 35px; height: 35px;
            border-radius: 50%; font-size: 20px; cursor: pointer; z-index: 10;
        }
        .modal-image { width: 100%; height: auto; display: block; }
        .modal-info { padding: 20px; text-align: center; }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #5C4033; }
        .modal-description { color: #8B4513; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); } to { transform: scale(1); } }
    `;
  modal.appendChild(styleSheet);

  // Função para fechar o modal
  const closeModal = () => {
    modal.style.animation = "fadeOut 0.3s forwards";
    modal.querySelector(".modal-content").style.animation =
      "scaleOut 0.3s forwards";
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = "";
    }, 300);
  };

  // Event listeners para fechar
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector(".modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "Escape") closeModal();
    },
    { once: true }
  ); // 'once' remove o listener após ser usado
}

// Animação de contadores
function initAnimationCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          animateCounter(entry.target);
          entry.target.classList.add("counted");
        }
      });
    },
    { threshold: 0.8 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const targetValue = parseInt(element.textContent.replace(/\D/g, ""));
  const duration = 2000; // 2 segundos
  let start = 0;
  const stepTime = 16; // Aproximadamente 60fps
  const totalSteps = duration / stepTime;
  const increment = targetValue / totalSteps;

  const timer = setInterval(() => {
    start += increment;
    if (start >= targetValue) {
      start = targetValue;
      clearInterval(timer);
    }
    // Mantém o "+" se existir no original
    element.textContent =
      Math.floor(start) + (element.textContent.includes("+") ? "+" : "");
  }, stepTime);
}
