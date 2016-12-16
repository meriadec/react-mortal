# react-motionportal

## Install

```
npm i react-motionportal
```

## Usage

```javascript
import React, { Component } from 'react'
import MotionPortal from 'react-motionportal'

class AnimatedModal extends Component {

  state = {
    open: false,
  }

  handleClose = () => this.setState({ open: false })

  render () {
    return (
      <MotionPortal
        isOpened={this.state.open}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0),
        })}
      >
        {(motion, isVisible) => (
          <div
            style={{
              opacity: motion.opacity,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            {'modal content'}
          </div>
        )}
      </MotionPortal>
    )
  }

}
```
