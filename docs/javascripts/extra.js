/*
 * Menú global de navegación (botón hamburguesa arriba a la izquierda).
 *
 * Para agregar una semana nueva basta con añadir un objeto más al arreglo
 * PAGES de abajo, siguiendo el mismo patrón — no hace falta tocar nada más
 * de este archivo.
 */
(function () {
  var PAGES = [
    { href: "/", icon: "🏠", label: "Página principal" },
    { href: "/semana1/", icon: "1", label: "Semana 1 — SCAMPER" }
    // { href: "/semana2/", icon: "2", label: "Semana 2 — ..." },
  ];

  function getBase() {
    var cfg = document.getElementById("__config");
    if (!cfg) return ".";
    try {
      return JSON.parse(cfg.textContent).base || ".";
    } catch (e) {
      return ".";
    }
  }

  function isActive(href) {
    var target = new URL(href, window.location.href).pathname.replace(/\/+$/, "/");
    var current = window.location.pathname.replace(/\/+$/, "/");
    return target === current;
  }

  function init() {
    if (document.querySelector(".site-menu")) return;

    var header = document.querySelector(".md-header__inner");
    if (!header) return;

    var base = getBase();

    var wrap = document.createElement("div");
    wrap.className = "site-menu";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "site-menu__button";
    btn.setAttribute("aria-label", "Abrir menú de navegación");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span><span></span><span></span>";

    var panel = document.createElement("nav");
    panel.className = "site-menu__panel";
    panel.setAttribute("aria-hidden", "true");

    var title = document.createElement("span");
    title.className = "site-menu__title";
    title.textContent = "Navegación";
    panel.appendChild(title);

    PAGES.forEach(function (page) {
      var href = base + page.href;
      var a = document.createElement("a");
      a.href = href;
      a.className = "site-menu__link";
      if (isActive(href)) a.classList.add("is-active");
      a.innerHTML =
        '<span class="site-menu__icon">' + page.icon + "</span><span>" + page.label + "</span>";
      panel.appendChild(a);
    });

    function setOpen(open) {
      wrap.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.setAttribute("aria-hidden", open ? "false" : "true");
    }

    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(!wrap.classList.contains("is-open"));
    });
    document.addEventListener("click", function (event) {
      if (!wrap.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    wrap.appendChild(btn);
    wrap.appendChild(panel);
    header.insertBefore(wrap, header.firstChild);

    // En páginas donde el sidebar nativo de Material está oculto (frontmatter
    // "hide: navigation", como Inicio o cada semana), su botón de hamburguesa
    // móvil queda huérfano — lo escondemos para no duplicar el ícono de menú.
    var sidebar = document.querySelector(".md-sidebar--primary");
    var drawerToggle = document.querySelector('label.md-header__button.md-icon[for="__drawer"]');
    if (drawerToggle && (!sidebar || sidebar.hasAttribute("hidden"))) {
      drawerToggle.style.display = "none";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
