/* ========= DOM ELEMENTS ========= */
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

const questionNumbers = document.querySelectorAll(".question-number");
const questionTexts = document.querySelectorAll(".question-text");
const answerGroups = document.querySelectorAll(".answers");

const progressBar = document.getElementById("progress-bar");

/* ========= STATE ========= */
let currentQuestionIndex = 0;
let userAnswers = [];
let selectedOnPage = [false, false];

const QUESTIONS_PER_PAGE = 2;
const TOTAL_QUESTIONS = 10;

/* ========= QUESTIONS DATA ========= */
const quizQuestions = [
  {
    question: "誰かと一緒にいる時、一番大切にしたいことは？",
    answers: [
      "安心できること",
      "自然体でいられること",
      "たくさん笑えること",
      "ちゃんと大切にされていると感じること"
    ]
  },
  {
    question: "好きな人と過ごす理想の時間は？",
    answers: [
      "静かに一緒に過ごす",
      "会話が途切れない時間",
      "一緒に何かをする",
      "特別じゃない日常を共有する"
    ]
  },
  {
    question: "相手に一番求めるものはどれ？",
    answers: [
      "優しさと思いやり",
      "誠実さと信頼",
      "楽しさと明るさ",
      "安心感と安定"
    ]
  },
  {
    question: "相手からされると嬉しいことは？",
    answers: [
      "さりげない気遣い",
      "ちゃんと話を聞いてくれること",
      "一緒に過ごす時間を大切にしてくれること",
      "特別扱いしてくれること"
    ]
  },
  {
    question: "どんな人に惹かれやすい？",
    answers: [
      "静かで落ち着いた人",
      "優しく包んでくれる人",
      "一緒にいて楽しい人",
      "自分を理解してくれる人"
    ]
  },
  {
    question: "好きな人といる時の自分は？",
    answers: [
      "甘えたくなる",
      "素直になれる",
      "たくさん話したくなる",
      "ただそばにいたくなる"
    ]
  },
  {
    question: "理想の関係に一番近いのは？",
    answers: [
      "安心できる関係",
      "何でも話せる関係",
      "楽しくて前向きな関係",
      "無理をしなくていい関係"
    ]
  },
  {
    question: "相手に一番してほしいことは？",
    answers: [
      "気持ちを大切にしてほしい",
      "時間を大切にしてほしい",
      "信頼してほしい",
      "そばにいてほしい"
    ]
  },
  {
    question: "好きな人との距離感は？",
    answers: [
      "近いほうが安心する",
      "適度な距離がいい",
      "気持ちが繋がっていればいい",
      "自然に任せたい"
    ]
  },
  {
    question: "最後にひとつだけ。",
    answers: [
      "優しさ",
      "安心感",
      "信頼",
      "一緒にいる時間"
    ]
  }
];

/* ========= FUNCTIONS ========= */
function loadQuestions() {
  nextBtn.disabled = true;

  questionTexts.forEach((qText, qIndex) => {
    const dataIndex = currentQuestionIndex + qIndex;

    qText.textContent = quizQuestions[dataIndex].question;
    questionNumbers[qIndex].textContent = `質問 ${dataIndex + 1}`;

    const buttons = answerGroups[qIndex].querySelectorAll(".answer-btn");

    buttons.forEach((btn, btnIndex) => {
      btn.textContent = `${btnIndex + 1}. ${quizQuestions[dataIndex].answers[btnIndex]}`;
      btn.classList.remove("selected");

      btn.onclick = () => {
        buttons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");

        // save answer
        userAnswers[dataIndex] = quizQuestions[dataIndex].answers[btnIndex];

        // mark this question answered
        selectedOnPage[qIndex] = true;

        checkPageCompletion();
      };
    });
  });

  updateProgress();
  updateButtonText();
}

function checkPageCompletion() {
  if (selectedOnPage[0] && selectedOnPage[1]) {
    nextBtn.disabled = false;
  }
}

function updateProgress() {
  const percent =
    ((currentQuestionIndex + QUESTIONS_PER_PAGE) / TOTAL_QUESTIONS) * 100;
  progressBar.style.width = `${percent}%`;
}

function updateButtonText() {
  if (currentQuestionIndex + QUESTIONS_PER_PAGE >= TOTAL_QUESTIONS) {
    nextBtn.textContent = "完了";
  } else {
    nextBtn.textContent = "次へ";
  }
}

/* ========= EVENTS ========= */
startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  questionScreen.classList.add("active");
  loadQuestions();
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex += QUESTIONS_PER_PAGE;

  // reset page state
  selectedOnPage = [false, false];
  nextBtn.disabled = true;

  if (currentQuestionIndex >= TOTAL_QUESTIONS) {
    // ✅ SAVE ANSWERS FOR SITE 2
    localStorage.setItem("herAnswers", JSON.stringify(userAnswers));

    // ✅ DEV CHECK
    console.log("User answers:", userAnswers);

    // ✅ MOVE TO BIRTHDAY SITE
    window.location.href = "../site 2/birthday.html";
  } else {
    loadQuestions();
  }
});
