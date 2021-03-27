import React from 'react';

import PropTypes from 'prop-types';

export interface KonamiProps {
  className?: string;
  code?: number[];
  disabled?: boolean;
  resetDelay?: number;
  action?: () => void;
  timeout?: number;
  onTimeout?: () => void;
}

export interface KonamiStates {
  done: boolean;
  input: number[];
}

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

const propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  code: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
  onTimeout: PropTypes.func,
  resetDelay: PropTypes.number,
  timeout: PropTypes.number,
};

class Konami extends React.Component<KonamiProps, KonamiStates> {
  private timeoutID: ReturnType<typeof setTimeout> | null | undefined;
  private _timer: any;
  static defaultProps: KonamiProps;

  static propTypes: typeof propTypes;

  constructor(props: KonamiProps) {
    super(props);

    this.state = {
      done: false,
      input: [],
    };

    this.timeoutID = null;
    this.onKeyUp = this.onKeyUp.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  componentDidMount() {
    const { resetDelay } = this.props;

    document.addEventListener('keyup', this.onKeyUp);
    const delay = Number(resetDelay);
    if (delay !== 0) {
      this._timer = new Timer(() => this.resetInput(), delay);
    }
  }

  componentWillUnmount() {
    const { resetDelay } = this.props;

    if (this.timeoutID) clearTimeout(this.timeoutID);

    if (resetDelay !== 0) {
      this._timer.stop();
    }
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp(e: KeyboardEvent) {
    const { done, input } = this.state;
    const {
      action,
      code,
      disabled,
      onTimeout,
      resetDelay,
      timeout,
    } = this.props;

    const delay = Number(resetDelay);

    if (disabled) {
      return;
    }

    if (delay !== 0) {
      this._timer.reset(delay);
    }

    input.push(e.keyCode);

    if (code) input.splice(-code.length - 1, input.length - code.length);

    this.setState({ input }, () => {
      if (this.state.input.join('').includes(code?.join('') ?? '') && !done) {
        if (delay !== 0) {
          this._timer.stop();
        }
        this.setState({ done: true }, () => {
          if (typeof action === 'function') {
            action();
          }
        });

        if (timeout) {
          this.timeoutID = setTimeout(() => {
            this.setState({ done: false });
            if (typeof onTimeout === 'function') {
              onTimeout();
            }
          }, Number(timeout));
        }
      }
    });
  }

  resetInput() {
    this.setState({ input: [] });
  }

  render() {
    const { children, className, disabled } = this.props;
    const { done } = this.state;

    return (
      <div
        className={`konami ${className ?? ''}`}
        style={{ display: !done || disabled ? 'none' : 'block' }}
      >
        {children}
      </div>
    );
  }
}

Konami.defaultProps = {
  className: '',
  code: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
  disabled: false,
  resetDelay: 1000,
};

Konami.propTypes = propTypes;

export default Konami;
