// ---------- Qualitative results carousel (vanilla, no deps) ----------
(function () {
  var carousel = document.getElementById('results-carousel');
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
  var dotsWrap = carousel.querySelector('.carousel-dots');
  var prevBtn = carousel.querySelector('.carousel-btn.prev');
  var nextBtn = carousel.querySelector('.carousel-btn.next');
  var current = 0;

  if (!slides.length) return;

  // Build dots
  slides.forEach(function (_, i) {
    var dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { go(i); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function render() {
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }
  function go(i) { current = (i + slides.length) % slides.length; render(); }

  prevBtn.addEventListener('click', function () { go(current - 1); });
  nextBtn.addEventListener('click', function () { go(current + 1); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  });

  render();
})();

// ---------- Copy BibTeX ----------
(function () {
  var btn = document.getElementById('copy-bibtex');
  var pre = document.getElementById('bibtex-content');
  if (!btn || !pre) return;

  btn.addEventListener('click', function () {
    var text = pre.innerText;
    var done = function () {
      btn.classList.add('copied');
      btn.innerHTML = '<i class="fas fa-check"></i> Copied';
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  });
})();
