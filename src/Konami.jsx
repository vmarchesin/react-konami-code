import React from 'react';
import PropTypes from 'prop-types';

class Konami extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      input: [],
    };

    this.timeoutFunc = null;
    this.onKeyUp = this.onKeyUp.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  componentDidMount() {
    const { resetDelay } = this.props;

    document.addEventListener('keyup', this.onKeyUp);
    const delay = Number(resetDelay);
    if (delay !== 0) {
      this._timer = new this.Timer(() => this.resetInput(), delay);
    }
  }

  componentWillUnmount() {
    const { resetDelay } = this.props;

    clearTimeout(this.timeoutFunc);
    if (resetDelay !== 0) {
      this._timer.stop();
    }
    document.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp(e) {
    const { done, input } = this.state;
    const {
      action, code, disabled, onTimeout, resetDelay, timeout,
    } = this.props;

    const delay = Number(resetDelay);

    if (disabled) {
      return;
    }

    if (delay !== 0) {
      this._timer.reset(delay);
    }

    input.push(e.keyCode);
    input.splice(-code.length - 1, input.length - code.length);

    this.setState({ input }, () => {
      if (this.state.input.join('').includes(code.join('')) && !done) { /* eslint-disable-line */
        if (delay !== 0) {
          this._timer.stop();
        }
        this.setState({ done: true }, () => {
          if (typeof action === 'function') {
            action();
          }
        });

        if (timeout) {
          this.timeoutFunc = setTimeout(() => {
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

  Timer(fn, t) {
    this.t = t;
    let timerObj = setInterval(fn, this.t);

    this.stop = function stop() {
      if (timerObj) {
        clearInterval(timerObj);
        timerObj = null;
      }
      return this;
    };

    this.start = function start() {
      if (!timerObj) {
        this.stop();
        timerObj = setInterval(fn, this.t);
      }
      return this;
    };

    this.reset = function reset(newT) {
      this.t = newT;
      return this.stop().start();
    };
  }

  render() {
    const { children, className, disabled } = this.props;
    const { done } = this.state;

    return (
      <div
        className={`konami ${className}`}
        style={{ display: (!done || disabled) ? 'none' : 'block' }}
      >
        {children}
      </div>
    );
  }
}

Konami.propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  code: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
  onTimeout: PropTypes.func,
  resetDelay: PropTypes.number,
  timeout: PropTypes.number,
};

Konami.defaultProps = {
  action: null,
  className: '',
  code: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
  disabled: false,
  onTimeout: null,
  resetDelay: 1000,
  timeout: null,
};

export default Konami;
