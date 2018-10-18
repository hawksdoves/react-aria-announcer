import React from 'react';
import { connectAriaAnnouncementProvider } from '..src/connectAnnouncements';
import Toolbar from './Toolbar';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state.article = [];
  }

  addBlockToArticle(type) {
    switch(type) {
      case text: this.setState(<div contentEditable={true}>This text is editable</div>);
      case headline: this.setState(<h2 contentEditable={true}>This Headline is editable</h2>);
    }
  }


  render() {
    return (
      <div>
        <Toolbar addBlock={(type) => this.addBlockToArticle(type)}/>
        <Article>
          {this.state.article}
        </Article>
      </div>
    ) 
  }
}




export default connectAriaAnnouncementProvider(EditorFake);