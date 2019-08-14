import React from 'react';
import { AnnounceMessageContext } from '../../src/connectAnnouncements';

function Toolbar({ addBlock }) {
  const announce = React.useContext(AnnounceMessageContext);
  const handleOnClick = (type, action) => {
    addBlock(type);
    announce('blockAction', type, action);
  }

  return (
    <div>
      <h2>This Toolbar uses React Hooks</h2>
      <div>
        <button onClick={() => handleOnClick('text', 'added')}>
                add text block
        </button>
        <button onClick={() => handleOnClick('headline', 'added')}>
                add headline block
        </button>
      </div>
    </div>
  )
}

export default Toolbar;
