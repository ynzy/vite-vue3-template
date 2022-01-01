export const getImage = (name: string): string => {
  return new URL(`/src/assets/images/${name}.png`, location.href).href;
};
