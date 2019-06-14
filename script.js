//click play button
//timer starts with default duration i.e 25min
//new pomodoro object created with 25min setDuration

//in the end of duration break timer should start
//create new break object with default break time
//in the end of break timer pomodoro timer should start again


class Pomodoro {
  constructor(setDuration, breakTime) {
    this.started = false;
    this.setDuration = setDuration;
    this.breakTimer = new BreakTimer(breakTime, this);
    this.terminated = false;
    this.timeOut;
  }

  start() {
    let self = this;
    if (!this.terminated) {
      if (!this.started) {
        this.started = true;
        console.log("Pomodoro started");
        self.timeOut = setTimeout(function() {
          console.log("Pomodoro stopped");
          self.breakTimer.start();
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

class Timer {
  constructor(duration, type) {
    this.duration = duration;
    this.type = type;
  }
}

let pomodoro = new Pomodoro(5000, 3000);
pomodoro.start();
