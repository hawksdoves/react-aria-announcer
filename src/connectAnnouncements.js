import React from 'react';

const AnnounceMessageContext = React.createContext();

const connectAriaAnnouncementProvider = (Section) => {
  const ConnectedAriaLiveAnnouncements = React.forwardRef(({ announce, ariaMessages, ...props }, ref) => {
    function triggerAnnouncement(action, ...args) {
      const message = ariaMessages[action](...args)
      return announce(message, Date.now())
    }
  
    return (
      <AnnounceMessageContext.Provider value={triggerAnnouncement} > 
        <Section {...props} ref={ref} />
      </AnnounceMessageContext.Provider> 
    )
  })
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