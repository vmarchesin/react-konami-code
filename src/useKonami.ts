import { useEffect, useState, useCallback } from 'react';

import { KONAMI_CODE } from './utils/consts';

function useKonami(action: () => void, { code = KONAMI_CODE } = {}) {
  const [input, setInput] = useState<number[]>([]);

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
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
}

export default useKonami;
