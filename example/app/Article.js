import React from 'react';

function Article({children}) {
  return (
    <article className="article">
      <h3>This is my accessible article!</h3>
      {children}
    </article>
  )
}
