import React from 'react';
import PropTypes from 'prop-types';

const AnnounceMessageContext = React.createContext();

const connectAriaAnnouncementProvider = (Section) => {
  function ConnectedAriaLiveAnnouncements({ announce, ariaMessages, ...props }) {
    function triggerAnnouncement(action, ...args) {
      const message = ariaMessages[action](...args)
      return announce(message, Date.now())
    }

    return (
      <AnnounceMessageContext.Provider value={triggerAnnouncement} >
        <Section {...props} />
      </AnnounceMessageContext.Provider>
    )
  }

  ConnectedAriaLiveAnnouncements.propTypes = {
    announce: PropTypes.func.isRequired,
    ariaMessages: PropTypes.objectOf(PropTypes.func).isRequired,
  };

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
