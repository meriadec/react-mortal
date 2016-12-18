import React, { Component } from 'react'

import Modal from './Modal'
import Panel from './Panel'

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

    return (
      <div>

        <h1>{'react-mortal'}</h1>

        <button onClick={this.openModal}>
          {'Open modal'}
        </button>

        <button onClick={this.openPanel}>
          {'Open panel'}
        </button>

        <Modal
          isOpened={isModalOpened}
          onClose={this.closeModal}
        >
          <h3>{'Awesome modal'}</h3>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>
            <button onClick={this.closeModal}>
              {'Close modal'}
            </button>
          </p>
        </Modal>

        <Panel
          isOpened={isPanelOpened}
          onClose={this.closePanel}
        >
          <h3>{'Awesome panel'}</h3>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>{'Lorem ipsum onetuhsoetnuhsoetos ntahsh soaneh asoheoa'}</p>
          <p>
            <button onClick={this.closePanel}>
              {'Close panel'}
            </button>
          </p>
        </Panel>

      </div>
    )
  }

}

export default App
