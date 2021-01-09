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