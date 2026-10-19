(function () {
  document.documentElement.classList.add("js");

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Cerrar" : "Menú";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menú";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menú";
        toggle.focus();
      }
    });
  }

  // Subtle reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Form that opens WhatsApp with a ready message
  var form = document.getElementById("wa-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var nombre = form.nombre.value.trim();
      var servicio = form.servicio.value;
      var extra = (form.dia || form.horario).value.trim();
      var msg = "Hola " + form.dataset.negocio + ", soy " + nombre + ". Me interesa: " + servicio + ".";
      if (extra) msg += " Me conviene: " + extra + ".";
      var url = "https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  }
})();
