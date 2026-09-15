/* =========================================================
   EDCAR SERVIÇOS MECÂNICOS — SCRIPT
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURAÇÃO — edite os valores abaixo
   --------------------------------------------------------- */
const CONFIG = {
  // EDITAR: número de WhatsApp no formato internacional, somente dígitos.
  // Exemplo Brasil: 55 + DDD + número => "5521999999999"
  whatsappNumber: "55XXXXXXXXXXX",

  // EDITAR: endereço completo, usado no botão "Ver rota no Google Maps".
  // Deixe vazio ("") para desativar o link até o endereço ser definido.
  fullAddress: ""
};

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppLinks();
  setupMobileNav();
  setupContactForm();
  setupMapsLink();
  setYear();
});

/* ---------------------------------------------------------
   Monta os links de WhatsApp (botões com classe .js-whatsapp)
   --------------------------------------------------------- */
function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message || "Olá! Gostaria de falar com a Edcar Serviços Mecânicos.");
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

function setupWhatsAppLinks() {
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const message = link.getAttribute("data-message");
    link.setAttribute("href", buildWhatsAppUrl(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
}

/* ---------------------------------------------------------
   Menu mobile
   --------------------------------------------------------- */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

/* ---------------------------------------------------------
   Formulário de contato -> abre o WhatsApp com a mensagem
   --------------------------------------------------------- */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const veiculo = form.veiculo.value.trim();
    const mensagem = form.mensagem.value.trim();

    let text = `Olá, meu nome é ${nome}.`;
    if (veiculo) text += ` Veículo: ${veiculo}.`;
    text += ` ${mensagem}`;

    window.open(buildWhatsAppUrl(text), "_blank", "noopener");
  });
}

/* ---------------------------------------------------------
   Link "Ver rota no Google Maps"
   --------------------------------------------------------- */
function setupMapsLink() {
  const link = document.getElementById("mapsLink");
  if (!link) return;

  if (CONFIG.fullAddress) {
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.fullAddress)}`;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    // Sem endereço definido ainda: mantém o botão visível, mas inativo.
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (e) => e.preventDefault());
  }
}

/* ---------------------------------------------------------
   Ano atual no rodapé
   --------------------------------------------------------- */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}
