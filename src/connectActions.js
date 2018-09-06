import React from 'react';

const AnnounceMessageContext = React.createContext();

const connectActionProvider = (Section) => {
  function ActionMessaging({ addNewMessage, ariaMessages }) {
    const addMessage = (action, custom) => {
      const message = ariaMessages[action](custom)
      return addNewMessage(message, Date.now())
    }
    return (
      <AnnounceMessageContext.Provider value={addMessage} > 
        <Section />
      </AnnounceMessageContext.Provider> 
    )
  }
  return ActionMessaging;
}

const connectActionConsumer = (Component) => {
  function AccessibleAction() {
    return (
      <AnnounceMessageContext.Consumer>
            {((addNewMessageByAction) => {
              return <Component addNewMessageByAction={addNewMessageByAction} />  
            })}
      </AnnounceMessageContext.Consumer>
    )
  }

  return AccessibleAction
}

export {
  AnnounceMessageContext,
  connectActionProvider,
  connectActionConsumer
}