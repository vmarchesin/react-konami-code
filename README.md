# react-konami-code [![GitHub stars](https://img.shields.io/github/stars/vmarchesin/react-konami-code.svg?style=social&label=Star&maxAge=2592000)](https://gitHub.com/vmarchesin/react-konami-code/)

Trigger an easter egg by pressing a sequence of keys. Also available as a custom hook.

[![npm](https://img.shields.io/npm/v/react-konami-code.svg)]()
[![npm](https://img.shields.io/npm/dt/react-konami-code.svg)]()
[![gzip size](http://img.badgesize.io/https://npmcdn.com/react-konami-code/dist/Konami.js?compression=gzip)]()
![Travis](https://travis-ci.org/vmarchesin/react-konami-code.svg?branch=master)
![Maintenance](https://img.shields.io/maintenance/yes/2020.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/vmarchesin/react-konami-code/badge.svg)](https://snyk.io/test/github/vmarchesin/react-konami-code)

## Install

[![NPM](https://nodei.co/npm/react-konami-code.png)](https://www.npmjs.com/package/react-konami-code)

```shell
npm i react-konami-code -S
```

## Example
Clone this repo and run `npm start` in the `example` folder.

## Usage
### CommonJS Module (Webpack or Browserify)

```jsx
import React from 'react';
import Konami from 'react-konami-code';

export default class App extends React.Component {
  easterEgg = () => {
    alert('Hey, you typed the Konami Code!');
  }

  render = () => (
    <Konami action={this.easterEgg}>
      {"Hey, I'm an Easter Egg! Look at me!"}
    </Konami>
  )
}
```

### TypeScript

```tsx
import * as React from 'react';
import Konami from 'react-konami-code';

export default class App extends React.Component {
  public render = () => (
    <Konami action={this.easterEgg}>
      {"Hey, I'm an Easter Egg! Look at me!"}
    </Konami>
  )

  private easterEgg = () => {
    alert('Hey, you typed the Konami Code!');
  }
}
```

### Custom Hook

Refer to the [Using the custom Hook](#hooks) section.

## Component

### Children

The content to be displayed should be passed as `children` inside the `Konami` component, and it will be wrapped inside a div. You can however not pass any children, and then just use the [`action`](#action) callback to fire your easter egg.

You can pass `children` and [`action`](#action) at the same time to display some content and fire a secondary action.

## Props
* [`action`](#action)
* [`className`](#className)
* [`code`](#code)
* [`disabled`](#disabled)
* [`onTimeout`](#onTimeout)
* [`resetDelay`](#resetDelay)
* [`timeout`](#timeout)

<a name="action"></a>
#### action
*Default:* `null`

The callback action that should fire when the [`code`](#code) is input.

<a name="className"></a>
#### className
*Default:* `""`

CSS classes can be applied to the div wrapping your secret content. By default the div will always have the `konami` className.

```jsx
<Konami className="myclass">
  {"Hey, I'm an Easter Egg!"}
</Konami>
```
will result in:
```html
<div className="konami myclass">
  Hey, I'm an Easter Egg!
</div>
```

<a name="code"></a>
#### code
*Default:* `[38,38,40,40,37,39,37,39,66,65]`

An array with the sequence of keyCodes necessary to trigger the [`action`](#action). The default code is the Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`

You can find the keyCodes for each character [here](https://www.w3.org/2002/09/tests/keys.html).

<a name="disabled"></a>
#### disabled
*Default:* `false`

If the trigger should be disabled or not. This is dynamic and you can enable/disable at will. The [`action`](#action) callback will only trigger when `disabled == false`.

<a name="onTimeout"></a>
#### onTimeout

The callback to fire when the [`timeout`](#timeout) is finished, if any.

<a name="resetDelay"></a>
#### resetDelay
*Default:* `1000`

The delay interval on which you need to start the input again. If you set it to `0` it will never reset the user input. Value should be in ms.

<a name="timeout"></a>
#### timeout
*Default:* `null`

The timeout to hide the easter egg. When the timeout is finished it will set `display: none` to the wrapping div and will fire [`onTimeout`](#onTimeout). By default it runs forever. Value should be in ms.

<a name="hooks"></a>
## Using the custom Hook

If you want to call an action without rendering children or handling timeouts it's recommended to use the `useKonami` hook.

```jsx
import React from 'react';
import { useKonami } from 'react-konami-code';

const easterEgg = () => {
  alert('Hey, you typed the Konami Code!');
}

export default () => {
  useKonami(easterEgg);
  return <div />;
};
```

### API
`useKonami(action, [options])`

<a name="hooks-action"></a>
#### action
*Required*

The callback action that should fire when the [`code`](#hooks-options) is input.

<a name="hooks-options"></a>
#### options
  - code

    *Default:* `[38,38,40,40,37,39,37,39,66,65]`

    An array with the sequence of keyCodes necessary to trigger the [`action`](#hooks-action). Refer to main [`code`](#code) section for the keyCodes.

## License

[MIT](https://github.com/vmarchesin/react-konami-code/blob/master/LICENSE)

## Contact

You can reach me on my [Github](https://github.com/vmarchesin) or send an email to [dev@vmarches.in](mailto:dev@vmarches.in).
