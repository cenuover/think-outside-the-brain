function initLevelBanner() {
  var root = document.querySelector(".level-banner[data-level]");
  if (!root) return;

  var num = root.getAttribute("data-level") || "1";
  root.setAttribute("role", "group");
  root.setAttribute("aria-label", "Level " + num);

  var text = "LEVEL " + num;
  var frag = document.createDocumentFragment();

  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    var wrap = document.createElement("span");
    wrap.className = "level-glyph-wrap";
    /* Random vertical offset (40% of prior ±2vh range after −60% reduction) */
    var jitterVh = (Math.random() - 0.5) * 1.6;
    wrap.style.setProperty("--jitter", jitterVh + "vh");

    var inner = document.createElement("span");
    inner.className = "level-glyph";
    inner.textContent = ch === " " ? "\u00a0" : ch;
    inner.style.setProperty("--float-delay", -Math.random() * 6 + "s");

    wrap.appendChild(inner);
    frag.appendChild(wrap);
  }

  root.appendChild(frag);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLevelBanner);
} else {
  initLevelBanner();
}
