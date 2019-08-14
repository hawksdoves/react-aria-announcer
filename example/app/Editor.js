import React from 'react';
import { connectAriaAnnouncementProvider } from '../../src/connectAnnouncements';
import Toolbar from './Toolbar';
import Manager from './Manager';
import Article from './Article';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
    };
  }

  addBlockToArticle(type) {
    const { article } = this.state;
    let newBlock;
    switch(type) {
      case 'text':  
        newBlock = <Manager>{text(article.length)}</Manager>;
      break;
      case 'headline': 
        newBlock = <Manager>{headline(article.length)}</Manager>;
      break;
    }
    this.setState({ article: [...article, newBlock]})
  }


  render() {
    const { article } = this.state;
    return (
      <div>
        <Toolbar addBlock={(type) => this.addBlockToArticle(type)}/>
        <Article>
          {article}
        </Article>
      </div>
    ) 
  }
}

function text(key) {
  return (
    <div key={key} contentEditable suppressContentEditableWarning>This text is editable</div>
  );
}
function headline(key) {
  return (
    <h2 key={key} contentEditable suppressContentEditableWarning>This Headline is editable</h2>
  );
}

export default connectAriaAnnouncementProvider(Editor);
