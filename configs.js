require('dotenv').config()

const twys = {
    "host": process.env.TWYS_HOST || 'http://localhost:3000',
    "token": process.env.TWYS_TOKEN,
    "path": {
        "profile": '/api/data/profile',
        "dividend": '/api/data/dividend',
        "history": '/api/data/history',
        "overview": '/api/data/overview',
        "ratio": '/api/data/ratio',
        "summary": '/api/data/summary',
        "technical": '/api/data/technical',
        "email": '/api/data/email'
    }
}

const gmail = {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
}


module.exports = {
    twys,
    gmail
}
