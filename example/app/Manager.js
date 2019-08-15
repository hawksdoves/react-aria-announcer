import React from 'react';
import { connectAriaAnnouncementConsumer } from '../../src/connectAnnouncements';

function Manager({ moveBlock = () => {}, type, announce, children }) {
  const handleOnClick = (type, action) => {
    moveBlock();
    announce('moveBlock', type, action);
  }

  return (
    <div>
      <h2>This Toolbar uses HOC's</h2>
      <div>
        <button onClick={() => handleOnClick(type, 'up')}>
                Move Block Up
        </button>
        <button onClick={() => handleOnClick(type, 'down')}>
                Move Block Down
        </button>
      </div>
      {children}
    </div>
  )
}

export default connectAriaAnnouncementConsumer(Manager);
