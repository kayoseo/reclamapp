const nodemailer = require('nodemailer');
//const xoauth2 = require('xoauth2');
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

var mailOptions = {
    from: 'Reclamo Sercolex<reclamo.sercolex@gmail.com>',
    to: 'juan.hahn@mail.udp.cl',
    subject: 'prueba',
    text: 'Solo queria ser popular :('
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log(err);
    } else {
        console.log('Email Sent');
    }
})
