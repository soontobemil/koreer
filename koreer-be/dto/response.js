const response = (code, message, result) => {
    return {
        code: code,
        message: message,
        result: result
    }
};

module.exports = {response};