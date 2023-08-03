const Joi = require("joi");

const userSchema = Joi.object({
    // Some properties
    name: Joi.string().required(),
    description: Joi.string().required(),
});

exports.validateResourceInput = (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        // If input validation fails, send an error response
        return res.status(400).json({ error: error.details[0].message });
    }

    // Input validation successful, proceed to the next middleware or route handler
    next();
};
