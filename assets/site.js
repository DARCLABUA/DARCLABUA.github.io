// Brief "decrypt" effect on page titles. Text is final for screen readers
// from the start, and the effect is skipped when reduced motion is on.
(function () {
  var els = document.querySelectorAll("[data-scramble]");
  if (!els.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var glyphs = "!<>-_\\/[]{}=+*^?#01ABCDEF";
  els.forEach(function (el) {
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    var nodes = [];
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push({ n: walker.currentNode, t: walker.currentNode.nodeValue });
    var total = nodes.reduce(function (s, x) { return s + x.t.length; }, 0);
    // dur: total time to reveal the title. tick: how often the scrambled
    // characters change, so they read as cycling code rather than flicker.
    var start = null, last = -Infinity, dur = 2000, tick = 70;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      if (p < 1 && ts - last < tick) { requestAnimationFrame(frame); return; }
      last = ts;
      var done = Math.floor(p * total), i = 0;
      nodes.forEach(function (x) {
        var out = "";
        for (var k = 0; k < x.t.length; k++, i++) {
          var ch = x.t[k];
          out += (i < done || /\s/.test(ch)) ? ch : glyphs[(Math.random() * glyphs.length) | 0];
        }
        x.n.nodeValue = out;
      });
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
})();
