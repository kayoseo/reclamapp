var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.options('*', cors()) // include before other routes

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/**************************** 
 *      BASE DE DATOS       *
 ****************************
*/

mongoose.connect('mongodb://localhost/sercolex-api', { useMongoClient: true });



/**************************** 
 *          MODELO          *
 ****************************
*/

var reclamoSchema = new mongoose.Schema({
    numero: { type: String }, //required: true demtrp del parentesis so es qie es obligatorio.
    fecha: { type: String },
    nombre: { type: String }, //nombre residente
    telefono: { type: String },
    email: { type: String },
    administrador: { type: String },
    direccion: { type: String },
    problema: { type: String },
    estado: { type: String },
    solucion: { type: String }
});

var Reclamo = mongoose.model('Reclamo', reclamoSchema);

var usuarioSchema = new mongoose.Schema({
    nombre: { type: String }, //required: true demtrp del parentesis so es qie es obligatorio.
    mail: { type: String },
    clave: { type: String },
    usuario: {type: String}
});

var Usuario = mongoose.model('Usuario', usuarioSchema);

var comunidadSchema = new mongoose.Schema({
    nombre: { type: String }, //required: true demtrp del parentesis so es qie es obligatorio.
    direccion: { type: String },
    administrador: { type: String },
    torreDpto: {type: Array}
});

var Comunidad = mongoose.model('Comunidad', comunidadSchema);
/**************************** 
 *        ENDPOINTS  Reclamo       *
 ****************************
*/

// Obtiene todos los reclamos
app.get('/reclamo', function (req, res) {
    Reclamo.find({}, function (error, reclamo) {
        if (error) return res.status(500).send(error);

        res.json(reclamo);
    });
});


// Obtiene un reclamo
app.get('/reclamo/:id', function (req, res) {
    Reclamo.findById(req.params.id, function (error, reclamo) {
        if (error) return res.status(500).send(error);

        res.json(reclamo);
    });
});

// Obtiene Todos reclamos Desconocidos
app.get('/desconocido', function (req, res) {
    Reclamo.find({administrador:'Desconocido'}, function (error, reclamo) {
        if (error) return res.status(500).send(error);

        res.json(reclamo);
    });

    
    });


// Crea un reclamo nuevo
app.post('/reclamo', function (req, res) {
    var reclamo = new Reclamo();
    reclamo.fecha = req.body.fecha; //required= true demtrp del parentesis so es qie es obligatorio.
    reclamo.nombre = req.body.nombre; //nombre residente
    reclamo.telefono = req.body.telefono;
    reclamo.email = req.body.email;
    reclamo.administrador = req.body.administrador;
    reclamo.direccion = req.body.direccion;
    reclamo.problema = req.body.problema;
    reclamo.estado = req.body.estado || 'No informado';
    reclamo.solucion = req.body.solucion || 'Esperando solución...';

    reclamo.save(function (error, savedReclamo) {
        if (error) return res.status(500).send(error);
        //res.json({ id: reclamo._id });
        res.status(201).json(savedReclamo);

    });
});

// Actualiza un reclamo
app.put('/reclamo/:id', function (req, res) {
    Reclamo.findById(req.params.id, function (error, reclamo) {
        if (error) return res.status(500).send(error);

        reclamo.fecha = req.body.fecha; //required= true demtrp del parentesis so es qie es obligatorio.
    reclamo.nombre = req.body.nombre; //nombre residente
    reclamo.telefono = req.body.telefono;
    reclamo.email = req.body.email;
    reclamo.administrador = req.body.administrador;
    reclamo.direccion = req.body.direccion;
    reclamo.problema = req.body.problema;
    reclamo.estado = req.body.estado || 'No informado';
    reclamo.solucion = req.body.solucion || 'Esperando solución...';

        reclamo.save(function (savingError, savedReclamo) {
            if (savingError) return res.status(500).send(savingError);

            res.json(savedReclamo);
        });
    });
});

// Borra un reclamo
app.delete('/reclamo/:id', function (req, res) {
    Reclamo.findById(req.params.id, function (error, reclamo) {
        if (error) return res.status(500).send(error);

        reclamo.remove(function (removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

            res.json({ message: "Pingüino removido exitosamente" });
        });
    });
});

/**************************** 
 *        ENDPOINTS  Comunidad     *
 ****************************
*/

// Obtiene todas las comunidades
app.get('/comunidad', function (req, res) {
    Comunidad.find({}, function (error, comunidad) {
        if (error) return res.status(500).send(error);

        res.json(comunidad);
    });
});


// Obtiene un comunidad en base a su id
app.get('/comunidad/:id', function (req, res) {
    Comunidad.findById(req.params.id, function (error, comunidad) {
        if (error) return res.status(500).send(error);

        res.json(comunidad);
    });
});

// Crea un comunidad nuevo
app.post('/comunidad', function (req, res) {
    var comunidad = new Comunidad();
    comunidad.nombre = req.body.nombre; //required= true demtrp del parentesis so es qie es obligatorio.
    comunidad.mail = req.body.mail; //nombre residente
    comunidad.clave = req.body.clave;
    comunidad.usuario = req.body.usuario;

    comunidad.save(function (error, savedComunidad) {
        if (error) return res.status(500).send(error);
        //res.json({ id: comunidad._id });
        res.status(201).json(savedComunidad);

    });
});

// Actualiza un comunidad
app.put('/comunidad/:id', function (req, res) {
    Comunidad.findById(req.params.id, function (error, comunidad) {
        if (error) return res.status(500).send(error);

        comunidad.nombre = req.body.nombre; //required= true demtrp del parentesis so es qie es obligatorio.
        comunidad.mail = req.body.mail; //nombre residente
        comunidad.clave = req.body.clave;
        comunidad.usuario= req.body.usuario;

        comunidad.save(function (savingError, savedComunidad) {
            if (savingError) return res.status(500).send(savingError);

            res.json(savedComunidad);
        });
    });
});

// Borra una comunidad
app.delete('/comunidad/:id', function (req, res) {
    Comunidad.findById(req.params.id, function (error, comunidad) {
        if (error) return res.status(500).send(error);

        comunidad.remove(function (removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

            res.json({ message: "Pingüino removido exitosamente" });
        });
    });
});


/**************************** 
 *        ENDPOINTS  Usuario     *
 ****************************
*/

// Obtiene todos los usuarios
app.get('/usuario', function (req, res) {
    Usuario.find({}, function (error, usuario) {
        if (error) return res.status(500).send(error);
        res.json(usuario);
    });
});
// Obtiene todos los usuario con su nombre y _id que sean gerente o administrador
app.get('/admin', function (req, res) {
    Usuario.find({$or:[{usuario:"gerente"},{usuario:"administrador"}]},{nombre: 1,usuario: 1}, function (error, usuario) {
        if (error) return res.status(500).send(error);
        res.json(usuario);

    });
});

// Login usuario
app.post('/login', function (req, res) {
    Usuario.find({mail: req.body.mail,clave: req.body.clave},{_id: 1,usuario: 1}, function (error, usuario) {
        if (error) return res.status(500).send(error);
        res.json(usuario);
    }); 

    }); 
//


// Obtiene un usuario en base a su id
app.get('/usuario/:id', function (req, res) {
    Usuario.findById(req.params.id, function (error, usuario) {
        if (error) return res.status(500).send(error);

        res.json(usuario);
    });
});

// Crea un usuario nuevo
app.post('/usuario', function (req, res) {
    var usuario = new Usuario();
    usuario.nombre = req.body.nombre; //required= true demtrp del parentesis so es qie es obligatorio.
    usuario.mail = req.body.mail; //nombre residente
    usuario.clave = req.body.clave;
    usuario.usuario = req.body.usuario;

    usuario.save(function (error, savedUsuario) {
        if (error) return res.status(500).send(error);
        //res.json({ id: usuario._id });
        res.status(201).json(savedUsuario);

    });
});

// Actualiza un usuario
app.put('/usuario/:id', function (req, res) {
    Usuario.findById(req.params.id, function (error, usuario) {
        if (error) return res.status(500).send(error);

        usuario.nombre = req.body.nombre; //required= true demtrp del parentesis so es qie es obligatorio.
        usuario.mail = req.body.mail; //nombre residente
        usuario.clave = req.body.clave;
        usuario.usuario= req.body.usuario;

        usuario.save(function (savingError, savedUsuario) {
            if (savingError) return res.status(500).send(savingError);

            res.json(savedUsuario);
        });
    });
});

// Borra un usuario
app.delete('/usuario/:id', function (req, res) {
    Usuario.findById(req.params.id, function (error, usuario) {
        if (error) return res.status(500).send(error);

        usuario.remove(function (removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

            res.json({ message: "Pingüino removido exitosamente" });
        });
    });
});


/**************************** 
 *  COMIENZA LA APLICACION  *
 ****************************
*/

app.listen(3000, function () {
    console.log('Escuchando en el puerto 3000');
});