const elements = document.querySelectorAll('.highlight-text-auto');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0 });

elements.forEach(el => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("submitQuiz");
  const resultBox = document.getElementById("quizResult");

  const messages = {
    dev: "AppSplash – Mobile Development: Learn how to build Android apps using XML & Java.",
    design: "Divology – Web Dev & UI/UX: Learn wireframing and converting designs into code.",
    biz: "Marketive – Digital Marketing: Learn offline & online marketing and design hacks.",
    biz2: "Investenuer – Entrepreneurship: Learn how to get funds, deal with sponsors, and adopt investors' mentality.",
    iot: "Techsolve – Hardware & Software: Combine Arduino & electronics with programming."
  };

  btn.addEventListener("click", () => {
    const answers = {};

    for (let i = 1; i <= 8; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected) {
        const value = selected.value;
        answers[value] = (answers[value] || 0) + 1;
      }
    }

    const totalAnswered = Object.values(answers).reduce((a, b) => a + b, 0);
    if (totalAnswered < 8) {
      resultBox.className = "quiz-result-box error";
      resultBox.style.display = "block";
      resultBox.textContent = "❌ Please answer all questions.";
      return;
    }

    const best = Object.entries(answers).sort((a, b) => b[1] - a[1])[0][0];
    resultBox.className = "quiz-result-box";
    resultBox.style.display = "block";
    resultBox.innerHTML = `<p>${messages[best]}</p>`;
  });
});
