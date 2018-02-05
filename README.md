# react-mortal

[react-portal](https://github.com/tajo/react-portal) is awesome, but it may
be tricky to animate a Portal when entering/leaving the dom. This is what
`react-mortal` is solving, by combining it with the power of [react-motion](https://github.com/chenglou/react-motion).

Check [usage example](https://github.com/meriadec/react-mortal/tree/master/examples) and [demo](https://meriadec.github.io/react-mortal/).

## Installation

```
npm i react-mortal
```

## Usage

```javascript
<Mortal
  isOpened={true|false}
  onClose={handler}
  motionStyle={(spring, isVisible) => ({
    ...motion object to pass
  })}
>
  {(motion, isVisible) => (
    <div>
      ...your component
    </div>
  )}
</Mortal>
```

## API

#### Props

`isOpened` {Boolean} : Show/hide Portal instance, applying animation

`onClose` {Function} : Callback called when ESC key is pressed

`motionStyle` {Function} : Function that returns an object consumed by react-motion. See react-motion docs.

`portalProps` {Object} : Those props will be passed to the react-portal

`onHide` {Function} : Callback called when close animation has been finished

## Full example

Example, to create a open/close animated modal:

```javascript
import React, { Component, PropTypes } from 'react'
import Mortal from 'react-mortal'

class AnimatedModal extends Component {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const { isOpened, onClose } = this.props

    return (
      <Mortal
        isOpened={isOpened}
        onClose={onClose}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0),
        })}
      >
        {motion => (
          <div
            style={{
              opacity: motion.opacity,
            }}
          >
            <p>{'modal body'}</p>
            <button onClick={this.handleClose}>{'close modal'}</button>
          </div>
        )}
      </Mortal>
    )
  }
}
```

## LICENSE

```
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2016 Meriadec Pillet <meriadec.pillet@gmail.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```
