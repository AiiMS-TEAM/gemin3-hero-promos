/*
 * PROTOTYPE ONLY. Layout audit for the acceptance checklist, run in the page:
 *   g3Audit()  ->  per-slide box size, layout, font sizes, clipping and overlaps.
 * Text boxes are measured with Range rects so padding and rotation slack do not
 * count as overlap.
 */
window.g3Audit = function () {
  var out = [];
  function textRect(el) {
    var r = document.createRange();
    r.selectNodeContents(el);
    var b = r.getBoundingClientRect();
    return b.width ? b : el.getBoundingClientRect();
  }
  function hit(a, b, pad) {
    pad = pad || 0;
    return a.left < b.right - pad && b.left < a.right - pad && a.top < b.bottom - pad && b.top < a.bottom - pad;
  }
  function inside(a, b, tol) {
    tol = tol || 1;
    return a.left >= b.left - tol && a.right <= b.right + tol && a.top >= b.top - tol && a.bottom <= b.bottom + tol;
  }
  function fs(el) { return parseFloat(getComputedStyle(el).fontSize); }
  function circle(el) {
    // starburst: test against its inner circle (74% of the box), not the square
    var b = el.getBoundingClientRect(), r = b.width * 0.37, cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    return { left: cx - r, right: cx + r, top: cy - r, bottom: cy + r };
  }

  var dots = document.querySelector('.slick-dots');
  var slides = [].slice.call(document.querySelectorAll('.g3-promo'));
  var current = document.querySelector('.slick-current .g3-promo');

  slides.forEach(function (p, idx) {
    var q = function (s) { return p.querySelector(s); };
    var box = p.getBoundingClientRect();
    var panel = q('.g3-promo__panel').getBoundingClientRect();
    var issues = [];
    var texts = {
      headline: [].map.call(p.querySelectorAll('.g3-promo__hl'), textRect),
      tag: textRect(q('.g3-promo__tag')),
      system: textRect(q('.g3-promo__system')),
      spec: textRect(q('.g3-promo__spec')),
      price: q('.g3-promo__price').getBoundingClientRect(),
      cta: q('.g3-promo__cta').getBoundingClientRect(),
      offerTab: q('.g3-promo__offer-tab').getBoundingClientRect(),
      logo: q('.g3-promo__logo').getBoundingClientRect()
    };
    var burst = circle(q('.g3-promo__burst'));
    var burstBox = q('.g3-promo__burst').getBoundingClientRect();
    var cluster = q('.g3-promo__cluster').getBoundingClientRect();
    var card = q('.g3-promo__card').getBoundingClientRect();
    var terms = q('.g3-promo__terms').getBoundingClientRect();

    // everything that carries text stays inside the slide
    var all = texts.headline.concat([texts.tag, texts.system, texts.spec, texts.price, texts.cta, texts.offerTab, texts.logo, burstBox]);
    all.forEach(function (r, i) { if (!inside(r, box, 1)) issues.push('clipped by slide edge: item ' + i); });
    texts.headline.concat([texts.tag, texts.system, texts.spec, texts.price, texts.cta, texts.logo]).forEach(function (r, i) {
      if (!inside(r, panel, 2)) issues.push('outside panel: item ' + i);
    });

    // the starburst covers no text
    texts.headline.concat([texts.tag, texts.system, texts.spec, texts.price, texts.cta, texts.offerTab, texts.logo]).forEach(function (r, i) {
      if (hit(burst, r, 2)) issues.push('starburst overlaps text item ' + i);
    });
    // the product sits under the card, never under the headline or tag text
    texts.headline.concat([texts.tag]).forEach(function (r, i) {
      if (hit(cluster, r, 4)) issues.push('product overlaps headline/tag item ' + i);
    });
    // card text stays in the card; price and CTA do not collide
    [texts.system, texts.spec, texts.logo].forEach(function (r, i) {
      if (!inside(r, card, 3)) issues.push('card text overflows card: item ' + i);
    });
    if (hit(texts.price, texts.cta, 0)) issues.push('price overlaps CTA');
    if (hit(texts.price, terms, 0) || hit(texts.cta, terms, 0)) issues.push('price or CTA overlaps terms strip');
    texts.headline.forEach(function (r, i) { if (hit(r, card, 0)) issues.push('headline line ' + i + ' overlaps card'); });
    [texts.offerTab, texts.logo, texts.system, texts.spec, texts.price].forEach(function (r, i) {
      if (hit(texts.tag, r, 0)) issues.push('tag overlaps ' + ['offer tab', 'card logo', 'system', 'spec', 'price'][i]);
    });
    texts.headline.forEach(function (r, i) { if (hit(r, texts.offerTab, 0)) issues.push('headline line ' + i + ' overlaps offer tab'); });

    // dots, measured for the slide that is showing
    if (dots && p === current) {
      var d = dots.getBoundingClientRect();
      [card, texts.price, texts.cta, terms, cluster].forEach(function (r, i) {
        if (hit(d, r, 0)) issues.push('dots overlap ' + ['card', 'price', 'CTA', 'terms', 'product'][i]);
      });
    }

    out.push({
      slide: idx + 1,
      box: Math.round(box.width) + ' x ' + Math.round(box.height),
      ratio: +(box.width / box.height).toFixed(2),
      layout: getComputedStyle(q('.g3-promo__frame')).getPropertyValue('--g3-layout').trim().replace(/"/g, ''),
      px: {
        headlineLg: fs(q('.g3-promo__hl--lg')),
        burst500: fs(q('.g3-promo__burst-lg')),
        burstSmall: fs(q('.g3-promo__burst-sm')),
        price: fs(q('.g3-promo__price')),
        system: fs(q('.g3-promo__system')),
        spec: fs(q('.g3-promo__spec')),
        terms: Math.min.apply(null, [].map.call(p.querySelectorAll('.g3-promo__terms p'), fs)),
        cta: fs(q('.g3-promo__cta'))
      },
      ctaHeight: Math.round(texts.cta.height),
      cluster: Math.round(cluster.width) + 'x' + Math.round(cluster.height),
      issues: issues
    });
  });

  var mins = [];
  out.forEach(function (s) {
    if (s.px.terms < 11) mins.push('slide ' + s.slide + ' terms ' + s.px.terms);
    if (s.px.spec < 13) mins.push('slide ' + s.slide + ' spec ' + s.px.spec);
    if (innerWidth < 768 && s.px.price < 32) mins.push('slide ' + s.slide + ' price ' + s.px.price);
  });
  return { viewport: innerWidth, slides: out, minimums: mins };
};

// One-line summary for both slides, checking the dots on each slide in turn
window.g3AuditRun = async function () {
  await document.fonts.ready;
  var $s = window.jQuery && jQuery('.banner-v3-deal-slider');
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  if ($s && $s.hasClass('slick-initialized')) { $s.slick('slickGoTo', 0, true); await wait(500); }
  var a = g3Audit();
  var b = a;
  if ($s && $s.hasClass('slick-initialized') && a.slides.length > 1) { $s.slick('slickGoTo', 1, true); await wait(500); b = g3Audit(); $s.slick('slickGoTo', 0, true); }
  return a.viewport + ' | ' + a.slides.map(function (s, i) {
    var dotIssues = (i === 0 ? a : b).slides[i].issues;
    return 'S' + s.slide + ' ' + s.box + ' r' + s.ratio + ' ' + s.layout +
      ' hl' + s.px.headlineLg.toFixed(0) + ' $' + s.px.burst500.toFixed(0) + '/' + s.px.burstSmall.toFixed(1) +
      ' p' + s.px.price.toFixed(0) + ' sys' + s.px.system.toFixed(0) + ' spec' + s.px.spec.toFixed(0) +
      ' t' + s.px.terms.toFixed(0) + ' cta' + s.px.cta.toFixed(0) + ' prod ' + s.cluster + ' :: ' + (dotIssues.join('; ') || 'ok');
  }).join(' || ') + ' || mins: ' + (a.minimums.join(', ') || 'ok');
};
