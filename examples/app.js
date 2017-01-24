import React, { Component } from 'react'
import { render } from 'react-dom'

import Modal from './Modal/Modal'
import Panel from './Panel/Panel'

class App extends Component {

  state = {
    isModalOpened: false,
    isPanelOpened: false,
  }

  openModal = () => this.setState({
    isModalOpened: true,
  })

  closeModal = () => this.setState({
    isModalOpened: false,
  })

  openPanel = () => this.setState({
    isPanelOpened: true,
  })

  closePanel = () => this.setState({
    isPanelOpened: false,
  })

  render () {

    const {
      isModalOpened,
      isPanelOpened,
    } = this.state

    const modalToggle = (
      <button onClick={isModalOpened ? this.closeModal : this.openModal} className='btn-modal'>
        {`${isModalOpened ? 'Close' : 'Open'} modal`}
      </button>
    )

    const portalToggle = (
      <button onClick={isPanelOpened ? this.closePanel : this.openPanel} className='btn-panel'>
        {`${isPanelOpened ? 'Close' : 'Open'} panel`}
      </button>
    )

    return (
      <div className='container'>

        <h1>{'react-mortal'}</h1>

        {modalToggle}
        {portalToggle}

        <p>
          {'Source on github: '}
          <a href='https://github.com/meriadec/react-mortal'>
            {'https://github.com/meriadec/react-mortal'}
          </a>
        </p>

        <Modal
          isOpened={isModalOpened}
          onClose={this.closeModal}
        >
          <div className='placeholder'>
            {'I\'m a modal'}
          </div>
          <p>
            {modalToggle}
          </p>
        </Modal>

        <Panel
          isOpened={isPanelOpened}
          onClose={this.closePanel}
        >
          <div className='placeholder'>
            {'I\'m a panel'}
          </div>
          <p>
            {portalToggle}
          </p>
        </Panel>

      </div>
    )
  }

}

const root = document.getElementById('root')

render(<App />, root)
