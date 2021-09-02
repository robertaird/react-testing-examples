import { useState } from 'react';
import { MinimalApiComp } from './thirdPartyDependency';

export const SomeComp = () => {
  const [color, setColor] = useState('blue');
  const onClick = () => {
    setColor((currentColor) => (currentColor === 'blue' ? 'green' : 'blue'));
  };
  return (
    <div>
      Current color: {color}
      <MinimalApiComp color={color} onClick={onClick} />
    </div>
  );
};
