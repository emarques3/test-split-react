# Simple `split-react` example

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a simple usage example of [split-react](https://github.com/e-libs/split-react), a library that I maintain on **`e-libs`**.

## How to setup

- Open your [config](https://github.com/emarques3/test-split-react/blob/master/src/split/config.ts) file and add your Split API key and user identifier (which in a real application could be the user ID, email, etc)
```typescript
import { SplitConfig } from 'split-react';

const key = '[SOME_USER_KEY]';

export const config: SplitConfig = {
  core: {
    authorizationKey: '[YOUR_SPLIT_KEY]',
    key,
  },
  // ... and whatever other configuration you might want
};

```
- Edit the [App](https://github.com/emarques3/test-split-react/blob/master/src/App.tsx) file as you please, changing `test1` to one of your flags on Split (those should be added to your Split account before testing it here)

## How to run it

- Simply `yarn start`, which will make [http://localhost:3000](http://localhost:3000) available on the browser

> **NOTE:** as you may see, you won't need to install the official Split library. All you'll need is your Split key, so you can sync it with your Split account/key for the environment you want to test.
- You should be able to see the app running
- Now play around with your flags, toggling them on Split's dashboard, and watch them changing in real time on your app
> **NOTE:** Even though Split has their real time livestream set as default (thus you should see the changes immediately), it is a known behavior that, sometimes, Split doesn't reflect the changes right away, so it will wait for the next polling cycle (which you may set on your config file) to apply those changes. If that happens, just grab a quick coffee and come back when the changes are _automagically_ applied (which should take less than a minute).

## See it in action 🎥
![](src/flag.gif)

## Hook and HOC

You'll notice there are two implementations: one using [React Hooks](https://reactjs.org/docs/hooks-intro.html) (enabled by default in this demo), and another one using a [High Order Component](https://reactjs.org/docs/higher-order-components.html) (aka HOC), which you may enable too. They both accomplish the same goal, they're just two well known approaches you may choose, according to your project.

To do so, simply uncomment those two lines below:

```tsx
import React from 'react';
import './App.css';
import { Test } from './components/Test';
// import TestHOC from './components/TestHOC';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Test splitName="test1" />
        {/* <TestHOC /> */}
      </header>
    </div>
  );
}

export default App;
```
## Don't want to use the SplitProvider?

That's totally fine, as you may also create your own, or use the `FeatureFlags` class as you please. Here's how:

### index.tsx

On `src/index.tsx`, you'll see two blocks - the default one is using `split-react`, and the custom one is using its own logic. This second one represents whatever implementation you might want to do, without relying on the built in `SplitProvider`.

```tsx
import App from './components/App';
import AppCustom from './components/AppCustom'; // not in use here
import { SplitProvider } from 'split-react';
import { CustomProvider } from './components/CustomProvider'; // not in use here

// ...

// With split-react built in Provider
ReactDOM.render(
  <SplitProvider config={config}>
    <App />
  </SplitProvider>,
  document.getElementById('root')
);

// With your custom provider
// ReactDOM.render(
//   <CustomProvider>
//     <AppCustom />
//   </CustomProvider>,
//   document.getElementById('root')
// );
```

Therefore, in order to test this, what you want to do is to switch it to:

```tsx
import App from './components/App'; // not in use here
import AppCustom from './components/AppCustom';
import { SplitProvider } from 'split-react'; // not in use here
import { CustomProvider } from './components/CustomProvider';

// ...

// With split-react built in Provider
// ReactDOM.render(
//   <SplitProvider config={config}>
//     <App />
//   </SplitProvider>,
//   document.getElementById('root')
// );

// With your custom provider
ReactDOM.render(
  <CustomProvider>
    <AppCustom />
  </CustomProvider>,
  document.getElementById('root')
);
```

### Create a Context Provider

You may create your own context provider like in `src/components/CustomProvider/index.tsx`, and **instantiate your own global instance of `split-react`'s `FeatureFlags`**. This is where you'll need to set it up with your user key, representing the user accessing the app.

```tsx
import React from 'react';
import { FeatureFlags } from 'split-react';
import { config } from '../../split/config';
import { CustomSplitContext } from './CustomSplitContext';

export const CustomProvider = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  // Initiate your global Split FeatureFlags instance
  const split = new FeatureFlags(config);

  // Setup with your key - this can come from a selector, for example
  split.setup(config.core.key as string);


  /*
   * Any custom Provider logic goes here...
   */


  // Returns the provider with the FeatureFlags
  return (
    <CustomSplitContext.Provider value={{ split }}>
      {children}
    </CustomSplitContext.Provider>
  );
};
```

You'll also need a [React Context](https://reactjs.org/docs/context.html) for that, like in `src/components/CustomProvider/CustomSplitContext.ts`. There is where you want to provide `split-react`'s `FeatureFlags` in your context:

```tsx
import React from 'react';
import { FeatureFlags } from 'split-react';

export const CustomSplitContext = React.createContext<{ split?: FeatureFlags }>({
  split: undefined,
});
```

### The custom hook

Now that you have your Provider in place, it's time to create a hook (or even a [HOC](https://reactjs.org/docs/higher-order-components.html)). It should read from the context and handle the `on` and `off` events as you wish. Here's a suggestion, as in `src/split/useCustomSplit.ts`:

```ts
import { useState, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid'; // just an example
import { CustomSplitContext } from '../components/CustomProvider/CustomSplitContext';

export const useCustomSplit = (splitName: string, defaultValue = true): boolean => {
  // Obtain the global FeatureFlags instance
  const { split } = useContext(CustomSplitContext);

  // Custom logic to handle default values
  const initialValue = defaultValue ? 'on' : 'off';
  const splitValue = split?.getSplit(splitName, initialValue) ?? initialValue;

  // Local state to control when the flag changes will affect your hook, hence your components using it
  const [currentSplit, setCurrentSplit] = useState(splitValue);

  useEffect(() => {
    const id = nanoid(); // any random generator should work

    // Subscribing to change events
    split?.on(splitName, id, (splitValue: string) => {
      setCurrentSplit(splitValue);
      console.log('Look! This is your custom logic working');
      
    });

    // Unsubscribing, on 'unmount'
    return () => {
      split?.off(id);
    };
  }, [split, splitName]);

  return currentSplit === 'on';
};
```

There you go! It should work as sweet as the built in `SplitProvider`, with the only difference that now you're in charge, being able to add any custom logic you want.

Enjoy it!
