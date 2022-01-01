// export const getImage = (name: string): string => {
//   return new URL(`/src/assets/images/${name}.png`, location.href).href;
// };

export const getImage = (name: string): string => {
  // 其实就是将图片导为模块
  // 获取图片模块
  const picModules = import.meta.globEager("../assets/images/**");
  console.log(picModules);

  // 获取指定的图片
  const path = `../assets/images/${name}.png`;
  console.log(path);

  return picModules[path].default;
};
