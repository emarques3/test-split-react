import { SplitConfig } from 'split-react';

const key = '[SOME_USER_KEY]';

export const config: SplitConfig = {
  core: {
    authorizationKey: '[YOUR_SPLIT_KEY]',
    key,
  },
};
