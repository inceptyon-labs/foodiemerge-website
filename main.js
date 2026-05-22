// Merge-loop demo: auto-cycle steps unless the user picks one manually,
// or the OS asks for reduced motion. Keep this tiny and dependency-free.

(() => {
  const track = document.getElementById('loopTrack');
  if (!track) return;

  const steps = Array.from(track.querySelectorAll('.loop__step'));
  const dots = Array.from(document.querySelectorAll('.loop__dot'));
  if (steps.length === 0 || dots.length === 0) return;

  const STEP_MS = 4200;
  const USER_GRACE_MS = 8000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let activeIndex = 0;
  let timer = null;
  let userInterruptedAt = 0;
  let inView = false;

  const setActive = (i) => {
    activeIndex = ((i % steps.length) + steps.length) % steps.length;
    steps.forEach((el, idx) => {
      el.classList.toggle('is-active', idx === activeIndex);
      el.classList.toggle('is-complete', activeIndex > 0 && idx < activeIndex);
    });
    track.dataset.activeStep = String(activeIndex);
    dots.forEach((el, idx) => el.classList.toggle('is-active', idx === activeIndex));
  };

  const tick = () => setActive(activeIndex + 1);

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  const tryStart = () => {
    if (reduceMotion || document.hidden || !inView) return;
    if (Date.now() - userInterruptedAt < USER_GRACE_MS) {
      const wait = USER_GRACE_MS - (Date.now() - userInterruptedAt);
      stop();
      timer = setTimeout(() => {
        timer = null;
        tryStart();
      }, wait);
      return;
    }
    stop();
    timer = setInterval(tick, STEP_MS);
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.dataset.go);
      if (Number.isNaN(target)) return;
      userInterruptedAt = Date.now();
      stop();
      setActive(target);
      tryStart();
    });
  });

  // Pause when the loop is offscreen so we're not animating in the background.
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            inView = entry.isIntersecting;
            if (inView) tryStart();
            else stop();
          }
        },
        { threshold: 0.2 }
      )
    : null;

  setActive(0);

  if (io) {
    io.observe(track);
  } else {
    inView = true;
    tryStart();
  }

  // Pause when the tab is hidden, resume on return.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else tryStart();
  });

  // Scroll-spy: light up the matching nav link as the user scrolls past sections.
  const navLinks = Array.from(document.querySelectorAll('.topbar__nav a'));
  const sections = navLinks
    .map((link) => {
      const id = (link.getAttribute('href') || '').slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const setCurrent = (id) => {
      navLinks.forEach((link) => {
        const match = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-current', match);
        if (match) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };
    const visible = new Map();
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let bestId = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setCurrent(bestId);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();
