const errorHandler = (err, req, res, next) => {
    let { statusCode , message} = err;
    statusCode = statusCode || 500,
    res.status(statusCode).send({
      status: "error",
      statusCode: statusCode,
      msg: message,
    });
};

module.exports = errorHandler;