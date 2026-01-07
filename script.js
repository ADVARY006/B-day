import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ========= DOM ELEMENTS ========= */
const nameInput = document.getElementById("user-name");
let userName = "";

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

/* ========= FIREBASE SAVE ========= */
async function saveQuizAnswersToFirebase(answersArray) {
  const db = window.firebaseDB;

  if (!db) {
    throw new Error("Firestore DB not initialized");
  }

  await addDoc(collection(db, "quizAnswers"), {
    name: userName,
    answers: answersArray,
    submittedAt: new Date()
  });
}

/* ========= QUESTIONS DATA ========= */
const quizQuestions = [
  {
    question: "周末の理想的な過ごし方は？",
    answers: [
      "家でゆっくり映画を見たり本を読む",
      "友達と賑やかにパーティーや外出",
      "彼氏と二人でデートや散歩",
      "新しい趣味や冒険的なアクティビティ"
    ]
  },
  {
    question: "恋人で一番大事なところは？",
    answers: [
      "いつも優しくて思いやりがある",
      "面白くて一緒に笑える",
      "頼りになってサポートしてくれる",
      "情熱的でロマンチック"
    ]
  },
  {
    question: "ストレスを感じた時はどうする？",
    answers: [
      "一人で静かにリラックスする",
      "友達や恋人に話して相談する",
      "運動や外出して気分転換",
      "お気に入りの食べ物や甘いもので癒される"
    ]
  },
  {
    question: "理想のデートは？",
    answers: [
      "高級レストランでディナー",
      "家で手作りご飯と映画",
      "テーマパークや旅行などの冒険",
      "カフェでおしゃべりしたり散策"
    ]
  },
  {
    question: "愛情表現で一番嬉しいのは？",
    answers: [
      "言葉で「好きだよ」と言われる",
      "ハグやキスなどの触れ合い",
      "サプライズプレゼントや気遣い",
      "一緒に時間をたくさん過ごす"
    ]
  },
  {
    question: "友達からどんなタイプと言われる？",
    answers: [
      "明るくてみんなのムードメーカー",
      "落ち着いていて聞き上手",
      "夢があって頑張り屋",
      "可愛くて甘えん坊"
    ]
  },
  {
    question: "休日の朝、最初にしたいことは？",
    answers: [
      "ゆっくり寝坊する",
      "早く起きてカフェに行く",
      "恋人にメッセージを送る",
      "運動やヨガでスタート"
    ]
  },
  {
    question: "旅行に行くならどんなスタイル？",
    answers: [
      "計画たっぷりで観光名所巡り",
      "行き当たりばったりで自由に",
      "リゾートでリラックス中心",
      "アクティビティ満載のアドベンチャー"
    ]
  },
  {
    question: "プレゼントで嬉しいものは？",
    answers: [
      "手紙やメッセージ付きのもの",
      "実用的な日常使いのアイテム",
      "かわいいアクセサリーや服",
      "体験型のもの（コンサートチケットなど）"
    ]
  },
  {
    question: "将来の夢や大事にしたいことは？",
    answers: [
      "幸せな家庭を築く",
      "キャリアや目標を達成する",
      "たくさんの思い出を作る旅",
      "周りの人を幸せにする"
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

        userAnswers[dataIndex] = quizQuestions[dataIndex].answers[btnIndex];
        selectedOnPage[qIndex] = true;

        if (selectedOnPage[0] && selectedOnPage[1]) {
          nextBtn.disabled = false;
        }
      };
    });
  });

  const percent =
    ((currentQuestionIndex + QUESTIONS_PER_PAGE) / TOTAL_QUESTIONS) * 100;
  progressBar.style.width = `${percent}%`;

  nextBtn.textContent =
    currentQuestionIndex + QUESTIONS_PER_PAGE >= TOTAL_QUESTIONS
      ? "完了"
      : "次へ";
}

/* ========= EVENTS ========= */
startBtn.addEventListener("click", () => {
  if (!nameInput.value.trim()) {
    alert("お名前を入力してください 💕");
    return;
  }

  userName = nameInput.value.trim();
  startScreen.classList.remove("active");
  questionScreen.classList.add("active");
  loadQuestions();
});

nextBtn.addEventListener("click", async () => {
  currentQuestionIndex += QUESTIONS_PER_PAGE;

  selectedOnPage = [false, false];
  nextBtn.disabled = true;

  if (currentQuestionIndex >= TOTAL_QUESTIONS) {
    console.log("Attempting Firebase save...");

    await saveQuizAnswersToFirebase(userAnswers);

    console.log("Firebase save SUCCESS");

    localStorage.setItem("herAnswers", JSON.stringify(userAnswers));

    setTimeout(() => {
      window.location.href = "../site 2/birthday.html";
    }, 300);
  } else {
    loadQuestions();
  }
});
