import { useEffect, useState } from 'react';

export const EffectComp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancel = false;
    setTimeout(() => {
      if (!cancel) setCount(1);
    }, 250);
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    if (count === 1) {
      setTimeout(() => {
        setCount(2);
      }, 250);
    }
  }, [count]);
  return <div>Current number is {count}</div>;
};
