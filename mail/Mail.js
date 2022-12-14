const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secureConnection: true,
    auth: {
        // user: "matheus.tomazi5@gmail.com",
        // pass: 
    },
    tls: {
        ciphers: 'SSLv3'
    }
})

const Mail = function (email,text){
    transporter.sendMail({
        from: "Suporte EmprestaAi <matheus.tomazi5@gmail.com>",
        to: email,
        subject: "Recuperação de Senha",
        text: text
    }).then( msg => {
        console.log("hello friends")
        console.log(msg)
    }).catch( err => {
        console.log("byebye fries")
        console.log(err)
    })
}
// Mail()
module.exports = Mail;