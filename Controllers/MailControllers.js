const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');



//iternal mail endpoint
const sendmailInternal = async(

        receiver,
        subject,
        title,
        intro,
        buttontxt,
        instructions

) =>{


    const sender = 'akashgeethanjana320@gmail.com';
 

    

    let config = {
        service :'gmail',
        auth:{
            user:sender,
            pass:process.env.MAIL_PASSWORD,

        }
    }

    let transporter = nodemailer.createTransport(config);
   
    let mailGenerator = new Mailgen({
        theme:"salted",
        product:{
            name:"VDonate",
            link:"https://mailgen.js/",
            copyright:`Copyright © ${2023}  VDonate. All rights reserved`,
         
        }
    })

    let response = {
        body:{
            title:title,
            intro:intro,
            action: [
                {
                    instructions: instructions,
                    button: {
                        color: '#22BC66',
                        text: buttontxt,
                        
                    }
                }]
        }
    }

    let mail = mailGenerator.generate(response);

    let message = {
        from :sender,
        to:receiver,
        subject:subject,
        html:mail
    }

    await transporter.sendMail(message).then(()=>{

       return true;
    }).catch(error=>{
        return false;
    })



}

//mail endpoint to send mails with qr code
const sendmail = async(req,res) =>{

    

    const sender = 'akashgeethanjana320@gmail.com';
    const {
        receiver,
        subject,
        title,
        intro,
        buttontxt,
        instructions

    
    } = req.body;

  

    const qr = `http://api.qrserver.com/v1/create-qr-code/?data=${req.body.code}!&size=250x250&bgcolor=ffffff`

    let config = {
        service :'gmail',
        auth:{
            user:sender,
            pass:process.env.MAIL_PASSWORD,

        }
    }

    let transporter = nodemailer.createTransport(config);

    let mailGenerator = new Mailgen({
        theme:"salted",
        product:{
            name:"VDonate",
            link:"https://mailgen.js/",
            copyright:`Copyright © ${2023}  VDonate. All rights reserved`
        }
    })

    let response = {
        body:{
            title:title,
            intro:intro,
            action: [
                {
                    instructions: instructions,
                    button: {
                        color: '#22BC66',
                        text: buttontxt,
                        link: qr
                    }
                }]
        }
    }

    let mail = mailGenerator.generate(response);

    let message = {
        from :sender,
        to:receiver,
        subject:subject,
        html:mail
    }

    await transporter.sendMail(message).then(()=>{

        return res.status(201).json({
            msg:"you should receive an email"
        });
    }).catch(error=>{
        return res.status(500).json({error});
    })



}

const sendmailwithfile = async(req,res)=>{

    const sender = 'akashgeethanjana320@gmail.com';
    const receiver = req.body.receiver;

    let config = {
        service :'gmail',
        auth:{
            user:sender,
            pass:process.env.MAIL_PASSWORD,

        }
    }

    let transporter = nodemailer.createTransport(config);

    let mailGenerator = new Mailgen({
        theme:"salted",
        product:{
            name:"VDonate",
            link:"https://mailgen.js/",
            copyright:`Copyright © ${2023}  VDonate. All rights reserved`
        }
    })

    let response = {
        body:{
            title:req.body.title,
            intro: req.body.intro,
            action: [
                {
                    instructions: req.body.instructions,
                    button: {
                        color: req.body.buttoncolor,
                        text: req.body.buttontxt,
                        link: req.body.buttonlink
                    }
                }]
        }
    }

    let mail = mailGenerator.generate(response);

    let message = {
        from :sender,
        to:receiver,
        cc:req.body.cc,
        subject:req.body.subject,
        html:mail,
        attachments:[
            
                req.body.attacheddata
            
        ]
    }

    await transporter.sendMail(message).then(()=>{

        return res.status(201).json({
            msg:"you should receive a msg",code:200
        });
    }).catch(error=>{
        return res.status(500).json({msg:"unable to send mail",code:500});
    })


}

module.exports = {sendmail,sendmailwithfile,sendmailInternal };



