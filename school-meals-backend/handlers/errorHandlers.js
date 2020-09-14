exports.catchErrors = (fn) => {
  return function (req, res, next) {
      return fn(req, res, next).catch((err) => {
          console.log(err);
        res.status(500).send("An error has occurred when processing your request.")
    });
  };
};
