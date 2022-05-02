const joi_errors = (message, path) => {
  return {
    details: [
      {
        message,
        path: [path],
      },
    ],
  };
};

module.exports = {
    joi_errors,
};

