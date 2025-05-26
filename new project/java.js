(() => {
  const questions = [
    {
      question: "Which is correct CSS syntax",
      answers: [
        { text: "body;color=black", correct: false },
        { text: "body:color=black", correct: false },
        { text: "Body{color:black}", correct: true },
        { text: "{body color black}", correct: false },
      ]
    },
    {
      question: "Which of the following isn’t an element from HTML5?",
      answers: [
        { text: "canvas", correct: false },
        { text: "close", correct: true },
        { text: "video", correct: false },
        { text: "web workers", correct: false },
      ]
    },
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Hyperlinks and Text Markup Language", correct: false },
        { text: "Hyper and Text Markup Language", correct: false },
        { text: "Hyperlinks  Text Markup Language", correct: false },
      ]
    },
    {
      question: "What will typeof null return?",
      answers: [
        { text: "null", correct: false },
        { text: "object", correct: true },
        { text: "undefined", correct: false },
        { text: "boolean", correct: false },
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Sheets", correct: false },
      ]
    }
  ];

  const userForm = document.getElementById('user-form');
  const usernameInput = document.getElementById('username');

  const quizSection = document.getElementById('quiz');
  const welcomeMsg = document.getElementById('welcome-msg');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.querySelector('.answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const scoreContainer = document.getElementById('score-container');
  const restartButton = document.getElementById('restart-btn');

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;
  let username = "";

  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    username = usernameInput.value.trim();
    if (!username) {
      alert("Please enter your name to start the quiz.");
      usernameInput.focus();
      return;
    }

    startQuiz();
    userForm.style.display = 'none';
    quizSection.style.display = 'block';
    welcomeMsg.textContent = `Welcome, ${username}! Let's begin the quiz.`;
    quizSection.focus();
  });

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.textContent = '';
    restartButton.style.display = 'none';
    nextButton.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    answered = false;
    clearStatusClass();
    questionElement.textContent = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.classList.add('answer-btn');
      button.textContent = answer.text;
      button.setAttribute('type', 'button');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
    nextButton.style.display = 'none';
  }

  function selectAnswer(e) {
    if (answered) return;
    answered = true;
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) score++;

    setStatusClass(selectedButton, correct);

    Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        setStatusClass(button, true);
      } else {
        setStatusClass(button, false);
      }
    });

    if (currentQuestionIndex < questions.length - 1) {
      nextButton.style.display = 'inline-block';
      nextButton.focus();
    } else {
      showScore();
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    element.classList.add(correct ? 'correct' : 'wrong');
  }

  function clearStatusClass(element) {
    if (!element) {
      Array.from(answerButtonsElement.children).forEach(btn => {
        btn.classList.remove('correct');
        btn.classList.remove('wrong');
      });
      return;
    }
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function showScore() {
    questionElement.textContent = `${username}, you scored ${score} out of ${questions.length}!`;
    answerButtonsElement.innerHTML = '';
    nextButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    restartButton.focus();
  }

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextButton.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
  });

  restartButton.addEventListener('click', () => {
    userForm.style.display = 'block';
    quizSection.style.display = 'none';
    userForm.reset();
    usernameInput.focus();
  });

  // Initial setup
  quizSection.style.display = 'none';
  usernameInput.focus();
})();
