var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    //service: 'gmail',
    auth: {
        type:"OAuth2",
            user: 'reclamo.sercolex@gmail.com',
            clientId: '865979561608-oqji5tku7e8rgqr76sp7s1ss815sjr6c.apps.googleusercontent.com',
            clientSecret: 'yDp_7wGKGEnBvroaSmk3HJvd',
            refreshToken: '1/4ybFGSBPeqx2yQcXDcP6XSmHRvNLVo13NyIHMukz6_Q'
        }
    });

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
    comunidad: { type: String },
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
    usuario: { type: String }
});

var Usuario = mongoose.model('Usuario', usuarioSchema);

var comunidadSchema = new mongoose.Schema({
    nombre: { type: String }, //required: true demtrp del parentesis so es qie es obligatorio.
    direccion: { type: String },
    administrador: { type: String },
    torreDpto: { type: Array }
});

var Comunidad = mongoose.model('Comunidad', comunidadSchema);

/**************************** 
 *        ENDPOINTS  Correos       *
 ****************************
*/

//Se cambia el estado de reclamo a externo y se le notifica al gerente.
app.post('/correo/reclamogerente', function (req, res) {
    
 
    var mailOptions = {
        from: 'Reclamo Sercolex<reclamo.sercolex@gmail.com>',
        to: req.body.email,
        subject: 'Reclamo externalizado',
        html:'<p>Estimado Gerente,</p><p>Se le ha solicitado ayuda con el reclamo con <b>N° '+req.body._id+'</b> <p>Recuerde revisar y actualizar el estado del reclamo.</p>'
        
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log(err);
        } else {
            res.json({ message: "Correo enviado" });
            
        }
    })
    res.json({ message: "Correo enviado al gerente" });
    
});


//Se actualiza un reclamo y el residente recibe un correo con los datos.
app.post('/correo/updatereclamo', function (req, res) {
    
    

    var mailOptions = {
        from: 'Reclamo Sercolex<reclamo.sercolex@gmail.com>',
        to: req.body.email,
        subject: 'Reclamo actualizado',
        html:'<p>Estimado '+req.body.nombre+',</p><p>El reclamo <b>N° '+req.body._id+'</b> se ha actualizado:</p><table style="font-family: arial, sans-serif; border-collapse:collapse; width: 100%;"><thead><tr><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Fecha</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Estado</th><th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Solucion</th></tr></thead><tbody><tr><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">'+req.body.fecha+'</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">'+req.body.estado+'</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">'+req.body.solucion+'</td></tr></tbody></table><p>Puede revisar el estado de su reclamo en el siguiente enlace:</p><p><a href="http://localhost:4200/verReclamo/' +req.body._id + '">Presione aquí</a></p><p><b>Este mensaje es automatico, no responda este correo.</b></p><p>Saludos.</p><p>Equipo de Sercolex.</p>'
        
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log(err);
        } else {
            res.json({ message: "Correo enviado" });
            //console.log('Email Sent');
        }
    })
    res.json({ message: "Correo de actualizacion enviado al residente" });
        
});

//Se crea el reclamo y el residente recibe un correo con el numero de reclamo y su id de reclamo.
app.post('/correo/reclamoresidente', function (req, res) {
    
    var mailOptions = {
        from: 'Reclamo Sercolex<reclamo.sercolex@gmail.com>',
        to: req.body.email,
        subject: 'Reclamo realizado',
        html:'<p>Estimado '+req.body.nombre+',</p><p>El reclamo <b>N° '+req.body._id+'</b> fue realizado exitosamente.</p><p>Puede revisar el estado de su reclamo en el siguiente enlace:</p><p><a href="http://localhost:4200/verReclamo/' +req.body._id + '">Presione aquí</a></p><p><b>Este mensaje es automatico, no responda este correo.</b></p><p>Saludos.</p><p>Equipo de Sercolex.</p>'
        
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log(err);
        } else {
            res.json({ message: "Correo enviado" });
            //console.log('Email Sent');
        }
    })
    if(err)
    res.json({ message: "Correo enviado al residente" });
});

//Se crea el reclamo y el administrador recibe un correo con el numero de reclamo que se le ha adjudicado.
app.post('/correo/reclamoadministrador', function (req, res) {
    
 
    var mailOptions = {
        from: 'Reclamo Sercolex<reclamo.sercolex@gmail.com>',
        to: req.body.email,
        subject: 'Nuevo reclamo',
        html:'<p>Estimado Administrador,</p><p>Se le ha realizado un reclamo con <b>N° '+req.body._id+'</b> <p>Recuerde revisar y actualizar el estado del reclamo.</p>'
        
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log(err);
        } else {
            res.json({ message: "Correo enviado" });
            //console.log('Email Sent');
        }
    })
    res.json({ message: "Correo enviado al administrador" });
    
});


//Se crea el reclamo y la secretaria recibe un correo con el numero de reclamo para que realice una modificacion.
app.post('/correo/reclamosecretaria', function (req, res) {
    

    var mailOptions = {
        from: 'Reclamo Sercolex<reclamo.sercolex@gmail.com>',
        to: req.body.mail,
        subject: 'Nuevo Reclamo',
        html:'<p>Estimada Secretaria,</p><p>Se ha realizado un reclamo que necesita ser asignado a un Administrador.</p><p>Recuerde revisar el reclamo a la brevedad.<p>Saludos.</p>'
        
    }
    
    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log(err);
        } else {
            res.json({ message: "Correo enviado" });
            //console.log('Email Sent');
        }
    })
    res.json({ message: "Correo enviado a la secretaria" });
    
});



/**************************** 
 *        ENDPOINTS  Reclamo       *
 ****************************
*/

// Borra todos los reclamos

app.delete('/reclamodelete', function (req, res) {
    Reclamo.find({}, function (error, reclamo) {
        if (error) return res.status(500).send(error);
        for(var item of reclamo)
        {
        item.remove(function (removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

           // res.json({ message: "Pingüino removido exitosamente" });
        });
    }
    });
    res.json({ message: "Todos los reclamos fueron Borrados" });
    });



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
        Reclamo.find({ administrador: 'Desconocido' }, function (error, reclamo) {
            if (error) return res.status(500).send(error);

            res.json(reclamo);
        });
    });

    // Obtiene Todos los reclamos de un Administrador
    app.post('/adminrec', function (req, res) {
        Reclamo.find({ administrador: req.body.nombre }, function (error, reclamo) {
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
        reclamo.comunidad = req.body.comunidad;
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
    app.put('/reclamo/:_id', function (req, res) {
        Reclamo.findById(req.params._id, function (error, reclamo) {
            if (error) return res.status(500).send(error);

            reclamo.fecha = req.body.fecha; //required= true demtrp del parentesis so es qie es obligatorio.
            reclamo.nombre = req.body.nombre; //nombre residente
            reclamo.telefono = req.body.telefono;
            reclamo.email = req.body.email;
            reclamo.administrador = req.body.administrador;
            reclamo.comunidad = req.body.comunidad;
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
        Reclamo.findById(req.body.id, function (error, reclamo) {
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
// Borra todos las comunidades

app.delete('/comunidadDelete', function (req, res) {
    Comunidad.find({}, function (error, comunidad) {
        if (error) return res.status(500).send(error);
        for(var item of comunidad)
        {
        item.remove(function (removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

           
        });
    }
    });
    res.json({ message: "Todos las comunidades fueron Borrados" });
    });


    //Obtiene todas las comunidad para el administrador que ingreso
    app.post('/comunadmin', function (req, res) {
        Comunidad.find({ administrador: req.body.nombre }, function (error, comunidad) {
            if (error) return res.status(500).send(error);
            res.json(comunidad);
        });
    });

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
        comunidad.nombre= req.body.nombre; //required= true demtrp del parentesis so es qie es obligatorio.
        comunidad.direccion = req.body.direccion; //nombre residente
        comunidad.administrador = req.body.administrador;
        comunidad.torreDpto = req.body.torreDpto;

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

            comunidad.nombre= req.body.nombre; //required= true demtrp del parentesis so es qie es obligatorio.
            comunidad.direccion = req.body.direccion; //nombre residente
            comunidad.administrador = req.body.administrador;
            comunidad.torreDpto = req.body.torreDpto;

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

    // Borra todos los usuarios
app.delete('/usuarioDelete', function (req, res) {
    Usuario.find({}, function (error, usuario) {
        if (error) return res.status(500).send(error);
        for(var item of usuario)
        {
        item.remove(function (removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

           
        });
    }
    });
    res.json({ message: "Todos los usuario fueron Borrados" });
    });

    // Obtiene todos los usuarios
    app.get('/usuario', function (req, res) {
        Usuario.find({}, function (error, usuario) {
            if (error) return res.status(500).send(error);
            res.json(usuario);
        });
    });
    // Obtiene todos los usuario con su nombre y _id que sean gerente o administrador
    app.get('/admin', function (req, res) {
        Usuario.find({ $or: [{ usuario: "gerente" }, { usuario: "administrador" }] }, { nombre: 1, usuario: 1, mail:1}, function (error, usuario) {
            if (error) return res.status(500).send(error);
            res.json(usuario);

        });
    });

     // Obtiene todos los correos de la secretaria
     app.get('/secretarias', function (req, res) {
        Usuario.find( { usuario: "secretaria" }, { mail: 1, usuario: 1 }, function (error, usuario) {
            if (error) return res.status(500).send(error);
            res.json(usuario);

        });
    });

    // Login usuario
    app.post('/login', function (req, res) {
        Usuario.find({ mail: req.body.mail, clave: req.body.clave }, { _id: 1, usuario: 1 }, function (error, usuario) {
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
            usuario.usuario = req.body.usuario;

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