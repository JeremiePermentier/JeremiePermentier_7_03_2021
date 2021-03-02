let jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = "sldufhxjgklùqs85lkjhqsdl8645fsdxkhfwdvc87gkdgfb767lkjbwfdkx";

module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,{
            expiresIn: '1h'
        })
    }
}