import React from 'react';
import { FeatureFlags } from 'split-react';

export const CustomSplitContext = React.createContext<{ split?: FeatureFlags }>({
  split: undefined,
});