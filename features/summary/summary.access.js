// Service name
const serviceName = 'summary'

// Libraries
const { default: axios } = require('axios')
const { ReadFile, CreateFile } = require('dni-file-system')
const { twys } = require('../../configs')
const { logger } = require("../../utils/utils")

// Variables
const layer = 'access'
const { host, path, token } = twys

// GET URLS: to get all urls target
const getUrls = async () => {
    
    // Try
    try {

        // Get urls
        const target = `${host}/api/data/url`
        const config = {
            "headers": {
                "auth-token": token
            } 
        }
        const urls = await axios.get(target, config)

        // save urls
        await CreateFile(`./data/urls.json`,JSON.stringify(urls.data))
        await UpdateFile(`./data/urls.json`,JSON.stringify(urls.data))

        // Return
        return urls.data
    }

    // Catch
    catch (err) {
        logger.error({ layer, message: err })
        return await getUrls()
    }

}


// GET ELEMENTS: to get http elements
const getElements = async (url = '') => {

    // Try
    try {
        
        // Get urls
        const elements = await axios.get(`${url}-financial-summary`)
     
        // Return
        return elements.data
    }

    // Catch
    catch (err) {

        // Retry
        logger.error({ layer, message: err })
        return await getElements(url)
    }
}

// POST DATA: to post new pofiles data 
const postData = async (input = []) => {
    
    // Variables
    const target = `${ host + path [serviceName] }`
    
    const data = {
        [serviceName]: input
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
        return await postData(input)
    }
}

module.exports = {
    getUrls,
    getElements,
    postData
}