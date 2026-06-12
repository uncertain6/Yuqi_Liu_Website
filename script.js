

    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
    });

    let currentPage = 'home'; // tracks which page is currently active
    const overlay   = document.getElementById('overlay');

    function navigate(to) {
      if (to === currentPage) return; // already here, do nothing

      // Step 1: sweep the overlay in (covers the whole screen)
      overlay.classList.remove('swept');
      overlay.classList.add('sweeping');

      setTimeout(() => {

        // Step 2: deactivate the current page
        const oldPage = document.getElementById('page-' + currentPage);
        oldPage.classList.remove('active');
        oldPage.classList.add('exit');
        setTimeout(() => oldPage.classList.remove('exit'), 400); // cleanup after animation

        // Step 3: activate the new page and reset its scroll position
        const newPage = document.getElementById('page-' + to);
        newPage.classList.add('active');
        newPage.scrollTop = 0;
        currentPage = to;

        // Step 4: highlight the correct nav button
        document.querySelectorAll('.nav-links button').forEach(btn => btn.classList.remove('active'));
        document.getElementById('btn-' + to).classList.add('active');

        // Step 5: trigger stagger animations on the incoming page
        setTimeout(() => triggerStagger(newPage), 60);

        // Step 6: sweep the overlay back out
        overlay.classList.remove('sweeping');
        overlay.classList.add('swept');
        setTimeout(() => overlay.classList.remove('swept'), 500); // cleanup

      }, 280); // wait for overlay to fully cover before swapping pages
    }

    function triggerStagger(page) {
      page.querySelectorAll('.stagger').forEach(el => {
        el.classList.remove('visible');
        void el.offsetWidth; // force browser reflow so the animation restarts cleanly
        el.classList.add('visible');
      });
    }

    // Run on first load for the home page
    triggerStagger(document.getElementById('page-home'));

    document.getElementById('btn-home').addEventListener('click', () => {
      document.querySelectorAll('.hero-name .word').forEach(word => {
        word.style.animation = 'none';
        void word.offsetWidth; // reflow to reset the animation state
        word.style.animation = '';
      });
    });

    const startYear   = 2026; // <-- Change this if you launched in a different year
    const currentYear = new Date().getFullYear();
    const yearDisplay = currentYear > startYear
      ? `${startYear} \u2013 ${currentYear}` // e.g. "2026 – 2031"
      : `${startYear}`;                       // e.g. "2026"

    document.getElementById('footer-year').textContent = yearDisplay;

  