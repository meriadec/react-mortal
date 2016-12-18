# react-mortal

[react-portal](https://github.com/tajo/react-portal) is awesome, but it may
be tricky to animate a Portal when entering/leaving the dom. This is what
`react-mortal` is solving, by combining the power of react-motion and react-portal.

Check [usage example](https://github.com/meriadec/react-mortal/tree/master/examples) and [demo](https://github.com/meriadec/react-mortal).

## Installation

```
npm i react-mortal
```

## Usage

Example, to create a open/close animated modal:

```javascript
import React, { Component, PropTypes } from 'react'
import Mortal from 'react-mortal'

class AnimatedModal extends Component {

  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  render () {

    const {
      isOpened,
      onClose,
    } = this.props

    return (
      <Mortal
        isOpened={isOpened}
        onClose={onClose}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0),
        })}
      >
        {(motion) => (
          <div
            style={{
              opacity: motion.opacity,
            }}
          >
            <p>{'modal body'}</p>
            <button onClick={this.handleClose}>
              {'close modal'}
            </button>
          </div>
        )}
      </Mortal>
    )
  }

}
```
