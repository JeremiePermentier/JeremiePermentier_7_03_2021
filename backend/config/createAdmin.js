const models = require('../models');
const bcrypt = require("bcrypt");

function createAdmin(req, res){
    models.User.findOne({ where: {email: "admin@admin.com"} || { pseudo: "admin"} })
    .then((user) => {
        if (!user){
            bcrypt.hash("admin", 10)
            .then((hash) => {
                const admin = models.User.create({
                    pseudo: "admin",
                    email: "admin@admin.com",
                    password: hash,
                    isAdmin: true
                })
                .then((admin) => {
                    console.log({ 
                        message: `Votre compte admin a été crée !`,
                     });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
            })
            .catch((error) => {
                res.status(500).send({ error });
            })
        } else {
            console.log({ message: "L'admin est déjà créé"});
        }
    })
    .catch((error) => {
        console.log({ error });
    });
}
module.exports = createAdmin();