import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Portal from 'react-portal'
import { Motion, spring } from 'react-motion'

class Mortal extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    portalProps: PropTypes.object,
  }

  static defaultProps = {
    closeOnEsc: true,
  }

  state = {
    portalOpened: false,
    isVisible: false,
  }

  componentWillMount () {
    // if portal is created opened,
    // no animation is needed
    if (this.props.isOpened) {
      this.setState({
        portalOpened: true,
        isVisible: true,
      })
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKey)
  }

  componentWillReceiveProps (nextProps) {

    // check if we just opened panel

    const hasOpened = !this.props.isOpened && nextProps.isOpened

    if (hasOpened) {
      // open portal
      this.setState({ portalOpened: true })
    }

    // check if we just closed panel

    const hasClosed = this.props.isOpened && !nextProps.isOpened

    if (hasClosed) {
      // launch close animation
      this.setState({ isVisible: false })
    }

    // check if we re-opened panel while closing

    const hasReopened = hasOpened && !this.state.isVisible && this.state.portalOpened

    if (hasReopened) {
      // re-launch animation
      this.setState({ isVisible: true })
    }

  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKey)
  }

  handleKey = (e) => {
    // handle ESC key
    if (e.which === 27 && this.state.portalOpened && this.props.closeOnEsc) {
      this.props.onClose()
    }
  }

  handlePortalOpen = () => {
    // portal just open, launch animation
    this.setState({ isVisible: true })
  }

  handleRest = () => {
    // if panel is not visible, close portal
    if (!this.state.isVisible) {
      this.setState({
        portalOpened: false,
      })
    }
  }

  render () {

    const {
      motionStyle,
      children,
      portalProps,
    } = this.props

    const {
      portalOpened,
      isVisible,
    } = this.state

    return (
      <Portal
        {...portalProps}
        isOpened={portalOpened}
        onOpen={this.handlePortalOpen}
      >
        <Motion
          onRest={this.handleRest}
          style={motionStyle(spring, isVisible)}
        >
          {motion => children(motion, isVisible)}
        </Motion>
      </Portal>
    )
  }

}

export default Mortal
