import React from 'react';
import PropTypes from 'prop-types';

const hiddenStyling = {
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
};

function MessageA({ message, manners }) {
  return (
    <div aria-live={manners} style={hiddenStyling} className="messageA" >
      {message}
    </div>
  )
}

function MessageB({ message, manners }) {
  return (
    <div aria-live={manners} style={hiddenStyling} className="messageB" >
      {message}
    </div>
  )
}

export class HiddenMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageA: true,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.timeStamp !== prevProps.timeStamp) {
      this.setState({ messageA: !this.state.messageA })
    }
  }
  
  render() {
    const { message, timeStamp, manners } = this.props;
    return (
      <div className="AM-hidden" > 
        { this.state.messageA ?
          <MessageA message={message} manners={manner} />
        :
          <MessageB message={message} manners={manner} />
        } 
      </div>
    )
  }
}

HiddenMessages.proptypes = {
  message: PropTypes.string,
  timeStamp: PropTypes.instanceOf(Date),
  manners: PropTypes.string,
}

HiddenMessages.defaultProps = {
  manners: 'polite',
}
