export default (ms = 1000) => {
  return (resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  };
};
