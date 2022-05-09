import React from 'react';
import Konami from 'react-konami-code';

const EasterEgg = () => {
  return <div>{"Hey, I'm an Easter Egg! Look at me!"}</div>;
};

export default class WithComponent extends React.Component {
  easterEgg = () => {
    alert('Hey, you typed the Konami Code!');
  }

  render = () => (
    <React.Fragment>
      <Konami action={this.easterEgg} timeout={5000} resetDelay={2000}>
        <EasterEgg />
      </Konami>
      <div>
        Type the Konami Code:
        <strong>↑ ↑ ↓ ↓ ← → ← → B A</strong>
      </div>
    </React.Fragment>
  )
}
