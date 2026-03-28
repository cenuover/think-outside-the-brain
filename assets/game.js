/**
 * Reads window.GAME_LEVEL from each page:
 *   password      — correct answer (string)
 *   nextPage      — where to go on success (string path, e.g. "level2.html")
 *   caseSensitive — optional, default false
 */
(function () {
  var form = document.getElementById("password-form");
  if (!form) return;

  var input = document.getElementById("password-input");
  var feedback = document.getElementById("feedback");
  var cfg = window.GAME_LEVEL;

  if (!cfg || typeof cfg.password !== "string" || typeof cfg.nextPage !== "string") {
    if (feedback) {
      feedback.textContent = "Level config missing. Set window.GAME_LEVEL on this page.";
      feedback.className = "feedback error";
    }
    return;
  }

  var caseSensitive = cfg.caseSensitive === true;

  function normalize(s) {
    s = (s || "").trim();
    return caseSensitive ? s : s.toLowerCase();
  }

  var expected = normalize(cfg.password);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var guess = normalize(input && input.value);
    if (guess === expected) {
      window.location.href = cfg.nextPage;
      return;
    }

    if (feedback) {
      feedback.textContent = "Incorrect";
      feedback.className = "feedback error";
    }
  });
})();
