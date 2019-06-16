//click play button
//timer starts with default duration i.e 25min
//new pomodoro object created with 25min setDuration

//in the end of duration break timer should start
//create new break object with default break time
//in the end of break timer pomodoro timer should start again


class Pomodoro {
  constructor(setDuration, breakTime, display) {
    this.started = false;
    this.setDuration = setDuration;
    this.breakTimer = new BreakTimer(breakTime, this);
    this.terminated = false;
    this.timeOut;
    this.timerDisplay = new Timer(setDuration, display);
    this.breakDisplay = new Timer(breakTime, display);
  }

  start() {
    let self = this;
    if (!this.terminated) {
      if (!this.started) {
        this.started = true;
        console.log("Pomodoro started");
        this.timerDisplay.start();
        self.timeOut = setTimeout(function() {
          console.log("Pomodoro stopped");
          self.breakTimer.start();
          self.breakDisplay.start();
          self.started = false;
        }, this.setDuration)
      }
    }
  }

  terminate() {
    this.terminated = true;
    clearTimeout(this.timeOut);
    clearTimeout(this.breakTimer.timeOut);
  }
}

class BreakTimer {
  constructor(breakTime, pomodoro) {
    this.breakTime = breakTime;
    this.started = false;
    this.pomodoro = pomodoro;
    this.timeOut;
  }

  start() {
    let self = this;
    console.log("Break timer started!");
    self.timeOut = setTimeout(function() {
      console.log("Break timer stopped!");
      self.pomodoro.start();
    }, this.breakTime)
  }
}


//initiate object with duration given in miliseconds
//convert duration to hours, minutes and seconds
//set the display accordingly.
//start countdown


class Timer {
  constructor(duration, display) {
    this.duration = duration;
    this.display = display;
    this.clearance;
  }

  start() {
    let self = this;
    let timer = self.duration;
    this.clearance = setInterval(function() {
      timer = timer - 1000;
      let hours = parseInt((timer / 1000) / 3600);
      let minutes = parseInt(((timer / 1000) % 3600) / 60);
      let seconds = ((timer / 1000) % 3600) % 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (timer <= 0) {
        self.reset();
      }

      self.display.innerHTML = `${hours}:${minutes}:${seconds}`;
    }, 1000)
  }

  reset() {
    clearInterval(this.clearance);
    this.display.innerHTML = "00:00:00";
  }
}


let display = document.querySelector(".timer")
let pomodoro = new Pomodoro(50000, 30000, display);
pomodoro.start();

// let timer = new Timer(5000, display);
// timer.start();
