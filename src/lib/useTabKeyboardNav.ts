import { useCallback, useRef } from 'react';
import type { KeyboardEvent } from 'react';

/**
 * Keyboard behaviour for a horizontal, automatic-activation tablist.
 *
 * Arrow keys wrap, Home/End jump to the edges, and selecting a tab also moves
 * focus to it — the WAI-ARIA pattern. The caller owns selection state so the
 * same hook works for the hero dashboard and the feature picker.
 */
export function useTabKeyboardNav(
  count: number,
  activeIndex: number,
  onSelect: (index: number) => void,
) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const setTabRef = useCallback(
    (index: number) => (element: HTMLButtonElement | null) => {
      tabRefs.current[index] = element;
    },
    [],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      let next = activeIndex;

      switch (event.key) {
        case 'ArrowRight':
          next = (activeIndex + 1) % count;
          break;
        case 'ArrowLeft':
          next = (activeIndex - 1 + count) % count;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = count - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      onSelect(next);
      tabRefs.current[next]?.focus();
    },
    [activeIndex, count, onSelect],
  );

  return { setTabRef, onKeyDown };
}
