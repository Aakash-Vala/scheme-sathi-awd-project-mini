/**
 * Generic Joi validation middleware
 * Validates request data against the provided Joi schema before processing.
 * Returns structured 400 Bad Request with details if validation fails.
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((item) => item.message.replace(/['"]/g, ''));
      return res.status(400).json({
        error: `Validation Error: ${details.join('. ')}`,
        details,
      });
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;
