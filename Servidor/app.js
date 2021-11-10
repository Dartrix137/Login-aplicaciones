/*
Servidor aplicación Login corte 3
Estudiantes:
-Daniel Felipe Trujillo
-Juan Sebatián Barbeti López
*/
//Importaciones
const { request } = require('express');
const express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
//

const saltRounds = 10;
const app = express();
const port = 3001;
let connection;//variable para almacenar las conexiones a la base de datos
//configura el servidor para recibir datos en json
app.use(express.json());
//Permite los métodos GET, POST y PUT de la dirección http://localhost:3000
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "id",
    secret: "sercret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))
//Se define el puerto en el que se ejecuta el servidor
app.set('port', process.env.PORT || port);
//endpoints del api
app.get("/", (req, res) => {
    res.json("Backend Login");
});
app.get('/login', (req, res) => {
    if (req.session.usuario) {
        res.json({ loggedIn: true, usuario: req.session.usuario });
    } else {
        res.json({ loggedIn: false });
    }
});
//Registrar un usuario, se utiliza la libreria bcrypt para encriptar la contraseña
app.post('/registro-usuario', async (req, res) => {
    const usuario = req.body;
    bcrypt.hash(usuario.contraseña, saltRounds, async (err, hash) => {
        if (err) {
            res.json(err);
        }
        await connection.execute(`INSERT INTO usuarios (nombre , contraseña) VALUES ('${usuario.nombre}', '${hash}')`);
		res.json("Usuario agregado");
		console.log("Usuario agregado");
	});
});
//Verifica que el usuario exista
app.post('/login', async (req, res) => {
    const usuario = req.body;
    const [rows, fields] = await connection.execute(`SELECT * FROM usuarios WHERE nombre='${usuario.nombre}'`);
    if (rows[0] != undefined) {
        bcrypt.compare(usuario.contraseña, rows[0].contraseña, (error, result) => {
            if (result) {
                req.session.usuario = rows;
                console.log(req.session.usuario)
                console.log(rows[0].logins);
                res.json(rows[0]);
                if (rows[0].logins == null) {
                    connection.execute(`UPDATE usuarios set logins=1 WHERE nombre='${usuario.nombre}'`);
                } else {
                    connection.execute(`UPDATE usuarios set logins=${rows[0].logins + 1} WHERE nombre='${usuario.nombre}'`);
                }
            } else {
                res.json({ "Mensaje": "Usuario o contraseña equivocada" });
                console.log("Datos incorrectos");
            }
        });
    } else {
        res.json({ "Mensaje": "Usuario no existe" });
        console.log("Usuario no existe");
    }
});
//Actualiza la contraseña del usuario
app.put('/actualizar-usuario', async (req, res) => {
    const usuario = req.body;
    const [rows, fields] = await connection.execute(`SELECT * FROM usuarios WHERE nombre='${usuario.nombre}'`);
    bcrypt.compare(usuario.contraseña, rows[0].contraseña, (error, result) => {
        if (result) {
            res.json({"Mensaje": "No se puede repetir la misma contraseña"});
        } else {
            bcrypt.hash(usuario.contraseña, saltRounds, async (err, hash) => {
                await connection.execute(`UPDATE usuarios set contraseña='${hash}', logins=1 WHERE nombre='${usuario.nombre}'`);
                res.json("Contrseña actualizada");
            });
        }
    });
});
//Hace la conexión a la base de datos
//Aquí se pueden cambiar las credenciales el host, el usuario y la contraseña, si no tiene contraseña dejar comillas vacias
app.listen(app.get('port'), async () => {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'usuarios',
        Promise: bluebird
    });
    console.log("Server running on port: " + app.get('port'));
});