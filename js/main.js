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

  // HERO profile cursor follow
  const profileFrame = document.querySelector('.hero-card-photo-track');
  const profileImage = document.querySelector('.hero-profile-img');

  if (profileFrame && profileImage) {
    const maxRotate = 16;
    const maxTranslate = 10;

    const resetMotion = () => {
      profileFrame.classList.remove('is-hovered');
      profileFrame.style.transform = 'rotateX(0deg) rotateY(0deg)';
      profileImage.style.transform =
        'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    profileFrame.addEventListener('mousemove', (event) => {
      const rect = profileFrame.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateY = percentX * maxRotate;
      const rotateX = percentY * -maxRotate;

      const moveX = percentX * maxTranslate;
      const moveY = percentY * maxTranslate;

      profileFrame.classList.add('is-hovered');

      profileFrame.style.transform = `
        rotateX(${rotateX * 0.35}deg)
        rotateY(${rotateY * 0.35}deg)
      `;

      profileImage.style.transform = `
        translate3d(${moveX}px, ${moveY}px, 18px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
      `;
    });

    profileFrame.addEventListener('mouseleave', resetMotion);
    profileFrame.addEventListener('mouseenter', () => {
      profileFrame.classList.add('is-hovered');
    });

    resetMotion();
  }
});