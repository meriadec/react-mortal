import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Portal from 'react-portal/lib/Portal'
import { Motion, spring } from 'react-motion'

class Mortal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    portalProps: PropTypes.object,
    closeOnEsc: PropTypes.bool,
  }

  static defaultProps = {
    closeOnEsc: true,
    onHide: () => null,
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
    const { isOpened } = this.props
    const { isVisible, isPortalOpened } = this.state

    const willOpen = !isOpened && nextProps.isOpened
    if (willOpen) {
      this.setState({ isPortalOpened: true })
    }

    const willClose = isOpened && !nextProps.isOpened
    if (willClose) {
      this.setState({ isVisible: false })
    }

    const hasReopened = willOpen && !isVisible && isPortalOpened
    if (hasReopened) {
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
    const { closeOnEsc, onClose } = this.props
    const { isPortalOpened } = this.state
    // handle ESC key
    if (e.which === 27 && isPortalOpened && closeOnEsc) {
      onClose()
    }
  }

  handleRest = () => {
    if (!this.state.isVisible) {
      this.setState({ isPortalOpened: false })
      this.props.onHide()
    }
  }

  render() {
    const { motionStyle, children, portalProps } = this.props
    const { isPortalOpened, isVisible } = this.state

    if (!isPortalOpened) {
      return null
    }

    return (
      <Portal {...portalProps}>
        <Motion onRest={this.handleRest} style={motionStyle(spring, isVisible)}>
          {motion => children(motion, isVisible)}
        </Motion>
      </Portal>
    )
  }
}

export default Mortal
