export const randomDelay = (min: number, max: number) => {
  return new Promise<void>((resolve) => {
    const delay = Math.random() * (max - min) + min;
    setTimeout(() => {
      resolve();
    }, delay);
  });
};