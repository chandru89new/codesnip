const pipe = (...fns) => (...args) => {
  return fns.reduce((arg, currFn) => {
    return currFn.apply(null, Array.isArray(arg) ? arg : [arg]);
  }, args);
};
