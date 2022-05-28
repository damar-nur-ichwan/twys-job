// Service name
const serviceName = 'email'

// Libraries
const { default: axios } = require('axios')
const { twys, gmail } = require('../../configs')
const { logger } = require("../../utils/utils")
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// Variables
const layer = 'access'
const { host, path, token } = twys

// GET URLS: to get all urls target
const getEmailQueue = async () => {
    
    // Try
    try {

        // Get urls
        const target = `${host}${path[serviceName]}/queue`
        const config = {
            "headers": {
                "auth-token": token
            } 
        }
        const response = await axios.get(target, config)
        const output = Object.values(response.data)
        
        // Return
        return output
    }

    // Catch
    catch (err) {
        logger.error({ layer, message: err.message })
        return false
    }

}

// GET URLS: to get all urls target
const sendEmail = (mailOptions = { to : '', subject : '', text : '' }) => {
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: gmail,
    }));

    mailOptions['from'] = 'twys@gmail.com';

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// POST DATA: to post new pofiles data 
const emailSent = async (input = []) => {
    
    // Variables
    const target = `${ host + path [serviceName] }/sent`
    const data = {
        [serviceName+'s']: input
    }

    const config = {
        "headers": {
            "auth-token": token
        } 
    }
    // Post Data
    try {
        await axios.post(target, data, config)
        return true
    } catch (err) {
        logger.error({ layer, message: err })
        return await emailSent(input)
    }
}

module.exports = {
    getEmailQueue,
    sendEmail,
    emailSent
}