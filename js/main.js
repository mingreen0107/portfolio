document.addEventListener('DOMContentLoaded', () => {
  // FAQ
  const faqQuestions = document.querySelectorAll('.faq-q');

  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const currentItem = question.parentElement;
      const isOpen = currentItem.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('open');
      });

      if (!isOpen) {
        currentItem.classList.add('open');
      }
    });
  });

  // HERO profile motion
  const profileFrame = document.querySelector('.hero-card-photo-track');
  const profileImage = document.querySelector('.hero-profile-img');

  if (profileFrame && profileImage) {
    // 눈 반짝이 레이어 추가
    const leftSparkle = document.createElement('span');
    leftSparkle.className = 'eye-sparkle left';

    const rightSparkle = document.createElement('span');
    rightSparkle.className = 'eye-sparkle right';

    profileFrame.appendChild(leftSparkle);
    profileFrame.appendChild(rightSparkle);

    const maxRotate = 18;
    const maxTranslate = 12;
    const maxGlowShift = 16;
    const smoothing = 0.12;

    let currentRX = 0;
    let currentRY = 0;
    let currentTX = 0;
    let currentTY = 0;

    let targetRX = 0;
    let targetRY = 0;
    let targetTX = 0;
    let targetTY = 0;
    let glowX = 0;
    let glowY = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const animate = () => {
      currentRX += (targetRX - currentRX) * smoothing;
      currentRY += (targetRY - currentRY) * smoothing;
      currentTX += (targetTX - currentTX) * smoothing;
      currentTY += (targetTY - currentTY) * smoothing;

      profileFrame.style.transform = `
        rotateX(${currentRX * 0.35}deg)
        rotateY(${currentRY * 0.35}deg)
      `;

      profileImage.style.transform = `
        translate3d(${currentTX}px, ${currentTY}px, 24px)
        rotateX(${currentRX}deg)
        rotateY(${currentRY}deg)
        scale(1.03)
      `;

      profileFrame.style.setProperty(
        '--glow-shift',
        `${glowX}px ${glowY}px`
      );

      requestAnimationFrame(animate);
    };

    const updateByViewportCursor = (clientX, clientY) => {
      if (prefersReducedMotion) return;

      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;

      const percentX = (clientX - vw / 2) / (vw / 2);
      const percentY = (clientY - vh / 2) / (vh / 2);

      const limitedX = clamp(percentX, -1, 1);
      const limitedY = clamp(percentY, -1, 1);

      targetRY = limitedX * maxRotate;
      targetRX = limitedY * -maxRotate;

      targetTX = limitedX * maxTranslate;
      targetTY = limitedY * maxTranslate;

      glowX = limitedX * maxGlowShift;
      glowY = limitedY * maxGlowShift;

      profileFrame.classList.add('is-active');

      profileFrame.style.setProperty(
        'background',
        `radial-gradient(circle at ${50 + limitedX * 12}% ${42 + limitedY * 10}%,
          rgba(255,255,255,0.98) 0%,
          rgba(237,232,255,0.96) 36%,
          rgba(220,210,255,0.96) 100%)`
      );

      profileFrame.style.setProperty(
        'box-shadow',
        `
        ${-limitedX * 8}px ${20 - limitedY * 4}px 50px rgba(91, 63, 211, 0.20),
        inset ${limitedX * 2}px ${limitedY * 2}px 0 rgba(255,255,255,0.72)
        `
      );

      profileFrame.style.setProperty(
        '--sparkle-shift-x',
        `${limitedX * 3}px`
      );
      profileFrame.style.setProperty(
        '--sparkle-shift-y',
        `${limitedY * 3}px`
      );
    };

    const resetMotion = () => {
      targetRX = 0;
      targetRY = 0;
      targetTX = 0;
      targetTY = 0;
      glowX = 0;
      glowY = 0;

      profileFrame.classList.remove('is-active');
      profileFrame.style.setProperty(
        'background',
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(237,232,255,0.95) 42%, rgba(220,210,255,0.95) 100%)'
      );
      profileFrame.style.setProperty(
        'box-shadow',
        '0 20px 50px rgba(91, 63, 211, 0.16), inset 0 1px 0 rgba(255,255,255,0.7)'
      );
    };

    document.addEventListener('mousemove', (event) => {
      updateByViewportCursor(event.clientX, event.clientY);
    });

    document.addEventListener('mouseleave', resetMotion);
    window.addEventListener('blur', resetMotion);

    animate();
  }
});