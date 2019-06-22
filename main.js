// let display = document.querySelector(".timer");
// let pomodoro = new Pomodoro(10000, display, 5000);
// pomodoro.start();

function $(elementId) {
  return document.querySelector(elementId);
}

let sessionUp = $("#session-up");
let sessionDown = $("#session-down");
let breakUp = $("#break-up");
let breakDown = $("#break-down");
let resetBtn = $("#reset-btn");
let playBtn = $("#play-btn");
let pauseBtn = $("#pause-btn");
let playPauseDiv = $(".play-pause");

let sessionTimeDisplay = $("#session-time");
let breakTimeDisplay = $("#break-time");
let display = $(".timer");

let sessionTime = 1500000;
let breakTime = 300000;
let pomodoro = new Pomodoro(sessionTime, display, breakTime);


function updateDisplayTimer() {
  let hours = parseInt((sessionTime / 1000) / 3600);
  let minutes = parseInt(((sessionTime / 1000) % 3600) / 60);
  let seconds = ((sessionTime / 1000) % 3600) % 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function resetTimers() {
  pomodoro.reset();
  pomodoro.duration = sessionTime;
  pomodoro.breakTime = breakTime;
  sessionTime = 1500000;
  breakTime = 300000;
  sessionTimeDisplay.textContent = sessionTime / 60000;
  breakTimeDisplay.textContent = breakTime / 60000;
  playBtn.src = "play.png";
}

sessionUp.addEventListener("click", function() {
  sessionTime = sessionTime + 60000;
  sessionTimeDisplay.textContent = sessionTime / 60000;
  updateDisplayTimer();
});

sessionDown.addEventListener("click", function() {
  if (sessionTime > 0) {
    sessionTime = sessionTime - 60000;
    sessionTimeDisplay.textContent = sessionTime / 60000;
    updateDisplayTimer();
  };
});

breakUp.addEventListener("click", function() {
  breakTime = breakTime + 60000;
  breakTimeDisplay.textContent = breakTime / 60000;
});

breakDown.addEventListener("click", function() {
  if (breakTime > 0) {
    breakTime = breakTime - 60000;
    breakTimeDisplay.textContent = breakTime / 60000;
  };
});

resetBtn.addEventListener("click", resetTimers);

playBtn.addEventListener("click", function(element) {
  let image = element.target;
  pomodoro.duration = sessionTime;
  pomodoro.breakTimer.duration = breakTime;

  if (image.src.includes("play.png")) {
    if (pomodoro.breakTimer.paused) {
      pomodoro.breakTimer.start();
    } else {
      pomodoro.start();
      image.src = "pause.png";
    }
  } else {
    image.src = "play.png";
    if (pomodoro.breakStarted) {
      pomodoro.breakTimer.pauseTimer();
    } else {
      pomodoro.pauseTimer();
    }
  }
})

//change play-pause button image
if (pomodoro.paused || pomodoro.breakTimer.paused) {
  playBtn.src = "play.png";
}
