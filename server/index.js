const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

    const sqlLogin = "SELECT ID, nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo FROM usuarios WHERE email = ?";
    db.query(sqlLogin, [email], (err, result) => {
        if (err) {
            res.send({err: err});
        }
        if (result.length > 0) {
            bcrypt.compare(pw, result[0].pw, (error, response) => {
                if (response) {
                    res.send(result);
                    console.log('r', result);
                } else {
                    res.send({message: "Las credenciales que ingresaste son incorrectas o no existen"});
                }
            });
            } else {
            res.send({message: "El usuario ingresado no existe"});
        }
    });
});

app.get("/api/getPartner", (req, res)=>{
    //const sqlSelectPrestadores = "SELECT usuarios.ID, usuarios.nombre, usuarios.apellido, usuarios.sexo, usuarios.documento, usuarios.email, usuarios.fecha_nac, usuarios.telefono, usuarios.calificacion, usuarios.tipo, servicios.descripcion, servicios.tarifa FROM usuarios, servicios WHERE tipo = 0";
    const sqlSelectPrestadores = "SELECT * FROM usuarios inner join servicios on usuarios.ID = servicios.id_usuario inner join zonas on usuarios.ID = zonas.ID_usuario inner join dias on usuarios.ID = dias.id_usuario_d";
    db.query(sqlSelectPrestadores, (err, result) => {
        console.log(result)
        res.send(result); 
    });
});

app.post("/api/getContrataciones", (req, res)=>{
    const ID_cliente = req.body.ID

    const sqlSelectContrataciones = "SELECT usuarios.nombre, usuarios.apellido, contrataciones.fecha, contrataciones.ID_contratacion, contrataciones.ID_cliente, contrataciones.ID_prestador FROM contrataciones inner join usuarios on contrataciones.ID_prestador = usuarios.ID WHERE contrataciones.ID_cliente = ?"; 
    db.query(sqlSelectContrataciones, [ID_cliente], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post("/api/promedioCal", (req, res)=>{
    
    const id_prestador = req.body.id_prestador

    const sqlpromedioCal = "SELECT AVG(ALL calificacion) as prom FROM calificaciones WHERE id_prestador = ?"; 
    db.query(sqlpromedioCal, [id_prestador], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post("/api/opinionesPrest", (req, res)=>{    
    const id_prestador = req.body.id_prestador
    //console.log('id', req.body.id_prestador);

    const sqlopinionesP = "SELECT opiniones.opinion, usuarios.nombre, usuarios.apellido FROM opiniones inner join usuarios on opiniones.id_cliente = usuarios.ID WHERE id_prestador = ?"; 
    db.query(sqlopinionesP, [id_prestador], (err, result) => {
        console.log(result);
        res.send(result);
    });
});


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

    const sqlSelectServiceUser = "SELECT descripcion_d FROM dias WHERE id_usuario_d = ?";
    db.query(sqlSelectServiceUser, [userid], (err, result) => {
        //console.log(result)
        res.send(result);
    });
});

app.post("/api/get-user-zones", (req, res)=>{
    const userid = req.body.userid_

    const sqlSelectZoneUser = "SELECT descripcion_z FROM zonas WHERE ID_usuario = ?";
    db.query(sqlSelectZoneUser, [userid], (err, result) => {
        //console.log(result)
        res.send(result);
    });
});

app.post("/api/get-user-services", (req, res)=>{
    const userid = req.body.userid

    const sqlSelectServiceUser = "SELECT descripcion, tarifa FROM servicios WHERE ID_usuario = ?";
    db.query(sqlSelectServiceUser, [userid], (err, result) => {
        //console.log(result)
        res.send(result);
    });
});
app.post("/api/get-prestador-services", (req, res)=>{
    const userid = req.body.userid

    const sqlSelectServicesUser = "SELECT servicios.descripcion, servicios.tarifa, usuarios.nombre, usuarios.apellido  FROM servicios, usuarios WHERE ID_usuario = ?";
    db.query(sqlSelectServicesUser, (err, result) => {
        //console.log(result)
        res.send(result);
    });
});

app.post("/api/log", (req, res)=> {

    const id_usuario = req.body.id_usuario
    const fecha_hora = req.body.fecha_hora
    const operacion = req.body.operacion

    const sqlLog = "INSERT INTO auditoria_login (id_usuario, fecha_hora, operacion) VALUES (?, ?, ?)";
    db.query(sqlLog, [id_usuario, fecha_hora, operacion], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.post("/api/insert", (req, res)=> {

    const splitter = req.body.fecha_nac;
    const sp = splitter.split('T');
    const split_fecha = sp[0];
    const split_hora = sp[1];

    const hora_ = split_hora.split('.');
    
    const send = split_fecha + ' ' + hora_[0];

    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const sexo = req.body.sexo
    const documento = req.body.documento
    const email = req.body.email
    const fecha_nac = send
    const telefono = req.body.telefono
    const pw = req.body.pw    
    const calificacion = 0
    const tipo = 0

    bcrypt.hash(pw, saltRounds, (err, hash) => {
        
        if (err) {
          console.log(err);
        }


        const sqlInsert = "INSERT INTO usuarios (nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?)";
        db.query(sqlInsert, [nombre, apellido, sexo, documento, email, fecha_nac, telefono, hash, calificacion, tipo], (err, result) => {
            console.log(result)
            console.log(err)
    
        });
    });
});

app.post("/api/insert-cliente", (req, res)=> {

    const splitter = req.body.fecha_nac;
    const sp = splitter.split('T');
    const split_fecha = sp[0];
    const split_hora = sp[1];

    const hora_ = split_hora.split('.');
    
    const send = split_fecha + ' ' + hora_[0];

    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const sexo = req.body.sexo
    const documento = req.body.documento
    const email = req.body.email
    const fecha_nac = send
    const telefono = req.body.telefono
    const pw = req.body.pw
    const calificacion = 0
    const tipo = 1

    bcrypt.hash(pw, saltRounds, (err, hash) => {
        
        if (err) {
          console.log(err);
        }

        const sqlInsertCliente = "INSERT INTO usuarios (nombre, apellido, sexo, documento, email, fecha_nac, telefono, pw, calificacion, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sqlInsertCliente, [nombre, apellido, sexo, documento, email, fecha_nac, telefono, hash, calificacion, tipo], (err, result) => {
        console.log(result)
        console.log(err)
        })
    });
});

app.post("/api/contratar", (req, res)=> {

    const splitter = req.body.fecha;
    console.log('1', splitter);
    const sp = splitter.split('T');
    console.log('sp', sp);
    const split_fecha = sp[0];
    const split_hora = sp[1] + '';

    const fecha_ = split_fecha.split('-');
    const f = fecha_[2] + '/' + fecha_[1] + '/' + fecha_[0];

    const hora_ = split_hora.split(':');
    const h = hora_[0] + 'hs.';
    const send = f + ' ' + h;
    console.log('send',send);


    const ID_prestador = req.body.ID_prestador
    const ID_cliente = req.body.ID_cliente
    const fecha = send
    const cal_prestador = '0'
    const cal_cliente = '0'

    const sqlContratar = "INSERT INTO contrataciones (ID_prestador, ID_cliente, fecha, cal_prestador, cal_cliente) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlContratar, [ID_prestador, ID_cliente, fecha, cal_prestador, cal_cliente], (err, result) => {
        console.log(result);
        console.log(err);

    });
});

// app.post("/api/calificar", (req, res)=> {


//     const id_contratacion = req.body.contratacion_cal
//     const id_prestador = req.body.prestador_cal
//     const id_cliente = req.body.id_cliente
//     const calificacion = req.body.cal_cal

//     const sqlCalificar = "INSERT INTO calificaciones (id_contratacion, id_prestador, id_cliente, calificacion) VALUES (?, ?, ?, ?)";
//     db.query(sqlCalificar, [id_contratacion, id_prestador, id_cliente, calificacion], (err, result) => {
//         console.log(result)
//         console.log(err)

//     });
// });

app.post("/api/calificar2", (req, res)=> {

    
    const id_contratacion = req.body.contratacion_cal
    const id_prestador = req.body.prestador_cal
    const id_cliente = req.body.id_cliente
    const calificacion = req.body.cal_cal

    const sqlCalificar = "INSERT INTO calificaciones (id_contratacion, id_prestador, id_cliente, calificacion) VALUES (?, ?, ?, ?)";
    db.query(sqlCalificar, [id_contratacion, id_prestador, id_cliente, calificacion], (err, result) => {
        console.log(result)
        console.log(err)    

    
    const sqlpromCal = "SELECT AVG(ALL calificacion) as p FROM calificaciones WHERE id_prestador = ?"; 
    db.query(sqlpromCal, [id_prestador], (err, resultado) => {  
            
    //console.log('resultado', resultado[0].p);

    const sqlInsertCal = "UPDATE usuarios SET calificacion = ? WHERE ID = ?";
    db.query(sqlInsertCal, [resultado[0].p, id_prestador], (err, result) => {
        console.log(result)
        console.log(err)

    })})});
});

app.post("/api/opinar", (req, res)=> {

    const id_contratacion = req.body.contratacion_cal
    const id_prestador = req.body.prestador_cal
    const id_cliente = req.body.id_cliente
    const opinion = req.body.opi_opi

    const sqlOpinar = "INSERT INTO opiniones (id_contratacion, id_prestador, id_cliente, opinion) VALUES (?, ?, ?, ?)";
    db.query(sqlOpinar, [id_contratacion, id_prestador, id_cliente, opinion], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.post("/api/set-zones", (req, res)=> {

    const userid = req.body.userid
    const zona = req.body.zona

    const sqlInsertZona = "INSERT INTO zonas (ID_usuario, descripcion_z) VALUES (?, ?)";
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

    const sqlInsertDias = "INSERT INTO dias (id_usuario_d, descripcion_d) VALUES (?, ?)";
    db.query(sqlInsertDias, [id_usuario, descripcion], (err, result) => {
        console.log(result)
        console.log(err)

    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});