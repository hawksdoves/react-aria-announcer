import React from 'react';

const AnnounceMessageContext = React.createContext();

const connectActionProvider = (Section) => {
  function ActionMessaging({ addNewMessage, ariaMessages, ...props }) {
    const addMessage = (action, custom) => {
      const message = ariaMessages[action](custom)
      return addNewMessage(message, Date.now())
    }
    return (
      <AnnounceMessageContext.Provider value={addMessage} > 
        <Section {...props} />
      </AnnounceMessageContext.Provider> 
    )
  }
  return ActionMessaging;
}

const connectActionConsumer = (Component) => {
  function AccessibleAction(props) {
    return (
      <AnnounceMessageContext.Consumer>
            {((addNewMessageByAction) => {
              return <Component addNewMessageByAction={addNewMessageByAction} {...props} />  
            })}
      </AnnounceMessageContext.Consumer>
    )
  }

  return AccessibleAction;
}

export {
  AnnounceMessageContext,
  connectActionProvider,
  connectActionConsumer
}