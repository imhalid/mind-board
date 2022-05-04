const classNames = (...args) => {
  const classes = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i]) {
      classes.push(args[i]);
    }
  }
  return classes.join(" ");
};

export default classNames;
