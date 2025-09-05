// IntersectionObserver reveals
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));

    // Parallax engine (rAF)
    const px = document.querySelectorAll('[data-parallax]');
    let lastY = 0;
    function onScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (Math.abs(y - lastY) < 0.5) { requestAnimationFrame(onScroll); return; }
      lastY = y;
      px.forEach(el => {
        const speed = parseFloat(el.dataset.speed || 0.1);
        el.style.transform = `translateY(${y * speed * -1}px)`;
      });
      requestAnimationFrame(onScroll);
    }
    requestAnimationFrame(onScroll);

    // Small hover parallax on cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(${-3 + dy * -2}px) rotateX(${dy * 2}deg) rotateY(${dx * 2}deg)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });