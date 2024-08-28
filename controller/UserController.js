const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const wt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secret = process.env.SECRET;

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service:'gmail',
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});


const signup = async (req, resp) => {
    //console.log(req.body);
    try {


        const existingUser = await UserSchema.findOne({email: req.body.email});

        if (existingUser) {
            return resp.status(400).json({'message': 'user already exists'});
        }


        const hash = await bcrypt.hash(req.body.password, 10);


        let userSchema = new UserSchema({
            email: req.body.email,
            password: hash,
            fullName: req.body.fullName
        });

        await userSchema.save();

        const mailOption={
            from:process.env.EMAIL_USER,
            to:req.body.email,
            subject:'Account creation',
            html:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>

  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->

  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->

  <!-- Your title goes here -->
  <title>Information Belle & Sebastian</title>
  <!-- End title -->

  <!-- Start stylesheet -->
  <style type="text/css">
    a,
    a[href],
    a:hover,
    a:link,
    a:visited {
      /* This is the link colour */
      text-decoration: none !important;
      color: #0000EE;
    }

    .link {
      text-decoration: underline !important;
    }

    p,
    p:visited {
      /* Fallback paragraph style */
      font-size: 15px;
      line-height: 24px;
      font-family: 'Helvetica', Arial, sans-serif;
      font-weight: 300;
      text-decoration: none;
      color: #000000;
    }
<h1 style="text-align:left">This is heading 1</h2>
<h2 style="text-align:left">This is heading 2</h2>
<h3 style="text-align:right">This is heading 3</h3>
<h4 style="text-align:justify">This is heading 4</h4>
  </style>
  <!-- End stylesheet -->

</head>

<!-- You can change background colour here -->

<body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000" align="center">

  <!-- Start container for logo -->
  <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
    <tbody>
      <tr>
        <td style="width: 596px; vertical-align: top; padding-left: 0; padding-right: 0; padding-top: 15px; padding-bottom: 15px;" width="596">

          <!-- Your logo is here -->
          <img style="text-align: center; color: #ffffff;" alt="Logo" src="https://usercontent.one/wp/www.showsecurity.se/wp-content/uploads/2018/11/logo-show-security.png" align="center">

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End container for logo -->

  <!-- Hero image -->
  <img style="width: 600px; max-width: 600px; text-align: center;" alt="Hero image" src="https://cirkus.se/wp-content/uploads/2024/03/Belle-and-Sebastian_Cirkus_1800x1280.jpg" align="center" width="600" height="350">
  <!-- Hero image -->

  <!-- Start single column section -->
  <table align="center" style="text-align: left; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
    <tbody>
      <tr>
        <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">

          <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">Belle And Sebastian</h1>

          <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis ante sed imperdiet euismod. Vivamus fermentum bibendum turpis, et tempor dui. Sed vitae lectus egestas, finibus purus ac, rutrum mauris.</p>

          <!-- Start button (You can change the background colour by the hex code below) -->
          <a href="#" target="_blank" style="background-color: #000000; font-size: 15px; line-height: 22px; font-family: 'Helvetica', Arial, sans-serif; font-weight: normal; text-decoration: none; padding: 12px 15px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;">
            <!--[if mso]>
                  <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
                <![endif]-->

            <span style="mso-text-raise: 15pt; color: #ffffff;">Klicka för att läsa mer om Belle & Sebastian</span>
            <!--[if mso]>
                  <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
                <![endif]-->
          </a>
          <!-- End button here -->

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End single column section -->

  <!-- Start image -->
  <img style="width: 600px; max-width: 600px; height: 240px; max-height: 240px; text-align: "left" alt="Image" src="https://fullsphere.co.uk/misc/free-template/images/image-2.jpg" align="center" width="600" height="240">
  <!-- End image -->

  <!-- Start heading for double column section -->
  <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
    <tbody>
      <tr>
        <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 0;" width="596">

          <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000; margin-bottom: 0;">Information Belle and Sebastian</h1>

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End heading for double column section -->

  <!-- Start double column section -->
  <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
    <tbody>
      <tr>
        <td style="width: 252px; vertical-align: top; padding-left: 30px; padding-right: 15px; padding-top: 0; padding-bottom: 30px; text-align: left;" width="252">
          <h1>Kund</h1>
          <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;" 
            <br>
            Arrangör<br>
            LUGER<br>
            <br>
            https://www.livenation.se/<br>
            <br>
            Production manager<br>
            Fredrik<br>
            <br>

          </p>

        </td>

        <td style="width: 252px; vertical-align: top; padding-left: 15px; padding-right: 30px; padding-top: 0; padding-bottom: 30px; text-align: left;" width="252">
           <h1>Tider</h1>
            <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;"> 
            15:00 Soundcheck (med publik)<br>
            17:15 Samling i Ernst Rolf<br>
            17:30 Foajé och biljettkassa öppnar <br>
            19:15 ca Dörrar in till salongen<br>
            20:00-22:00 Belle & Sebastian<br>
            21:45 Stage hands samlas <br>
            22:00 Utlast påbörjas<br>
            22:00 Tömning av salongen<br>
            22:15 Riva kravall<br>
            22:30 ca Cirkus tomt på gäster<br>
            23:30 Kravallen hämtas<br>
            01:00 Venue & Dressing room curfew<br>
            <br>
            Efterfest - TBA<br>
            Meet & Greet - sker vid sound check<br>
            Merch - TBA<br>
          </p>

        </td>
      </tr>
    </tbody>
  </table>
  <!-- End double column section -->



  <!-- Start footer -->
  <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #000000;" width="600">
    <tbody>
      <tr>
        <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;" width="596">

          
  <!-- End footer -->

  </div>

</body>

</html>`
        }

        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log('email sent')
            }
        });

        resp.status(201).json({'message': 'user saved'});

    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }

}
const login = async (req, resp) => {
    //console.log(req.body);
    try {

        const existingUser = await UserSchema.findOne({email: req.body.email});

        if (!existingUser) {
            return resp.status(404).json({'message': 'user not found'});
        }

        const isConfirmed = await bcrypt.compare(req.body.password, existingUser.password);

        if (!isConfirmed) {
            return resp.status(401).json({'message': 'password is wrong...'});
        }

        const token = wt.sign({userId: existingUser._id, email: existingUser.email, fullName: existingUser.fullName},
            secret,
            {expiresIn: '5h'});


        resp.status(200).json({'token': token, 'message': 'user logged...'})

    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }

}
module.exports = {signup, login}