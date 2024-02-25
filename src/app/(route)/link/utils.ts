export function unionItemsBy<T>(arr: T[], key: keyof T) {
  const map = new Map(arr.map((item) => [item[key], item]));
  return Array.from(map.values());
}
