/**
 * Is used to get prototype chain
 */
export const getPrototypeChain = (
  currentClass: Object,
  prototypeChain: Object[] = [],
): Object[] => {
  const currentPrototype =
    currentClass !== null ? Object.getPrototypeOf(currentClass) : null;

  if (currentPrototype instanceof Object) {
    prototypeChain.push(currentPrototype);

    getPrototypeChain(currentPrototype, prototypeChain);
  }

  return prototypeChain;
};
