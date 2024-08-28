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
console.log(transporter);

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
            text:`account was created........ thank you...`
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