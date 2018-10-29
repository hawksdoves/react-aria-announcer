import React from 'react';
import { mount } from 'enzyme';
import { HiddenMessages } from '../src/HiddenMessages';

describe('hiddenMessages', () => {
  it('renders MessageA when messageA is true', () => {
    const hiddenMessage = mount(<HiddenMessages />);
    expect(hiddenMessage.find('.messageA')).toHaveLength(1);
    expect(hiddenMessage.find('.messageB')).toHaveLength(0);
    expect(hiddenMessage.state().messageA).toBeTruthy();
  });

  it('renders a message when it receives a message', () => {
    const message = "moving on up";
    const hiddenMessage = mount(<HiddenMessages message={message} />);
    const messageA = hiddenMessage.find('.messageA')
    expect(messageA).toHaveLength(1);
    expect(hiddenMessage.find('.messageB')).toHaveLength(0);
    expect(hiddenMessage.state().messageA).toBeTruthy();
    expect(messageA.text()).toEqual(message);
  });

  it('renders MessageB when messageA is false', () => {
    const message = "moving on out";
    const hiddenMessage = mount(<HiddenMessages message={message} />);
    hiddenMessage.setState({ messageA: false, })
    const messageB = hiddenMessage.find('.messageB')
    expect(hiddenMessage.find('.messageA')).toHaveLength(0);
    expect(messageB).toHaveLength(1);
    expect(messageB.text()).toEqual(message);
  });

  it('toggles the state, messageA, when the timeStamp prop changes', () => {
    const message = "time to break free";
    const date = Date.now();
    const hiddenMessage = mount(<HiddenMessages message={message} />);
    expect(hiddenMessage.find('.messageA')).toHaveLength(1);
    expect(hiddenMessage.find('.messageB')).toHaveLength(0);
    expect(hiddenMessage.find('.messageA').text()).toEqual(message);
    expect(hiddenMessage.state().messageA).toBeTruthy();
    hiddenMessage.setProps({ timeStamp: date })
    hiddenMessage.update();
    expect(hiddenMessage.find('.messageA')).toHaveLength(0);
    expect(hiddenMessage.find('.messageB')).toHaveLength(1);
    expect(hiddenMessage.find('.messageB').text()).toEqual(message);
  });

});
