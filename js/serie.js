// Declaração variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "Qual o nome do parceiro de crimes do Dr White em Breacking Bad?",
    "answers": [
      {
        "answer": "Jesse Pinkman",
        "correct": true
      },
      {
        "answer": "Gustavo Fring",
        "correct": false
      },
      {
        "answer": "Saul Goodman",
        "correct": false
      },
      {
        "answer": "Tuco Salamanca",
        "correct": false
      },
    ]
  },
  {
    "question": "Em Game of Thrones quantos dragões Daenerys Targaryen da a luz?",
    "answers": [
      {
        "answer": "Dois",
        "correct": false
      },
      {
        "answer": "Três",
        "correct": true
      },
      {
        "answer": "Um",
        "correct": false
      },
      {
        "answer": "Nenhum",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o nome do personagem prinpal de The Big Bang Theory?",
    "answers": [
      {
        "answer": "Sheldon Cooper",
        "correct": true
      },
      {
        "answer": "Penny",
        "correct": false
      },
      {
        "answer": "Leonard Hofstadter",
        "correct": false
      },
      {
        "answer": "Howard Wolowitz",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual dessas series da netflix tem uma menina com poderes telepáticos?",
    "answers": [
      {
        "answer": "Stranger Things",
        "correct": true
      },
      {
        "answer": "La casa de papel",
        "correct": false
      },
      {
        "answer": "The Umbrela Academy",
        "correct": false
      },
      {
        "answer": "Peaky Blinders",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual Série da Netflix tem como enredo o folclore Braseleiro? ",
    "answers": [
      {
        "answer": "Irmandade",
        "correct": false
      },
      {
        "answer": "Cidade Invisível",
        "correct": true
      },
      {
        "answer": "Sintonia",
        "correct": false
      },
      {
        "answer": "Bom Dia, Verônica",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual foi a primeira séria da Marvel",
    "answers": [
      {
        "answer": "Loki",
        "correct": false
      },
      {
        "answer": "Capitão america e soldado invernal",
        "correct": false
      },
      {
        "answer": "Ms. Marvel",
        "correct": false
      },
      {
        "answer": "WandaVision",
        "correct": true
      },
    ]
  },
]

// Substituição do quizz para a primeria pergunta
function init() {
  // criar a primeira pergunta
  createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

  // Limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Alterar o texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere as alternativas
  questions[i].answers.forEach(function(answer, i) {

    // Cria o template do botão do quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // Remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    // Inserir um evento de click no botão
    answerTemplate.addEventListener("click", function() {
      checkAnswer(this);
    });

  });

  // Incrementar o número da questão
  actualQuestion++;

}

// Verificando resposta do usuário
function checkAnswer(btn) {

  // selecionar todos botões
  const buttons = answersBox.querySelectorAll("button");

  // verifica se a resposta está correta e adiciona classes nos botões
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {

      button.classList.add("correct-answer");

      // checa se o usuário acertou a pergunta
      if(btn === button) {
        // incremento dos pontos
        points++;
      }

    } else {

      button.classList.add("wrong-answer");

    }

  });

  // Exibir próxima pergunta
  nextQuestion();

}

// Exibie a próxima pergunta no quizz
function nextQuestion() {

  // timer para usuário ver as respostas
  setTimeout(function() {

    // verifica se ainda há perguntas
    if(actualQuestion >= questions.length) {
      // apresenta a msg de sucesso
      showSucccessMessage();
      return;
    }

    createQuestion(actualQuestion);

  }, 1200);

}

// Exibe a tela final
function showSucccessMessage() {

  hideOrShowQuizz();

  // trocar dados da tela de sucesso

  // calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {

  // zerar o jogo
  actualQuestion = 0;
  points = 0;
  //hideOrShowQuizz();
  //init();

});

// Inicialização do Quizz
init();