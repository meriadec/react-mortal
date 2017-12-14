import React, { Component } from 'react'
import styled from 'styled-components'

// replace this by
// import Mortal from 'react-mortal'
import Mortal from '../src/Mortal'

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  right: 0;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
`

const Body = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 20px;
  background: white;
  width: 350px;
`

class Panel extends Component {
  render() {
    const { isOpened, onClose, children } = this.props

    return (
      <Mortal
        isOpened={isOpened}
        onClose={onClose}
        motionStyle={(spring, isVisible) => ({
          opacity: spring(isVisible ? 1 : 0),
          panelOffset: spring(isVisible ? 0 : 100),
        })}
      >
        {(motion, isVisible) => (
          <Container
            style={{
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            <Overlay
              onClick={onClose}
              style={{
                opacity: motion.opacity,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            />
            <Body
              style={{
                transform: `translate3d(${motion.panelOffset}%, 0, 0)`,
              }}
            >
              {children}
            </Body>
          </Container>
        )}
      </Mortal>
    )
  }
}

export default Panel
