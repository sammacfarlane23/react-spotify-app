import { useState } from 'react';

// Custom hook to act as a constructor for a functional component
// Must be invoked at the top of a functional component
const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

export { useConstructor };
