import { useState, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import { CustomSplitContext } from '../components/CustomProvider/CustomSplitContext';

export const useCustomSplit = (splitName: string, defaultValue = true): boolean => {
  const { split } = useContext(CustomSplitContext);
  const initialValue = defaultValue ? 'on' : 'off';
  const splitValue = split?.getSplit(splitName, initialValue) ?? initialValue;
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
