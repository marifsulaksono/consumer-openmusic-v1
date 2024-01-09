const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: 'Open Music App',
            to: targetEmail,
            subject: 'Ekspor Playlist',
            text: 'Lampiran hasil dari ekspor playlist',
            attachments: [
                {
                    filename: `playlist.json`,
                    content
                }
            ]
        }

        return this._transporter.sendEmail(message)
    }
}

module.exports = MailService