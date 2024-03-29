class Pomodoro {
  constructor(duration, display, breakTime) {
    this.duration = duration;
    this.display = display;
    this.clearance;
    this.timer = this.duration;
    this.paused = false;
    this.breakTimer = new BreakTimer(breakTime, display, this);
    this.pausedTime;
  }

  start() {
    let self = this;

    if (self.paused) {
      self.timer = self.pausedTime;
      self.paused = false;
    } else {
      self.timer = self.duration;
    }
    // let timer = self.duration;
    self.clearance = setInterval(function() {
      self.timer = self.timer - 1000;
      let hours = parseInt((self.timer / 1000) / 3600);
      let minutes = parseInt(((self.timer / 1000) % 3600) / 60);
      let seconds = ((self.timer / 1000) % 3600) % 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (self.timer <= 0) {
        self.reset();
        self.breakTimer.start();
      }
      console.log(self.timer);
      self.display.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000)
  }

  reset() {
    clearInterval(this.clearance);
    this.display.innerHTML = "00:00:00";
  }

  pauseTimer() {
    this.paused = true;
    this.pausedTime = this.timer;
    clearInterval(this.clearance);
  }
}


class BreakTimer {
  constructor(duration, display, pomodoro) {
    this.duration = duration;
    this.display = display;
    this.clearance;
    this.timer = this.duration;
    this.paused = false;
    this.pomodoro = pomodoro;
    this.pausedTime;
  }

  start() {
    let self = this;

    if (self.paused) {
      self.timer = self.pausedTime;
      self.paused = false;
    } else {
      self.timer = self.duration;
    }
    // let timer = self.duration;
    self.clearance = setInterval(function() {
      self.timer = self.timer - 1000;
      let hours = parseInt((self.timer / 1000) / 3600);
      let minutes = parseInt(((self.timer / 1000) % 3600) / 60);
      let seconds = ((self.timer / 1000) % 3600) % 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (self.timer <= 0) {
        self.reset();
        self.pomodoro.start();
      }
      console.log(self.timer);
      self.display.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000)
  }

  reset() {
    clearInterval(this.clearance);
    this.display.innerHTML = "00:00:00";
  }

  pauseTimer() {
    this.paused = true;
    this.pausedTime = this.timer;
    clearInterval(this.clearance);
  }
}

let display = document.querySelector(".timer");
let pomodoro = new Pomodoro(10000, display, 5000);
pomodoro.start();
