/* Memuat komponen animasi React, dengan fallback React lokal jika CDN tidak tersedia. */
(function () {
  "use strict";

  function addScript(src, done, fail) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = done;
    script.onerror = fail || function () {
      console.warn("Gagal memuat skrip:", src);
    };
    document.body.appendChild(script);
  }

  function start() {
    if (window.React && window.ReactDOM) {
      addScript("js/react/react-animations.js?v=2026112306");
      return;
    }

    // Website tetap bisa digunakan tanpa internet setelah file ZIP diekstrak.
    addScript("vendor/react/react.production.min.js", function () {
      addScript("vendor/react/react-dom.production.min.js", function () {
        addScript("js/react/react-animations.js?v=2026112306");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
