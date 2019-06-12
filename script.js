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
  }

  start() {
    let self = this;
    if (!this.started) {
      this.started = true;
      console.log("Pomodoro started");
      setTimeout(function() {
        console.log("Pomodoro stopped");
        self.breakTimer.start();
        self.started = false;
      }, this.setDuration)
    }
  }

  stop() {
    this.started = false;
  }
}

class BreakTimer {
  constructor(breakTime, pomodoro) {
    this.breakTime = breakTime;
    this.started = false;
    this.pomodoro = pomodoro;
  }

  start() {
    if (!this.started) {
      this.started = true;
      console.log("Break timer started!");
      setTimeout(function() {
        console.log("Break timer stopped!");
        this.started = false;
      }, this.breakTime)
    }
  }
}

let pomodoro = new Pomodoro(5000, 3000);
pomodoro.start();
