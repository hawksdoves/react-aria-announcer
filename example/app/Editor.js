import React from 'react';
import { connectAriaAnnouncementProvider } from '../../src/connectAnnouncements';
import Toolbar from './Toolbar';
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
        newBlock = text(article.length);
      break;
      case 'headline': 
        newBlock = headline(article.length);
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
    <div>
      <button>up</button><button>down</button><button></button>
      <div key={key} contentEditable suppressContentEditableWarning>This text is editable</div>
    </div>
  );
}
function headline(key) {
  return <h2 key={key} contentEditable suppressContentEditableWarning>This Headline is editable</h2>;
}

export default connectAriaAnnouncementProvider(Editor);
