import React, { Component } from 'react'

import Mortal from '../src/Mortal'

class Modal extends Component {

  render () {

    const {
      isOpened,
      onClose,
      children,
    } = this.props

    return (
      <Mortal
        isOpened={isOpened}
        onClose={onClose}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0),
          modalScale: spring(isVisible ? 1 : 0.8),
          modalOffset: spring(isVisible ? 0 : -40),
        })}
      >
        {(motion, isVisible) => (
          <div
            className='Modal'
            style={{
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <div
              className='Modal--overlay'
              onClick={onClose}
              style={{
                opacity: motion.opacity,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            />
            <div
              className='Modal--body'
              style={{
                opacity: motion.opacity,
                transform: `scale(${motion.modalScale}) translate3d(0, ${motion.modalOffset}px, 0)`,
              }}
            >
              {children}
            </div>
          </div>
        )}
      </Mortal>
    )
  }

}

export default Modal
