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

  static getDerivedStateFromProps(props, state) {
    const { isOpened } = props
    const { isPortalOpened, isVisible } = state

    const willOpen = !isPortalOpened && isOpened
    if (willOpen) {
      return { isPortalOpened: true, isAnimated: true }
    }

    const willClose = isPortalOpened && !isOpened
    if (willClose) {
      return { isVisible: false, isAnimated: true }
    }

    const hasReopened = willOpen && !isVisible && isPortalOpened
    if (hasReopened) {
      return { isVisible: true, isAnimated: true }
    }

    return null
  }

  constructor(props) {
    super(props)

    this.state = {
      isPortalOpened: props.isOpened,
      isVisible: props.isOpened,
      isAnimated: false,
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey)
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
      this.setState({ isPortalOpened: false, isAnimated: false })
      this.props.onHide()
    } else {
      this.setState({ isAnimated: false })
    }
  }

  render() {
    const { motionStyle, children, portalProps } = this.props
    const { isPortalOpened, isVisible, isAnimated } = this.state

    if (!isPortalOpened) {
      return null
    }

    return (
      <Portal {...portalProps}>
        <Motion onRest={this.handleRest} style={motionStyle(spring, isVisible)}>
          {motion => children(motion, isVisible, isAnimated)}
        </Motion>
      </Portal>
    )
  }
}

export default Mortal
