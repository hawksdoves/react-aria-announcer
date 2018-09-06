import React from 'react';

const hiddenStyling = {
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
};

function MessageA({ message }) {
  return (
    <div aria-live="polite" style={hiddenStyling} className="messageA" >
      {message}
    </div>
  )
}

function MessageB({ message }) {
  return (
    <div aria-live="polite" style={hiddenStyling} className="messageB" >
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
    const { message, timeStamp } = this.props;
    return (
      <div className="AM-hidden" > 
        { this.state.messageA ?
          <MessageA message={message} />
        :
          <MessageB message={message} />
        } 
      </div>
    )
  }
}

