const { request } = require('express');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql2/promise');
let connection;//variable para almacenar las conexiones a la base de datos
const bluebird = require('bluebird');
//configura el servidor para recibir datos en json
app.use(express.json());
app.use(cors());
app.set('port', process.env.PORT || port);
app.listen(app.get('port'), async () => {
    connection = await mysql.createConnection({
        host: 'sql10.freesqldatabase.com',
        user: 'sql10447201',
        password: 'QiB7dv5A1A',
        database: 'sql10447201',
        Promise: bluebird
    });
    console.log("Server running on port: " + app.get('port'));
});