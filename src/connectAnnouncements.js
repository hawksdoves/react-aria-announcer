import React from 'react';

const AnnounceMessageContext = React.createContext();

// const connectAriaAnnouncementProvider = (Section) => {
//   function ConnectedAriaLiveAnnouncements({ announce, ariaMessages, ...props }) {
//     function triggerAnnouncement(action, ...args) {
//       const message = ariaMessages[action](...args)
//       return announce(message, Date.now())
//     }

//     return (
//       <AnnounceMessageContext.Provider value={triggerAnnouncement} > 
//         <Section {...props} />
//       </AnnounceMessageContext.Provider> 
//     )
//   }
//   return ConnectedAriaLiveAnnouncements;
// }

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

const Testing = React.forwardRef(({ announce, ariaMessages, ...props }, ref) => {

  function triggerAnnouncement(action, ...args) {
    const cb = args.pop();
    console.log(cb, args)
    const message = ariaMessages[action](...args)
    return announce(message, Date.now(), cb)
  }

  return (
    <AnnounceMessageContext.Provider value={triggerAnnouncement} > 
      <Section {...props} ref={ref} />
    </AnnounceMessageContext.Provider> 
  )
})

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