(function () {
  "use strict";

  // Menu mobile
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Link "Início": sempre volta ao topo da página atual, sem navegar
  // para outra URL (evita sair de /posobra/ ou /vidro/ ao clicar).
  document.querySelectorAll("[data-top]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Ano do rodapé
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Animação de entrada ao rolar a página
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
    // Rede de segurança: garante que nada fique invisível para sempre
    // caso o observer não dispare (ex.: elemento fora do fluxo normal de rolagem).
    setTimeout(function () {
      revealEls.forEach(function (el) {
        el.classList.add("in-view");
      });
    }, 2000);
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // Formulário de contato -> monta a mensagem e abre o WhatsApp
  var form = document.querySelector("[data-whatsapp-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var phone = form.getAttribute("data-phone") || "";
      var data = new FormData(form);
      var nome = (data.get("nome") || "").toString().trim();
      var contatoCampo = (data.get("contato") || "").toString().trim();
      var servico = (data.get("servico") || "").toString().trim();
      var mensagem = (data.get("mensagem") || "").toString().trim();

      var linhas = ["Olá! Vim pelo site da Impactus Limpeza."];
      if (nome) linhas.push("Nome: " + nome);
      if (contatoCampo) linhas.push("Contato: " + contatoCampo);
      if (servico) linhas.push("Serviço de interesse: " + servico);
      if (mensagem) linhas.push("Mensagem: " + mensagem);

      var texto = encodeURIComponent(linhas.join("\n"));
      window.open("https://wa.me/" + phone + "?text=" + texto, "_blank", "noopener");
    });
  }
})();
