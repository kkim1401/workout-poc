import { useMemo, type Ref, type RefCallback, type RefObject } from 'react';

const setRef = <T>(
  // eslint-disable-next-line no-unused-vars
  ref: RefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T | null
) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
};

const useForkRef = <Instance>(
  ...refs: Array<Ref<Instance> | undefined>
): RefCallback<Instance> | null => {
  /**
   * This will create a new function if the refs passed to this hook change and are all defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
};

export default useForkRef;
