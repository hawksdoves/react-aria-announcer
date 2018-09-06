import React from 'react';
import { shallow, mount } from 'enzyme';
import { connectActionProvider, connectActionConsumer, AnnounceMessageContext } from '../src/connectActions';

const addNewMessage = jest.fn();
    
global.Date = {
  now: jest.fn(() => 'the time is now'),
}

const ariaMessages = {
  sing: () => 'chase all your blues away',
}

const Component = ({addNewMessageByAction}) => {
  return 'Forget your troubles, come on, get happy.';
}

const Toolbar = ({ addNewMessageByAction }) => {
  const handleOnClick = () => {
    addNewMessageByAction('sing')
  }

  return (
    <button onClick={handleOnClick}>
            let's sing!
    </button>
  )
}

describe('connectActions', () => {
  describe('connectActionProvider', () => {
    it('wraps child with a context provider', () => {
      const AccessibleComponent = connectActionProvider(Component)
      const accessibleComponent = shallow(<AccessibleComponent />);
      expect(accessibleComponent.find(AnnounceMessageContext.Provider)).toHaveLength(1);
      expect(accessibleComponent.find(Component)).toHaveLength(1);  
    });
  
    it('the context value of the provider when called, calls addNewMessage', () => {
      const AccessibleComponent = connectActionProvider(Component)
      const accessibleComponent = shallow(<AccessibleComponent ariaMessages={ariaMessages} addNewMessage={addNewMessage} />);
      const provider = accessibleComponent.find(AnnounceMessageContext.Provider);
      expect(provider).toHaveLength(1);
      const action = 'sing';
      provider.prop('value')(action);
      expect(addNewMessage).toHaveBeenCalledWith(ariaMessages.sing(), 'the time is now');
    });
  })

  describe('connectActionConsumer', () => {
    it('will recieve the action as defined in the provider', () => {
      const AccessibleConsumerToolbar = connectActionConsumer(Toolbar);
      const FakeApp = () => {
        return <AccessibleConsumerToolbar />
      }
      const AccessibleProviderComponent = connectActionProvider(FakeApp)
      const accessibleApp = mount(<AccessibleProviderComponent ariaMessages={ariaMessages} addNewMessage={addNewMessage} />);
      accessibleApp.find('button').simulate('click');
      expect(addNewMessage).toHaveBeenCalledWith(ariaMessages.sing(), 'the time is now');
    })
  })
  
});
