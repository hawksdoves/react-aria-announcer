import React, { Component } from 'react';
import { HiddenMessages } from '../../src/index';
import ariaMessages from './aria-messages';
import Editor from './Editor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      timeStamp: '',
    }
  }

  announceMessage(message, timeStamp) {
    this.setState({ message, timeStamp })
  }
  
  render() {
    return (
      <div className="App">
          <HiddenMessages {...this.state} />
          <Editor announce={(message, timeStamp) => this.announceMessage(message, timeStamp)} ariaMessages={ariaMessages} />
      </div>
    );
  }
}

export default App;
