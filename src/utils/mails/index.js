const nodemailer = require("nodemailer");
const { EMAIL_PASS } = require("../../config")

class SendEmail{
    constructor() {
        return new Promise(async(resolve,reject) => {
            this.transporter = await this.CreateTransporter();
            resolve(this.transporter);
        }) 
    }

    CreateTransporter(){
        return new Promise(async(resolve,reject) => {
            try{
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: 'vanchal964@gmail.com',
                      pass: EMAIL_PASS,
                    },
                  });
                  resolve(transporter);
            }catch(e) {
                reject(`Error while creating transported ${e}`);
            }
        });
    }

    // mailOptions(message){
    //     try{
    //         const mailFormat = {
    //             from: 'your-email@gmail.com',
    //             to: 'recipient-email@example.com',
    //             subject: 'Welcome to our Shopping App - Account Verification',
    //             text: message,
    //         }
    //         return mailFormat;
    //     }catch(e) {
    //         throw new Error(`Mail Format not defined ${e}`);
    //     }
    // }

    sendEmail(message){
        return new Promise(async(resolve,reject) => {
            try{
                const mailFormat = {
                    from: 'vanchal965@gmail.com',
                    to: 'workav33@gmail.com',
                    subject: 'Welcome to our Shopping App - Account Verification',
                    text: message,
                }
                const info = await this.transporter.sendMail(mailFormat);
                resolve(info);
            }catch (e) {
                reject(e);
            }
        });
    }
}


// const mailOptions = (message) => {
//     try{
//         const mailFormat = {
//             from: 'your-email@gmail.com',
//             to: 'recipient-email@example.com',
//             subject: 'Welcome to our Shopping App - Account Verification',
//             text: message,
//         }
//         return mailFormat;
//     }catch(e) {
//         throw new Error(`Mail Format not defined ${e}`);
//     }
// }

// const sendEmail = async () => {
//     try {
//       const transporter = new SendEmail();
//       const info = await transporter.sendMail(transporter.mailOptions("hello"));
//       console.log('Email sent:', info.response);
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };



module.exports = SendEmail;