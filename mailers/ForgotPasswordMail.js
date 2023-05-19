const transporter = require('../config/nodeMailer');

module.exports.sendMail = async (data) => {
    var mailOptions = {
        from: process.env.MAIL_FROM,
        to: data.email,
        subject: data.subject,
        template: 'forgotPassword', // the name of the template file i.e email.handlebars
        context: {
            url: data.url
        }
    };

    // trigger the sending of the E-mail
    await transporter.sendMail(mailOptions);
}