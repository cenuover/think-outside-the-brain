/**
 * Reads window.GAME_LEVEL from each page:
 *   password      — correct answer (string)
 *   nextPage      — where to go on success (string path, e.g. "level2.html")
 *   caseSensitive — optional, default false
 *   whisper       — optional string; if set, logs once to the browser console (devtools)
 * Any other keys are ignored by this script — fine for notes, nested objects, codenames, etc.
 */
(function () {
  var form = document.getElementById("password-form");
  if (!form) return;

  var input = document.getElementById("password-input");
  var feedback = document.getElementById("feedback");
  var cfg = window.GAME_LEVEL;
  var incorrectTimers = null;

  if (!cfg || typeof cfg.password !== "string" || typeof cfg.nextPage !== "string") {
    if (feedback) {
      feedback.textContent = "Level config missing. Set window.GAME_LEVEL on this page.";
      feedback.className = "feedback error";
    }
    return;
  }

  if (typeof cfg.whisper === "string" && cfg.whisper) {
    console.log("%c" + cfg.whisper, "color:#8b949e;font-size:12px;font-style:italic");
  }

  var caseSensitive = cfg.caseSensitive === true;

  function normalize(s) {
    s = (s || "").trim();
    return caseSensitive ? s : s.toLowerCase();
  }

  var expected = normalize(cfg.password);

  function clearIncorrectTimers() {
    if (!incorrectTimers) return;
    incorrectTimers.forEach(function (id) {
      clearTimeout(id);
    });
    incorrectTimers = null;
  }

  function showIncorrect() {
    if (!feedback) return;
    clearIncorrectTimers();

    feedback.classList.remove("is-fading");
    feedback.style.transition = "none";
    feedback.style.opacity = "1";
    feedback.offsetHeight;
    feedback.style.transition = "";
    feedback.textContent = "Incorrect";
    feedback.className = "feedback error";

    var tFade = setTimeout(function () {
      feedback.classList.add("is-fading");
    }, 2000);

    var tClear = setTimeout(function () {
      feedback.textContent = "";
      feedback.className = "feedback";
      feedback.classList.remove("is-fading");
      feedback.style.opacity = "";
      incorrectTimers = null;
    }, 4000);

    incorrectTimers = [tFade, tClear];
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var guess = normalize(input && input.value);
    if (guess === expected) {
      clearIncorrectTimers();
      window.location.href = cfg.nextPage;
      return;
    }

    showIncorrect();
  });
})();
