const messageBox = document.getElementById("message");
const cakeScene = document.getElementById("cake-scene");
const flame = document.getElementById("flame");
const candle = document.getElementById("candle");
const cake = document.getElementById("cake");
const birthdayText = document.getElementById("birthday-text");
const slices = document.getElementById("slices");
const giftScene = document.getElementById("gift-scene");
const finalScene = document.getElementById("final-scene");

const randomMessages = [
  "君がいるだけで、空気が少し柔らかくなる。",
  "理由はうまく言えないけど、君は特別。",
  "君の存在が、心を落ち着かせてくれる。"
];

const fixedMessages = [
  "気づいてるかもしれないけど、<br>僕はいつも君のことをちゃんと見てる。",
  "世界で一番綺麗な君へ —<br>僕にとって一番大切な存在へ —<br>特別なこの日に。♡"
];

let step = 0;

/* MESSAGE FLOW */
function showMessage(text, cb) {
  messageBox.innerHTML = text;
  messageBox.classList.add("show");
  createBalloons();

  setTimeout(() => {
    messageBox.classList.remove("show");
    setTimeout(cb, 1000);
  }, 3000);
}

showMessage(
  randomMessages[Math.floor(Math.random() * randomMessages.length)],
  () => showMessage(fixedMessages[0],
    () => showMessage(fixedMessages[1],
      () => cakeScene.classList.remove("hidden")
    )
  )
);

/* CAKE LOGIC */
flame.onclick = () => {
  flame.remove();
  birthdayText.classList.remove("hidden");
};

candle.onclick = () => candle.remove();

cake.onclick = () => {
  cakeScene.remove();
  showSlices();
};

/* SLICES */
function showSlices() {
  slices.classList.remove("hidden");

  const data = [
    ["cake_slice.png", "cat_sticker.png"],
    ["cake_slice.png", "shiba_sticker.png"],
    ["cake_slice.png", "chips.png"],
    ["cake_slice.png", "matcha.png"],
    ["cake_slice.png", "porkbun.png"],
    ["cake_slice.png", "konig.png"]
  ];

  data.forEach(pair => {
    const img = document.createElement("img");
    img.src = "images/" + pair[0];
    img.className = "slice";

    img.onclick = () => {
      img.src = "images/" + pair[1];
      img.className = "sticker";
      img.onclick = null;

      if ([...slices.children].every(i => i.className === "sticker")) {
        setTimeout(() => {
          slices.remove();
          giftScene.classList.remove("hidden");
        }, 3000);
      }
    };

    slices.appendChild(img);
  });
}

/* GIFT */
document.getElementById("gift").onclick = () => {
  giftScene.remove();
  finalScene.classList.remove("hidden");
  spawnSideBalloons();
};

/* BALLOONS */
function createBalloons() {
  for (let i = 0; i < 12; i++) {
    const b = document.createElement("img");
    b.src = "images/balloon.png";
    b.className = "balloon";
    b.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 6000);
  }
}

function spawnSideBalloons() {
  setInterval(() => {
    ["5vw", "90vw"].forEach(pos => {
      const b = document.createElement("img");
      b.src = "images/balloon.png";
      b.className = "balloon";
      b.style.left = pos;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 6000);
    });
  }, 1000);
}
