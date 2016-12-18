import React, { Component } from 'react'
import Mortal from 'react-mortal'

class Modal extends Component {

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
          overlayOpacity: spring(isVisible ? 1 : 0),
          modalScale: spring(isVisible ? 1 : 0.9),
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

export default Modal
