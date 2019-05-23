// Works the same as Lodash's chunk function
// https://lodash.com/docs/4.17.11#chunk
// https://youmightnotneed.com/lodash/#chunk
export const chunk = (arr: any[], chunkSize: number = 1) => {
  const cache = [];
  const arrCopy = [...arr];

  if (chunkSize <= 0) {
    return [];
  }

  while (arrCopy.length) {
    cache.push(arrCopy.splice(0, chunkSize));
  }

  return cache;
};
