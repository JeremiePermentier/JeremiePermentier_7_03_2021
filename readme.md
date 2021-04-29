#Installation du backend

```
$ git clone https://github.com/JeremiePermentier/JeremiePermentier_7_03_2021.git
$ cd backend/
$ npm install
```

Suite à l’installation des différents packages, vous devez renommer le fichier config-example.json en config.json.
Suite à ça il faut modifier les différentes valeurs présentes dans le fichier,
en changeant “your_username”, et “your_password” qui sont utilisés pour votre connexion à mysql.

Il faut également changer “your_database” avec la base de données que vous voulez utiliser ou créer.

##Création de la base de données

Si votre base de données est déjà créée vous pouvez passer cette étape.

```
$ sequelize db:create
```

##Migration avec sequelize

```
$ sequelize db:migrate
```

##Création de l’admin

```
$ sequelize db:seed:all
```

##Lancer le serveur backend

```
$ nodemon server
```

#Installation du frontend

```
$ cd frontend/
$ npm install
$ npm run serve
```

Cette commande lance le serveur pour le frontend sur l’adresse http://localhost:8080/login