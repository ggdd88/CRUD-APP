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

app.get("/api/getPartner", (req, res)=>{
    //const sqlSelectPrestadores = "SELECT usuarios.ID, usuarios.nombre, usuarios.apellido, usuarios.sexo, usuarios.documento, usuarios.email, usuarios.fecha_nac, usuarios.telefono, usuarios.calificacion, usuarios.tipo, servicios.descripcion, servicios.tarifa FROM usuarios, servicios WHERE tipo = 0";
    const sqlSelectPrestadores = "SELECT * FROM usuarios inner join servicios on usuarios.ID = servicios.id_usuario";
    db.query(sqlSelectPrestadores, (err, result) => {
        console.log(result)
        res.send(result); 
    });
});

//SELECT * FROM usuarios inner join servicios on usuarios.ID = servicios.id_usuario


app.post("/api/get-user-info", (req, res)=>{
    const userid = req.body.userid

    const sqlSelectUser = "SELECT ID, nombre, apellido, sexo, documento, email, fecha_nac, telefono, calificacion, tipo FROM usuarios WHERE ID = ?";
    db.query(sqlSelectUser, [userid], (err, result) => {
        console.log(result)
        res.send(result);
    });
});

app.post("/api/get-user-days", (req, res)=>{
    const userid = req.body.userid

    const sqlSelectServiceUser = "SELECT descripcion FROM dias WHERE ID_usuario = ?";
    db.query(sqlSelectServiceUser, [userid], (err, result) => {
        console.log(result)
        res.send(result);
    });
});

app.post("/api/get-user-zones", (req, res)=>{
    const userid = req.body.userid_

    const sqlSelectZoneUser = "SELECT descripcion FROM zonas WHERE ID_usuario = ?";
    db.query(sqlSelectZoneUser, [userid], (err, result) => {
        console.log(result)
        res.send(result);
    });
});

app.post("/api/get-user-services", (req, res)=>{
    const userid = req.body.userid

    const sqlSelectServiceUser = "SELECT descripcion, tarifa FROM servicios WHERE ID_usuario = ?";
    db.query(sqlSelectServiceUser, [userid], (err, result) => {
        console.log(result)
        res.send(result);
    });
});
app.post("/api/get-prestador-services", (req, res)=>{
    const userid = req.body.userid

    const sqlSelectServicesUser = "SELECT servicios.descripcion, servicios.tarifa, usuarios.nombre, usuarios.apellido  FROM servicios, usuarios WHERE ID_usuario = ?";
    db.query(sqlSelectServicesUser, (err, result) => {
        console.log(result)
        res.send(result);
    });
});

app.post("/api/getContrataciones", (req, res)=>{
    const ID = req.body.ID

    const sqlSelectContrataciones = "SELECT servicios_contratados.descripcion, servicios_contratados.tarifa, usuarios.nombre, usuarios.apellido, contrataciones.fecha  FROM servicios_contratados inner join contrataciones on servicios_contratados.ID_contratacion = contrataciones.ID_contratacion inner join usuarios on contrataciones.ID_cliente = usuarios.ID WHERE usuarios.ID = ?"; 
    db.query(sqlSelectContrataciones, [ID], (err, result) => {
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

app.post("/api/contratar", (req, res)=> {

    const ID_prestador = 38
    const ID_cliente = 38
    const fecha = '2021-03-20'
    const cal_prestador = '0'
    const cal_cliente = '0'

    const sqlContratar = "INSERT INTO contrataciones (ID_prestador, ID_cliente, fecha, cal_prestador, cal_cliente) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlContratar, [ID_prestador, ID_cliente, fecha, cal_prestador, cal_cliente], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.post("/api/set-zones", (req, res)=> {

    const userid = req.body.userid
    const zona = req.body.zona

    const sqlInsertZona = "INSERT INTO zonas (ID_usuario, descripcion) VALUES (?, ?)";
    db.query(sqlInsertZona, [userid, zona], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.post("/api/set-services", (req, res)=> {

    const id_usuario = req.body.id_usuario
    const descripcion = req.body.descripcion
    const tarifa = req.body.tarifa

    const sqlInsertServicio = "INSERT INTO servicios (id_usuario, descripcion, tarifa) VALUES (?, ?, ?)";
    db.query(sqlInsertServicio, [id_usuario, descripcion, tarifa], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.post("/api/set-dias", (req, res)=> {

    const id_usuario = req.body.id_usuario
    const descripcion = req.body.descripcion

    const sqlInsertDias = "INSERT INTO dias (id_usuario, descripcion) VALUES (?, ?)";
    db.query(sqlInsertDias, [id_usuario, descripcion], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});