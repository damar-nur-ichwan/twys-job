const { getEmailQueue, sendEmail, emailSent } = require("./email.access")

const service = async () => {
    // Variables
    let output = []
    
    // Get Email Queue
    const emails = await getEmailQueue()
    
    // send Email one by one
    for(let index = 0; index < emails.length; index++){
        let {to, subject, text} = emails[index]
        text = text.replace(/---/g,'\n\n\n').replace(/--/g,'\n\n').replace(/-TWYS/g,'\nTWYS')
        sendEmail({to, subject, text})

        // post to Email Sent
        output.push(emails[index])
        // if i +1 % 50 or i === url length - 1
        if((index + 1) % 50 === 0 || index === emails.length - 1){
            
            // POST to twys
            await emailSent(output)

            // Info
            console.info('Email Sender:',output.length,'email(s) was sent')

            // Reset output
            output = []
        }
    }
    return true
}

module.exports = service