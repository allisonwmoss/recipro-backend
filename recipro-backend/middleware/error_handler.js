const handleErrors = ((error, req, res, res) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).send(message);
});

module.exports = {
    handleErrors
}