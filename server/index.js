const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '.Caray199.',
    database: 'gobeauty',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/login", (req, res)=>{

    const email = req.body.emailLogin;
    const pw = req.body.pwLogin;

    const sqlLogin = "SELECT ID, nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo FROM usuarios WHERE email = ? AND pw = ?";
    db.query(sqlLogin, [email, pw], (err, result) => {
        if (err) {
            res.send({err: err});
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Las credenciales que ingresaste son incorrectas o no existen"});
        }
    });
});

app.get("/api/get", (req, res)=>{
    const sqlSelectPrestadores = "SELECT ID, nombre, apellido, sexo, documento, email, fecha_nac, telefono, calificacion, tipo FROM usuarios WHERE tipo = 0 OR tipo = 1";
    db.query(sqlSelectPrestadores, (err, result) => {
        console.log(result)
        res.send(result);
    });
});

// app.post("/api/get-user-info", (req, res)=>{

//     const userid = req.body.userid;

//     const sqlSelectUser = "SELECT ID, nombre, apellido, sexo, documento, email, fecha_nac, telefono, calificacion, tipo FROM usuarios WHERE ID = ?";
//     db.query(sqlSelectUser, [userid], (err, result) => {
//         console.log(result)
//         res.send(result);
//     });
// });


app.get("/api/get-user-info", (req, res)=>{
    const userid = req.body.userid

    const sqlSelectUser = "SELECT ID, nombre, apellido, sexo, documento, email, fecha_nac, telefono, calificacion, tipo FROM usuarios WHERE ID = ?";
    db.query(sqlSelectUser, [userid], (err, result) => {
        console.log(result)
        res.send(result);
    });
});


app.post("/api/insert", (req, res)=> {

    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const sexo = req.body.sexo
    const documento = req.body.documento
    const email = req.body.email
    const fecha_nac = '1988-04-29'
    const telefono = req.body.telefono
    const pw = req.body.pw    
    const calificacion = 0
    const tipo = 0

    const sqlInsert = "INSERT INTO usuarios (nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.post("/api/insert-cliente", (req, res)=> {

    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const sexo = req.body.sexo
    const documento = req.body.documento
    const email = req.body.email
    const fecha_nac = '1988-04-29'
    const telefono = req.body.telefono
    const pw = req.body.pw
    const calificacion = 0
    const tipo = 1

    const sqlInsertCliente = "INSERT INTO usuarios (nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsertCliente, [nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

// app.delete("/api/delete/:movieName", (req, res) => {
//     const name = req.params.movieName;
//     const sqlDelete =
//     "DELETE FROM movie_reviews WHERE movie_name = ?";

//     db.query(sqlDelete, name, (err, result) => {
//         if (err) console.log(err);
//     });
// });

// app.put("/api/update", (req, res) => {
//     const name = req.body.movieName;
//     const review = req.body.movieReview;
//     const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?";

//     db.query(sqlUpdate, [review, name], (err, result) => {
//         if (err) console.log(err);
//     });
// });

app.listen(3001, () => {
    console.log("running on port 3001");
});