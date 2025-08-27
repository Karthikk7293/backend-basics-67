class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

export class DatabaseError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}

export const sendError = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        error: {
            message,
        }
    });
};

export const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data
    });
};

export const handleMongooseError = (error) => {
    const { name, code, keyPattern, errors } = error;

    switch (name) {
        case 'CastError':
            return new ValidationError('Invalid ID format');

        case 'ValidationError': {
            const errorMessages = Object.values(errors).map(({ message }) => message);
            return new ValidationError(`Validation failed: ${errorMessages.join(', ')}`);
        }

        default:
            if (code === 11000) {
                const field = Object.keys(keyPattern || {})[0];
                return new ValidationError(`${field} already exists`);
            }
            return new DatabaseError(error.message || 'Database operation failed');
    }
}

export const globalErrorHandler = (error, req, res, next) => {
    // Handle Mongoose errors
    if (['CastError', 'ValidationError'].includes(error.name) || error.code === 11000) {
        error = handleMongooseError(error);
    }

    const { statusCode = 500, message = 'Internal Server Error', isOperational = false } = error;

    // Enhanced logging with request context
    console.error('Error Details:', {
        message: error.message,
        statusCode,
        isOperational,
        url: req.url,
        method: req.method,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });

    sendError(res, message, statusCode,);
};