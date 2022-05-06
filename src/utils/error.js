module.exports = (message, path) => {
  return {
    details: [
      {
        message,
        path: [path],
      },
    ],
  };
};

