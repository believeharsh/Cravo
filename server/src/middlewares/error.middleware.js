// This function catches the `apiError` thrown in your controllers
const errorHandler = (err, req, res, next) => {
  // Use the statusCode and message from the thrown apiError
  console.log('this error handler is working');
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Format the JSON response
  const response = {
    success: false,
    message: message,
    data: null,
    errors: err.errors || [],
  };

  // Send the formatted JSON response to the client
  return res.status(statusCode).json(response);
};

export default errorHandler;
