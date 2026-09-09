const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    res.status(400);
    return next(new Error(message));
  }

  next();
};

module.exports = validate;