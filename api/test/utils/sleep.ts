export default (ms: number) => {
  return new Promise((res: any) => {
    setTimeout(() => res(), ms);
  });
};
