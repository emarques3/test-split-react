import { useCustomSplit } from '../split/useCustomSplit';

export const TestCustom = ({ splitName }: { splitName: string }) => {
  const split = useCustomSplit(splitName, false);
  const color = split ? '#00FF00' : '#FF0000';

  return (
    <>
      <h1>Custom Test</h1>
      <h2>The flag <i>{splitName}</i> is <strong style={{ color }}>{split ? 'ON' : 'OFF'}</strong></h2>
    </>
  );
};
