import React, { Component } from 'react';
import { HiddenMessages, connectAriaAnnouncementProvider } from '..src/connectAnnouncements';
import ariaMessages from './aria-messages';
import Editor from './Editor';
import './App.css';

const AccessibleEditor = connectAriaAnnouncementProvider(EditorFake);

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
          <Editor addNewMessage={(message, timeStamp) => this.announceMessage(message, timeStamp)} ariaMessages={ariaMessages} />
      </div>
    );
  }
}

export default App;
