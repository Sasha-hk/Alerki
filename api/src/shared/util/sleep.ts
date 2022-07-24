export default async (s: number) => {
  return new Promise((res: any) => {
    setTimeout(() => {
      res();
    }, s * 1000);
  });
};
