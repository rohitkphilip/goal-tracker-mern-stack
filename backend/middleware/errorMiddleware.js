const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    
    res.status(statusCode)

    res.json({
        message: err.message,
        // stack: process.env.NODE_ENV === 'production' ? null : err.stack
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}

module.exports = {
    errorHandler
}