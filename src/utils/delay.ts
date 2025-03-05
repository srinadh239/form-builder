export const randomDelay = (min: number, max: number) => {
  return new Promise<void>((resolve) => {
console.log('randomDelay');
    const delay = Math.random() * (max - min) + min;
    setTimeout(() => {
console.log('delay');
      resolve();
    }, delay);
  });
};