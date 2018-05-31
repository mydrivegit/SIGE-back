import Email from '../models/email'
import sgMail from '@sendgrid/mail'
import fs from 'fs'
import Hogan from 'hogan.js'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

let template = fs.readFileSync('./view/generalmail.hjs', 'utf-8')
let compiledTemplate = Hogan.compile(template)

let emailGet = (req, res) => {
  // req.body.email = 'hasana.ali@gmail.com'
  // req.body.content = 'this my email'
  // req.body.title = 'this my email'

  let msg = {
    to: req.body.emails,
    from: 'contact@shaik.com',
    subject: req.body.title,
    html: compiledTemplate.render({ message: req.body.content })
  }
  sgMail.send(msg, (err, json) => {
    if (err) res.send('Error will sending email')
    else {
      res.send('Email Send')
      let email = new Email({
        title: req.body.title,
        content: req.body.content,
        emails: req.body.emails,
        sendTime: Date.now()
        // senderId: req.userData.userId
      })
      email.save()
        .then(res.send({
          success: true,
          message: 'Email is saved in send item /Email Send'
        }))
        .catch((err) => {
          res.send(err.message)
        })
    }
  })
}

export default { emailGet }
// .then(res.send({
//   success: true,
//   message: 'Email is saved in send item /Email Send'
// }))
// .catch((err) => {
//   res.send(err.message)
// })
