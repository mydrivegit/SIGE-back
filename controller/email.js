import nodemailer from 'nodemailer'
import Email from '../models/email'
import fs from 'fs'
import Hogan from 'hogan.js'

let template = fs.readFileSync('./view/generalmail.hjs', 'utf-8')
let compiledTemplate = Hogan.compile(template)
// GMail Authentification
let username = process.env.USERNAME
let password = process.env.PASSWORD
// SendGrid Authentification
// let username = 'apikey'
// let password = process.env.SENDGRID_API_KEY
// Create reusable transport method (opens pool of SMTP connections)
let smtpTransport = nodemailer.createTransport({
  // host: 'smtp.sendgrid.net',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: username,
    pass: password
  },
  tls: {
    rejectUnauthorized: false
  }
})
let emailGet = (req, res) => {
// Let get the memberEmails you want to send email to
  let memberEmails = req.body.emails
  // Loop through your memberEmails
  memberEmails.forEach((email) => {
  // Setup the message
    let mailOptions = {
      from: '"Alihasana" <no-reply@shaik.fr>',
      to: email,
      subject: req.body.title,
      html: compiledTemplate.render({ message: req.body.content })
    }
    // Send mail
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        res.send('Error while sending email')
      } else {
        console.log('Message sent: ' + info.messageId)
        let email = new Email({
          title: req.body.title,
          content: req.body.content,
          emails: info.accepted,
          sendTime: Date.now(),
          senderId: req.userData.userId
        })
        email.save()
          .then(res
            .send({
              success: true,
              message: 'Email is saved in send item /Email Send'
            })
          )
          .catch((err) => {
            res.send(err.message)
            console.log(err)
          })
        res.redirect('/success')
      }
    })
  })
}

export default { emailGet }
