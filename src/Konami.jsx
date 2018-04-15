const React = require('react')

class Konami extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      done: false,
      input: [],
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp)
    const delay = Number(this.props.resetDelay)
    if (delay !== 0) {
      this._timer = new this.Timer(() => this.resetInput(), delay)
    }
  }

  onKeyUp = e => {
    const { done, input } = this.state
    const { action, code, disabled, onTimeout, timeout } = this.props
    const resetDelay = Number(this.props.resetDelay)

    if (disabled) {
      return
    }

    if (resetDelay !== 0) {
      this._timer.reset(resetDelay)
    }

    input.push(e.keyCode)
    input.splice(-code.length - 1, input.length - code.length)

    this.setState({ input }, () => {
      if (this.state.input.join('').includes(code.join('')) && !done) {
        if (resetDelay !== 0) {
          this._timer.stop()
        }
        this.setState({ done: true }, () => { 
          action && action()
        })

        if (timeout) {
          setTimeout(() => {
            this.setState({ done: false })
            onTimeout && onTimeout()
          }, Number(timeout))
        }
      }
    })    
  }

  resetInput = () => this.setState({ input: [] })

  Timer(fn, t) {
    let timerObj = setInterval(fn, t)

    this.stop = function() {
      if (timerObj) {
          clearInterval(timerObj)
          timerObj = null
      }
      return this
    }

    this.start = function() {
      if (!timerObj) {
          this.stop()
          timerObj = setInterval(fn, t)
      }
      return this
    }

    this.reset = function(newT) {
      t = newT
      return this.stop().start()
    }
  }

  render = () => {
    const { className, disabled } = this.props
    const { done } = this.state

    return (
      <div 
        className={`konami ${className}`}
        style={{ display: (!done || disabled) ? 'none' : 'block' }}
      >
        {this.props.children}
      </div>
    )
  }
}

Konami.defaultProps = {
  action: null,
  className: "",
  code: [38,38,40,40,37,39,37,39,66,65],
  disabled: false,
  resetDelay: 1000,
  timeout: null,
}

module.exports = Konami