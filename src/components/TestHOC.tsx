import { withSplit } from 'split-react';

const FLAG = 'test1';

const TestHOC = ({ splitFlagOn }: { splitFlagOn?: boolean }) => {
  const color = splitFlagOn ? '#00FF00' : '#FF0000';

  return (
    <h1>HOC: The flag <i>{FLAG}</i> is <strong style={{ color }}>{splitFlagOn ? 'ON' : 'OFF'}</strong></h1>
  );
};

export default withSplit(TestHOC, FLAG, true);
