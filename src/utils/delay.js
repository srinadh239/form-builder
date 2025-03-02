export const randomDelay = (min, max) => {
    return new Promise((resolve) => {
        const delay = Math.random() * (max - min) + min;
        setTimeout(() => {
            resolve();
        }, delay);
    });
};
