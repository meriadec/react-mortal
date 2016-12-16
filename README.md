# react-motionportal

## Install

```
npm i react-mortal
```

## Usage

```javascript
import React, { Component } from 'react'
import Mortal from 'react-mortal'

class AnimatedModal extends Component {

  state = {
    open: false,
  }

  handleClose = () => this.setState({ open: false })

  render () {
    return (
      <Mortal
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
            {'mortal body'}
          </div>
        )}
      </Mortal>
    )
  }

}
```
