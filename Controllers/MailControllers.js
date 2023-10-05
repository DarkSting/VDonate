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


//campaign mail generator
const campaignMail = async(req,res,next) =>{

    

    const sender = 'akashgeethanjana320@gmail.com';
    const {
        receivers,
        title,
        location,
        endTime,
        startTime,
        organizedBy

    
    } = req.body;

  

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
            greeting: 'Dear Donor',
            title:title,
            intro:intro,
            action: [
                {
                    instructions: ['As your per request we have decided to assign you to the following blood donation campaign.',
                    `<b>Location</b> ${location}`,
                    `<b>Started at</b> ${startTime}`,
                    `<b>End at</b> ${endTime}`,
                    `<b>Organized By</b> ${organizedBy}`
                ],
                    
                }]
            ,outro:['We are hoping your attendence for the following campaign, We are appreciate your contribution. Thank You!']
        }
    }

    let mail = mailGenerator.generate(response);

    let message = {
        from :sender,
        to:receivers,
        subject:'You have been assigned to a donation campaign',
        html:mail
    }

    await transporter.sendMail(message).then(()=>{

        next();

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

module.exports = {sendmail,sendmailwithfile,sendmailInternal,campaignMail };



