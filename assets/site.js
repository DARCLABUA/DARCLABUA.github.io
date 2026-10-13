// "Decrypt" effect: text on the page resolves from scrambled code characters
// into the real words. Blocks already on screen decode when the page loads;
// the rest decode as they scroll into view. Skipped entirely when the viewer
// has reduced motion turned on.
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Tuning
  var TITLE_MS = 2000;   // h1 page titles
  var MIN_MS = 900;      // shortest decode for any block
  var MAX_MS = 1800;     // longest decode for body text
  var MS_PER_CHAR = 14;  // longer text takes a little longer, up to MAX_MS
  var TICK_MS = 70;      // how often scrambled characters change
  var GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEF";

  var BLOCKS = "h1, h2, h3, p, li, figcaption, .explore b, .explore .d, .explore .go, .btn";
  var SKIP = "svg, script, style, .prompt, .qr, header, footer, [data-no-scramble]";

  var main = document.querySelector("main");
  if (!main) return;

  // Collect each block's own text nodes (not those of nested blocks).
  var blocks = [];
  main.querySelectorAll(BLOCKS).forEach(function (el) {
    if (el.closest(SKIP)) return;
    var nodes = [];
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var owner = n.parentElement.closest(BLOCKS);
        return owner === el ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    while (walker.nextNode()) nodes.push({ n: walker.currentNode, t: walker.currentNode.nodeValue });
    if (!nodes.length) return;
    var total = nodes.reduce(function (s, x) { return s + x.t.length; }, 0);
    var dur = el.tagName === "H1" ? TITLE_MS : Math.min(MAX_MS, Math.max(MIN_MS, total * MS_PER_CHAR));
    // Screen readers get the real text the whole time.
    if (!el.hasAttribute("aria-label") && el.tagName !== "A" && !el.classList.contains("btn")) {
      el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    }
    blocks.push({ el: el, nodes: nodes, total: total, dur: dur });
  });

  function scramble(b, done) {
    var i = 0;
    b.nodes.forEach(function (x) {
      var out = "";
      for (var k = 0; k < x.t.length; k++, i++) {
        var ch = x.t[k];
        out += (i < done || /\s/.test(ch)) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      x.n.nodeValue = out;
    });
  }

  function run(b) {
    var start = null, last = -Infinity;
    scramble(b, 0);
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / b.dur);
      if (p < 1 && ts - last < TICK_MS) { requestAnimationFrame(frame); return; }
      last = ts;
      scramble(b, Math.floor(p * b.total));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (!("IntersectionObserver" in window)) { blocks.forEach(run); return; }
  var byEl = new Map(blocks.map(function (b) { return [b.el, b]; }));
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      run(byEl.get(e.target));
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  blocks.forEach(function (b) { io.observe(b.el); });
})();
