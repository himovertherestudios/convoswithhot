
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultBox = document.getElementById("resultBox");
const categoryDropdown = document.getElementById("categoryDropdown");
const clickSound = document.getElementById("clickSound");

const questionBank = {
  "Wild For Creators": [
    "What's your 'I know this is about to go viral' move on camera?",
    "You ever shot something that made you question your life choices?",
    "If your sex life was a song title, what would it be?",
    "What's the wildest costume or character you've had to play?",
    "What's your least favorite thing to do-but you do it for the fans?",
    "You ever been mid-scene and caught the ick?",
    "Do you watch your own scenes?",
    "You ever caught real feelings on set?",
    "What's one fetish request that had you like \"nah\"?",
    "What scene made you feel like, 'Yo, this is art'?",
    "What's your 'safe word' on set vs. in real life?",
    "Ever had a moment like, 'This job ain't for me'?",
    "What's more important: chemistry or performance?",
    "Ever pulled up to set drunk or high?",
    "What's a boundary you didn't have when you started - but protect now?",
    "What's in your 'go bag' right now?",
    "Has an ex ever tried to spin the block after you blew up?",
    "Who in the industry makes you nervous in a good way?",
    "You ever filmed something that made you laugh mid-scene?",
    "What's your guilty pleasure content that you'd never post but love to do?"
  ],
  "Funny & Unexpected": [
    "What's your post-nut snack of choice?",
    "What's always in your shoot bag that has nothing to do with sex?",
    "What's the weirdest fan request you've actually done?",
    "Ever ghosted a collab and fumbled a bag?",
    "What's your 'I'm too pretty for this' moment?",
    "Ever faked an injury to get out of a scene?",
    "What's your nickname in the group chat?",
    "Name your content brand after a food - go.",
    "What's the most creative way you dodged a shoot?",
    "If your fans knew THIS one thing about you, they'd be shook",
    "What's the wildest thing a fan has ever said to you in public?",
    "Ever had a wardrobe malfunction mid-shoot?",
    "What's the pettiest reason you turned down a collab?",
    "What's the last DM that made you drop your phone?",
    "Describe your worst fake moan - right now, go."
  ],
  "Deep Af": [
    "What healed you through sex work?",
    "What's a moment that made you feel like 'I made it'?",
    "How do you separate content self from real self?",
    "What's something you do for pleasure outside of content?",
    "What's one fear you're still working through in this space?",
    "Ever lose yourself trying to keep up with fans or trends?",
    "What does intimacy mean to you now?",
    "What keeps you going when it gets overwhelming?",
    "Have you ever had a fan tell you your content helped or saved them?",
    "What's your post-retirement plan (or are you riding this forever)?",
    "What's the loneliest part of this business that nobody talks about?",
    "How has sex work changed your relationship with love?",
    "What do you wish your family understood about your career?",
    "What's something you're still healing from while performing for others?",
    "Do you think you'll ever be fully comfortable being *seen*?"
  ],
  "Fan Zone": [
    "You here solo or with someone you shouldn't be with?",
    "You ever subbed to someone's OF then regretted it immediately?",
    "Watching for the plot or the positions?",
    "Got burner accounts or you bold with the bookmarks?",
    "What's your sneaky link name in your phone?",
    "Would your mama be mad if she saw you here?",
    "What's your safe word? Don't lie.",
    "Ever convinced a partner to start an OF?",
    "What's one thing you've never told your group chat about this weekend?",
    "You ever practiced your moan?",
    "Who would play you in your own adult scene?",
    "What's a position that looks better on video than it feels in real life?",
    "You ever followed someone just for their spicy story posts?",
    "What's your 'I'm not proud of this, but I'd do it again' moment?",
    "Be honest - how many creators you subscribed to right now?",
    "What would your friends say if they saw your search history?",
    "You ever been caught watching something you shouldn't?",
    "What's your 'freaky unlock' moment?",
    "Ever slid in a creator's DMs and actually got a response?",
    "You here to observe or participate?"
  ],
  "This Or That": [
    "Dominant or Submissive?",
    "Make love or Break backs?",
    "Content Creator or Content Consumer?",
    "Silent Partner or Loud Investor?",
    "Lights On or Off?",
    "Choke or Stroke?",
    "Morning or Midnight?",
    "Moan or Stay Silent?",
    "Real Freaks or Roleplay Pros?",
    "Foreplay or Finish Line?",
    "Collab or Solo?",
    "Lace or Latex?",
    "Be Filmed or Do the Filming?",
    "Hotel Link or Stay Home & Stream?",
    "Real Chemistry or Production Value?"
  ]
};

let startAngle = 0;
let slices = ["", "", "", "", ""];
const colors = ["#c9bfa7", "#6b705c", "#c9bfa7", "#ffffff", "#6b705c"];
let arc = Math.PI * 2 / slices.length; // ✅ Only declare once


function drawWheel() {
  for (let i = 0; i < slices.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(160, 160);
    ctx.arc(160, 160, 160, angle, angle + arc);
    ctx.fill();
  }
}

function rotateWheel() {
  const selectedCategory = categoryDropdown.value;
  const questions = questionBank[selectedCategory];
  if (!questions || questions.length === 0) return;

  const totalRotation = 360 * 8 + Math.random() * 360;
  const duration = 5000; // 🟢 now 5 seconds
  const start = performance.now();

  function animateSpin(timestamp) {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Sound error:", e));

    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = progress * (2 - progress);
    const currentAngle = totalRotation * easedProgress;
    startAngle = (currentAngle * Math.PI) / 180;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      const picked = questions[Math.floor(Math.random() * questions.length)];
      resultBox.textContent = "🎯 " + picked;
    }
  }

  requestAnimationFrame(animateSpin);
}

drawWheel();
spinBtn.addEventListener("click", rotateWheel);
