class Timer {
  t: number;
  timerIntervalID: number | null;
  fn: TimerHandler;

  constructor(fn: () => void, t: number) {
    this.t = t;
    this.fn = fn;

    this.timerIntervalID = setInterval(this.fn, this.t);
  }

  stop() {
    if (this.timerIntervalID) {
      clearInterval(this.timerIntervalID);
      this.timerIntervalID = null;
    }
    return this;
  }

  start() {
    if (!this.timerIntervalID) {
      this.stop();
      this.timerIntervalID = setInterval(this.fn, this.t);
    }
    return this;
  }

  reset(newT: number) {
    this.t = newT;
    return this.stop().start();
  }
}

export default Timer;
