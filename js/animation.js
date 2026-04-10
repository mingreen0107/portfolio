document.addEventListener('DOMContentLoaded', () => {
  // 공통 요소 페이드업 애니메이션
  const animatedElements = document.querySelectorAll('.anim');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // 스킬 바 애니메이션
  const skillsGrid = document.querySelector('.skills-grid');

  if (skillsGrid) {
    const skillObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-fill');

            bars.forEach((bar) => {
              const width = bar.getAttribute('data-w') || '0%';
              bar.style.width = '0';

              setTimeout(() => {
                bar.style.width = width;
              }, 200);
            });

            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillObserver.observe(skillsGrid);
  }
});