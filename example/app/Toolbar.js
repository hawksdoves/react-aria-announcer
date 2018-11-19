import React from 'react';
import { connectAriaAnnouncementConsumer } from '../../src/connectAnnouncements';

function Toolbar({ addNewMessageByAction, addBlock }) {
  const handleOnClick = (type, action) => {
    blockAction(type, action)
    addBlock(type)
  }

  return (
    <div>
      <button onClick={() => handleOnClick('text', 'added')}>
              add text block
      </button>
      <button onClick={() => handleOnClick('headline', 'added')}>
              add headline block
      </button>
    </div>
  )
}

const ConnectedMessageToolbar = connectActionConsumer(Toolbar);
