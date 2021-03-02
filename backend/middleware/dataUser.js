const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');

exports.valid = (req, res, next) => {
    // password and email verification
    const schema = new passwordValidator();
    schema
    .is().min(10)               // Minimum length 10
    .is().max(100)              // Maximum length 100
    .has().uppercase()          // Must have uppercase letters
    .has().lowercase()          // Must have lowercase letters
    .has().digits(2)            // Must have at least 2 digits
    .has().not().spaces()       // Should not have spaces

    if (!emailValidator.validate(req.body.email) || !schema.validate(req.body.password)){
        return res.status(400).send({
            error: "Vérifier votre addresse email, le mot de passe doit contenir un minimum de 10 caractères avec des minuscules et majuscules et sans mot de passe."
        });
    } else if (
        emailValidator.validate(req.body.email) ||
        passwordSchema.validate(req.body.password)
      ) {
        next();
      }
    };