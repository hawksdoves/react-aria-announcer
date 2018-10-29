import React from 'react';
import { shallow, mount } from 'enzyme';
import { connectAriaAnnouncementProvider, connectAriaAnnouncementConsumer, AnnounceMessageContext } from '../src/connectAnnouncements';

const announce = jest.fn();

global.Date = {
  now: jest.fn(() => 'the time is now'),
}

const ariaMessages = {
  sing: () => 'chase all your blues away',
  customSing: jest.fn((greeting, adverb) => `${greeting}! What's ${adverb} with you?`),
}

const Component = () => {
  return 'Forget your troubles, come on, get happy.';
}

const Toolbar = ({ announce }) => {
  const handleOnClick = () => {
    announce('sing');
  }

  return (
    <button onClick={handleOnClick}>
            let's sing!
    </button>
  )
}

const ToolbarWithMultipleParameters = ({ announce }) => {
  const handleOnClick = () => {
    announce('customSing', 'Hey', 'wrong');
  }

  return (
    <button onClick={handleOnClick}>
            let's sing!
    </button>
  )
}

describe('connectAnnouncements', () => {
  describe('connectAriaAnnouncementsProvider', () => {
    it('wraps child with a context provider', () => {
      const AriaProviderComponent = connectAriaAnnouncementProvider(Component)
      const ariaProviderComponent = shallow(<AriaProviderComponent ariaMessages={ariaMessages} announce={announce} />);
      expect(ariaProviderComponent.find(AnnounceMessageContext.Provider)).toHaveLength(1);
      expect(ariaProviderComponent.find(Component)).toHaveLength(1);
    });

    it('the context value of the provider when called, calls announce', () => {
      const AriaProviderComponent = connectAriaAnnouncementProvider(Component)
      const ariaProviderComponent = shallow(<AriaProviderComponent ariaMessages={ariaMessages} announce={announce} />);
      const provider = ariaProviderComponent.find(AnnounceMessageContext.Provider);
      expect(provider).toHaveLength(1);
      const action = 'sing';
      provider.prop('value')(action);
      expect(announce).toHaveBeenCalledWith(ariaMessages.sing(), 'the time is now');
    });
  })

  describe('connectAriaAnnouncementsConsumer', () => {
    it('will recieve the action as defined in the provider', () => {
      const AriaConsumerToolbar = connectAriaAnnouncementConsumer(Toolbar);
      const FakeApp = () => {
        return <AriaConsumerToolbar />
      }
      const AriaProviderComponent = connectAriaAnnouncementProvider(FakeApp)
      const accessibleApp = mount(<AriaProviderComponent ariaMessages={ariaMessages} announce={announce} />);
      accessibleApp.find('button').simulate('click');
      expect(announce).toHaveBeenCalledWith(ariaMessages.sing(), 'the time is now');
    })

    it('will handle passing in multuple parameters to addNewAnnouncement', () => {
      const AccessibleConsumerToolbar = connectAriaAnnouncementConsumer(ToolbarWithMultipleParameters);
      const FakeApp = () => {
        return <AccessibleConsumerToolbar />
      }
      const AriaProviderComponent = connectAriaAnnouncementProvider(FakeApp)
      const accessibleApp = mount(<AriaProviderComponent ariaMessages={ariaMessages} announce={announce} />);
      accessibleApp.find('button').simulate('click');
      expect(ariaMessages.customSing).toHaveBeenCalledWith('Hey', 'wrong');
    })
  })

});
