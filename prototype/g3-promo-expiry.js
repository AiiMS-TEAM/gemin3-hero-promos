/*
 * Gemin3 hero promos, run inline straight after the slider markup.
 * 1. Removes any promo slide outside its data-start / data-end window before slick
 *    starts, so cached HTML never shows an expired offer. ?g3now=ISO-date tests a date.
 *    With one slide left slick goes static (no dots, no autoplay). With none left the
 *    slider column is removed and the grid gets .g3-promos-none.
 * 2. Once slick is running: no autoplay under prefers-reduced-motion, and the dots
 *    sit in the empty lane above the terms strip of the current slide.
 */
(function () {
  var slider = document.querySelector('.banner-v3-deal-slider');
  if (!slider) return;

  var q = new URLSearchParams(location.search).get('g3now');
  var now = q ? Date.parse(q) : Date.now();

  [].forEach.call(slider.querySelectorAll('.g3-promo'), function (p) {
    var start = p.dataset.start ? Date.parse(p.dataset.start) : -Infinity;
    var end = p.dataset.end ? Date.parse(p.dataset.end) : Infinity;
    if (now < start || now > end) (p.closest('.banner-v3-slide') || p).remove();
  });

  if (!slider.querySelector('.banner-v3-slide')) {
    var col = slider.parentNode;
    col.parentNode.classList.add('g3-promos-none');
    col.remove();
    return;
  }

  function go() {
    var $ = window.jQuery;
    if (!$) return;
    var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function place(i) {
      var dots = slider.querySelector('.slick-dots');
      var promo = slider.querySelectorAll('.g3-promo')[i];
      var lane = promo && promo.querySelector('.g3-promo__lane');
      if (!dots || !lane) return;
      var s = slider.getBoundingClientRect();
      var l = lane.getBoundingClientRect();
      slider.style.setProperty('--g3-dots-bottom', s.bottom - l.bottom + (l.height - dots.offsetHeight) / 2 + 'px');
    }

    $(slider)
      .on('init', function (e, sl) {
        if (calm) sl.options.autoplay = false;
        place(sl.currentSlide);
      })
      .on('setPosition', function (e, sl) { place(sl.currentSlide); })
      .on('beforeChange', function (e, sl, cur, next) { place(next); });

    if (slider.slick) {
      if (calm) slider.slick.slickPause();
      place(slider.slick.currentSlide);
    }

    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        if (slider.slick) place(slider.slick.currentSlide);
      }).observe(slider);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
