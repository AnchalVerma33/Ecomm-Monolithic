const nodemailer = require("nodemailer");

class SendEmail{
    constructor() {
        this.transporter = this.CreateTransporter();
    }

    CreateTransport(){
        return new Promise(async(resolve,reject) => {
            try{
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: 'your-email@gmail.com',
                      pass: 'your-password',
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
                    from: 'your-email@gmail.com',
                    to: 'recipient-email@example.com',
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