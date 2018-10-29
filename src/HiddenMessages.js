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

function MessageA({ message, manner }) {
  return (
    <div aria-live={manner} style={hiddenStyling} className="messageA" >
      {message}
    </div>
  )
}

function MessageB({ message, manner }) {
  return (
    <div aria-live={manner} style={hiddenStyling} className="messageB" >
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
    const { message, timeStamp, manner } = this.props;
    return (
      <div className="AM-hidden" >
        { this.state.messageA ?
          <MessageA message={message} manner={manner} />
        :
          <MessageB message={message} manner={manner} />
        }
      </div>
    )
  }
}

HiddenMessages.proptypes = {
  message: PropTypes.string.isRequired,
  timeStamp: PropTypes.instanceOf(Date).isRequired,
  manner: PropTypes.string,
}

HiddenMessages.defaultProps = {
  manner: 'polite',
}
