const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode || 500;
    switch(statusCode)
    {
        case constants.VALIDATION_FAILED:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.NOT_FOUND:
            res.json({
                title: "Page Not Found",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized Access",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden Access",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
        default:
            console.log(`No error or unknown error: ${statusCode}.`);
    }
};

module.exports = { errorHandler }