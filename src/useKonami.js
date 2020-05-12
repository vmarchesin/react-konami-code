import { useEffect, useState, useCallback } from 'react';

export default (action, {
  code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
} = {}) => {
  const [input, setInput] = useState([]);

  const onKeyUp = useCallback(
    (e) => {
      const newInput = input;
      newInput.push(e.keyCode);
      newInput.splice(-code.length - 1, input.length - code.length);

      setInput(newInput);

      if (newInput.join('').includes(code.join(''))) {
        action();
      }
    },
    [input, setInput, code, action],
  );

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);
};
