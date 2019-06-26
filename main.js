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
let upDownButtons = document.querySelectorAll(".arrow");

let sessionTimeDisplay = $("#session-time");
let breakTimeDisplay = $("#break-time");
let display = $(".timer");
let heading = $(".heading");

let sessionTime = 1500000;
let breakTime = 300000;
let pomodoro = new Pomodoro(sessionTime, display, breakTime);

window.onload = updateDisplayTimer();


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
  pomodoro.breakTimer.reset();
  pomodoro.duration = sessionTime;
  pomodoro.breakTime = breakTime;
  sessionTime = 1500000;
  breakTime = 300000;
  sessionTimeDisplay.textContent = sessionTime / 60000;
  breakTimeDisplay.textContent = breakTime / 60000;
  playBtn.src = "play.png";
  heading.textContent = "Session";

  for (let i = 0; i < upDownButtons.length; i++) {
    upDownButtons[i].classList.remove("not-allowed");
  }
}

sessionUp.addEventListener("click", function() {
  if (!pomodoro.running) {
    sessionTime = sessionTime + 60000;
    sessionTimeDisplay.textContent = sessionTime / 60000;
    updateDisplayTimer();
  }
});

sessionDown.addEventListener("click", function() {
  if (!pomodoro.running) {
    if (sessionTime > 60000) {
      sessionTime = sessionTime - 60000;
      sessionTimeDisplay.textContent = sessionTime / 60000;
      updateDisplayTimer();
    };
  };
});

breakUp.addEventListener("click", function() {
  if (!pomodoro.running) {
    breakTime = breakTime + 60000;
    breakTimeDisplay.textContent = breakTime / 60000;
  };
});

breakDown.addEventListener("click", function() {
  if (!pomodoro.running) {
    if (breakTime > 60000) {
      breakTime = breakTime - 60000;
      breakTimeDisplay.textContent = breakTime / 60000;
    };
  };
});

resetBtn.addEventListener("click", resetTimers);

playBtn.addEventListener("click", function(element) {
  let image = element.target;
  pomodoro.duration = sessionTime;
  pomodoro.breakTimer.duration = breakTime;
  for (let i = 0; i < upDownButtons.length; i++) {
    upDownButtons[i].classList.add("not-allowed");
  }

  if (!pomodoro.started && !pomodoro.breakTimer.started) {
    pomodoro.start();
    image.src = "pause.png";
  } else if (pomodoro.started && !pomodoro.paused) {
    pomodoro.pauseTimer();
    image.src = "play.png";
  } else if (pomodoro.paused) {
    pomodoro.start();
    image.src = "pause.png";
  } else if (pomodoro.breakTimer.started && !pomodoro.breakTimer.paused) {
    pomodoro.breakTimer.pauseTimer();
    image.src = "play.png";
  } else if (pomodoro.breakTimer.paused) {
    pomodoro.breakTimer.start();
    image.src = "pause.png";
  }
})
