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

function MessageA({ message, className }) {
  return (
    <div className={`messageA AM-hidden ${className}`} >
      {message}
    </div>
  )
}

function MessageB({ message, className }) {
  return (
    <div className={`messageB AM-hidden ${className}`} >
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
    const { message, manner, className } = this.props;
    return (
      <div className={`AM-hidden ${className}`} aria-live={manner} style={hiddenStyling}> 
        { this.state.messageA ?
          <MessageA message={message} manner={manner} className={className} />
        :
          <MessageB message={message} manner={manner} className={className}/>
        } 
      </div>
    )
  }
}

HiddenMessages.proptypes = {
  message: PropTypes.string,
  timeStamp: PropTypes.instanceOf(Date),
  manner: PropTypes.string,
  className: PropTypes.string,
}

HiddenMessages.defaultProps = {
  manner: 'polite',
}
