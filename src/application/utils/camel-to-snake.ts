/**
 * Is used to convert camelCase to snake_case in object
 */
export const camelToSnake = <T = any>(value: T) => {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(camelToSnake);
  }

  if (typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        /^[a-z][A-Za-z]*$/.test(key)
          ? key
              .split(/(?=[A-Z])/)
              .join('_')
              .toLowerCase()
          : key,
        camelToSnake(value),
      ]),
    );
  }
  return value;
};
