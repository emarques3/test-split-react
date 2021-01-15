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

  // Set it up with your key - this can come from a selector, or any source identifying your user
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
