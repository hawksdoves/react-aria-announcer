import React from 'react';
import { connectAriaAnnouncementConsumer } from '../../src/connectAnnouncements';

function Toolbar({ announce, addBlock }) {
  const handleOnClick = (type, action) => {
    addBlock(type);
    announce('blockAction', type, action);
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

export default connectAriaAnnouncementConsumer(Toolbar);
