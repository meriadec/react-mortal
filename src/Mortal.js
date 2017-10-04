import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Portal from 'react-portal/lib/Portal'
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
    isPortalOpened: false,
    isVisible: false,
  }

  componentWillMount() {
    // if portal is created opened,
    // no animation is needed
    if (this.props.isOpened) {
      this.setState({
        isPortalOpened: true,
        isVisible: true,
      })
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey)
  }

  componentWillReceiveProps(nextProps) {
    // check if we just opened panel

    const willOpen = !this.props.isOpened && nextProps.isOpened
    if (willOpen) {
      // open portal
      this.setState({ isPortalOpened: true })
    }

    // check if we just closed panel

    const willClose = this.props.isOpened && !nextProps.isOpened
    if (willClose) {
      // launch close animation
      this.setState({ isVisible: false })
    }

    // check if we re-opened panel while closing

    const hasReopened = willOpen && !this.state.isVisible && this.state.isPortalOpened
    if (hasReopened) {
      // re-launch animation
      this.setState({ isVisible: true })
    }
  }

  componentDidUpdate(prevProps) {
    const didOpen = this.props.isOpened && !prevProps.isOpened
    if (didOpen) {
      window.requestAnimationFrame(() => {
        if (this._unmounted) {
          return
        }
        this.setState({ isVisible: true })
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey)
    this._unmounted = true
  }

  handleKey = e => {
    // handle ESC key
    if (e.which === 27 && this.state.isPortalOpened && this.props.closeOnEsc) {
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
        isPortalOpened: false,
      })
    }
  }

  render() {
    const { motionStyle, children, portalProps } = this.props

    const { isPortalOpened, isVisible } = this.state

    return isPortalOpened ? (
      <Portal {...portalProps} onOpen={this.handlePortalOpen}>
        <Motion onRest={this.handleRest} style={motionStyle(spring, isVisible)}>
          {motion => children(motion, isVisible)}
        </Motion>
      </Portal>
    ) : null
  }
}

export default Mortal
