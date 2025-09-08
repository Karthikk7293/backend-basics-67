// Base error class to handle custom errors uniformly
class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // Pass message to built-in Error class
        this.statusCode = statusCode; // HTTP status code
        this.isOperational = true; // Flag to differentiate operational errors from programming errors
        Error.captureStackTrace(this, this.constructor); // Create stack trace for debugging
    }
}

// Specific error for validation failures (HTTP 400)
export class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

// Specific error when a resource is not found (HTTP 404)
export class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

// Specific error for database-related issues (HTTP 500)
export class DatabaseError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}

// Helper to send error response in a consistent format
export const sendError = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        error: {
            message, // Include error message
        }
    });
};

// Helper to send success response in a consistent format
export const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data // Include response data
    });
};

// Handle common Mongoose errors and map them to custom errors
export const handleMongooseError = (error) => {
    const { name, code, keyPattern, errors } = error;

    switch (name) {
        case 'CastError':
            return new ValidationError('Invalid ID format'); // Handle wrong object ID format

        case 'ValidationError': {
            // Extract and concatenate validation error messages
            const errorMessages = Object.values(errors).map(({ message }) => message);
            return new ValidationError(`Validation failed: ${errorMessages.join(', ')}`);
        }

        default:
            // Handle duplicate key error (e.g., unique fields already exist)
            if (code === 11000) {
                const field = Object.keys(keyPattern || {})[0];
                return new ValidationError(`${field} already exists`);
            }
            return new DatabaseError(error.message || 'Database operation failed'); // Generic database error
    }
};

// Global error handler middleware to process all errors in the app
export const globalErrorHandler = (error, req, res, next) => {
    // Convert Mongoose errors into application-specific errors
    if (['CastError', 'ValidationError'].includes(error.name) || error.code === 11000) {
        error = handleMongooseError(error);
    }

    const { statusCode = 500, message = 'Internal Server Error', isOperational = false } = error;

    // Log error details with request context for debugging and monitoring
    console.error('Error Details:', {
        message: error.message,
        statusCode,
        isOperational,
        url: req.url,
        method: req.method,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }) // Include stack trace in development mode
    });

    // Send the error response to the client
    sendError(res, message, statusCode);
};
