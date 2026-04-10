document.addEventListener('DOMContentLoaded', () => {
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
});