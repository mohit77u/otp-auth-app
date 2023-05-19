const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// initialize nodemailer
const transporter = nodemailer.createTransport(
    {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/emails/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/emails/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


module.exports = transporter;