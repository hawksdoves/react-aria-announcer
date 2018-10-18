import React from 'react';

const AnnounceMessageContext = React.createContext();

const connectAriaAnnouncementProvider = (Section) => {
  function ConnectedAriaLiveAnnouncements({ announce, ariaMessages, ...props }) {
    function triggerAnnouncement(action, ...args) {
      const message = ariaMessages[action](...args)
      console.log('message', message)
      return announce(message, Date.now())
    }

    return (
      <AnnounceMessageContext.Provider value={triggerAnnouncement} > 
        <Section {...props} />
      </AnnounceMessageContext.Provider> 
    )
  }
  return ConnectedAriaLiveAnnouncements;
}

const connectAriaAnnouncementConsumer = (Component) => {
  function ConnectedAriaAnnouncer(props) {
    return (
      <AnnounceMessageContext.Consumer>
            {((triggerAnnouncement) => {
              return <Component announce={triggerAnnouncement} {...props} />  
            })}
      </AnnounceMessageContext.Consumer>
    )
  }

  return ConnectedAriaAnnouncer;
}

export {
  AnnounceMessageContext,
  connectAriaAnnouncementProvider,
  connectAriaAnnouncementConsumer,
}