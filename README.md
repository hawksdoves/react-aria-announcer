# react-aria-announcer

This lightweight package allows you to broadcast `aria-live` messages to screen-readers from anywhere within your React application.

This package was created to try and solve the problems that I faced when building an online accessible editor. Historically, online editors are known for being not very accessible. Using this package I was able to broadcast announcements such as `"text block has been added"` or an `"image block has been deleted"`, which normally would not have been detected by a screenreader, but would have been visible on the screen.

Unlike other packages that also solve this issue, `react-aria-announcer` allows you to pre-define acceptable aria-live announcements. It also, takes advantage of HOCs, allowing for cleaner, more readable code.

Using ``react-aria-announcer`` you can broadcast these important announcements from any component in your application.

## Installation
_______________

```
npm install react-aria-announcer
```
or
```
yarn add react-aria-announcer
```

## Usage
_________
------

The library exports 3 components and one react context.

#### HiddenMessages
---
This component contains your aria-live div. 

```javascript
import React, { Component } from 'react';
import { HiddenMessages } from 'react-aria-announcer';

class MyAccessibleApp extends Component {
  state = {
    message: '',
    timeStamp: '',
  }

  render() {
    return (
      <HiddenMessages 
        message={this.state.message} 
        timeStamp={this.state.timeStamp} 
      />
    )
  }
}
```

The props:
* `message` - required (must receive the state value)
* `timeStamp` - required (must receive the state value)
* `manner` - optional values: 'assertive' or 'polite' (default: `'polite'`)

#### connectAriaAnnouncementProvider
----
This higher order component receives your app or a section of your app, where any number of it's ancestors might want to make an announcement. 

```javascript
import React, { Component } from 'react';
import { HiddenMessages, connectAriaAnnouncementProvider } from 'react-aria-announcer';
import ariaMessages from './ariaMessages';

function SearchableDashboard(props) {
  return (
    <div>
      ...lots of components within here!
    </div>
  )
}

const AccessibleSearchableDashboard = connectAriaAnnouncementProvider(SearchableDashboard)

class MyAccessibleApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      timeStamp: '',
    }
  }

  render() {
    return (
      <div>
      <HiddenMessages 
        message={this.state.message} 
        timeStamp={this.state.timeStamp} 
        manner='assertive'
      />
      <AccessibleSearchableDashboard
        announce={(message, timeStamp) => this.setState({ message, timeStamp })} 
        ariaMessages={ariaMessages}
        {...props}
      />
      </div>
    )
  }
}
```
The new component must receive 2 props:
This new component must receive a function that calls the setState belonging to the component that holds the state; message and timestamp.
* `announce` - {*function*} with two parameters, message and timeStamp and must call the setState method that belongs to the component that holds the state; message and timestamp. 
i.e.  
```javascript
(message, timeStamp) => this.setState({ message, timeStamp })
```
* `ariaMessages` - {*object*}
  - keys: actions e.g. addBlock
  - values: {*functions*} - can take as many arguments as needed, but must return a *string*

e.g.
```javascript
const ariaMessages = {
  onToggleButton: () => 'Press shift enter to open toolbar, and navigate using tab ',
  addBlockGuide: type => `Press shift enter to add a new ${type} block`,
  blockAction: (type, action) => `${type} block ${action}`,
  moveBlock: (type, position) => `${type} block has moved to ${position}`,
  entered: (type) => `You are now in the ${type} block`,
  filter: (type, resultNumber) => `Now viewing ${resultNumber} of ${type} blocks`
};

```

## Connecting to the Announcer
---
There are 2 ways to connect to the announcer:
* {*connectAriaAnnouncementConsumer*} this is a higher order component  
* {*AnnounceMessageContext*} this is a react context object, allowing you to use react hooks

### connectAriaAnnouncementConsumer
---
This higher order component receives your component that might handle important visual changes and actions etc.

```javascript
import React from 'react';
import { HiddenMessages, connectAriaAnnouncementConsumer } from 'react-aria-announcer';

function FilterByBlockButton({ announce, type }) {
  function handleClick() {
    fnFiltersDataBy(type)
      .then((res) => {
        announce('filter', type, res.length)
      })
    
  }

  return (
    <button onClick={() => handleClick()}>
      filter by {type}
    </button>
  )
}

const AccessibleFilterByBlock = connectAriaAnnouncementConsumer(FilterByBlockButton)

function MyAccessibleAppSectionChild() {
  return (
    <div>
      other components
      <AccessibleFilterByBlock type='text' />
      <AccessibleFilterByBlock type='headline' />
      <AccessibleFilterByBlock type='image' />
      even more components
    </div>
  )
}

```
Your component will receive a prop `announce`.
* `announce` - {function} - the first argument will be a key, as defined in your ariaMessages. Any additional arguments will correspond to the keys value and any arguments that you defined that function to take.

### AnnounceMessageContext
---
This context object allows you to take advantage of react hooks. It's behaviour is then exactly the same as connectAriaAnnouncementConsumer

```javascript
import React from 'react';
import { HiddenMessages, AnnounceMessageContext } from 'react-aria-announcer';

function FilterByBlockButton({ type }) {
  const announce = React.useContext(AnnounceMessageContext);
  function handleClick() {
    fnFiltersDataBy(type)
      .then((res) => {
        announce('filter', type, res.length)
      })
    
  }

  return (
    <button onClick={() => handleClick()}>
      filter by {type}
    </button>
  )
}

const AccessibleFilterByBlock = connectAriaAnnouncementConsumer(FilterByBlockButton)

function MyAccessibleAppSectionChild() {
  return (
    <div>
      other components
      <AccessibleFilterByBlock type='text' />
      <AccessibleFilterByBlock type='headline' />
      <AccessibleFilterByBlock type='image' />
      even more components
    </div>
  )
}

```
Your component will receive a prop `announce`.
* `announce` - {function} - the first argument will be a key, as defined in your ariaMessages. Any additional arguments will correspond to the keys value and any arguments that you defined that function to take.

# Contributing to react-aria-announcer

Thank you for taking the time to contribute.

The community is a safe place for people to collaborate.

Please read the [CODE of CONDUCT](/CODE_OF_CONDUCT.md).

---

## All contributions are welcome 

...from typos in documentation to coding new features. If you require any help or have any questions please do not hesitate to ask, we are friendly and aim to reply within 48hours.

