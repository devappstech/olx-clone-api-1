const nodemailer = require('nodemailer');

exports.sendEmailLink = (clientEmail, urlLink) => {
  nodemailer.createTestAccount(() => {
       // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'akash@improwised.com',
        pass: '**********'
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'akash@improwised.com', // sender address
      to: clientEmail, // list of receivers
      subject: 'OlxClone - Reset Password', // Subject line
      text: 'Click on Link to Reset Password', // plain text body
      html: '<b>click on this link:</b>'
        + '<h2><a href=' + urlLink + '>Click Here</a></h2>'
        + '<br/><br/>'
        + '<p>Make sure you set new Password with in 3 days from you requested for new Password'// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return error;
      }
    });
  });
}
