// Libraries
const { default: axios } = require('axios')
const { ReadFile, CreateFile, UpdateFile } = require('dni-file-system')
const { twys } = require('../../configs')
const { logger } = require("../../utils/utils")

// Variables
const layer = 'access'
const { host, path, token } = twys

// download technical: to get all technicals target
const downloadTechnical = async () => {
    
    // Try
    try {

        // Get technical
        const target = `${host}${path.technical}`
        const config = {
            "headers": {
                "auth-token": token
            } 
        }
        let technicals = await axios.get(target, config)
        technicals = technicals.data ? Object.values(technicals.data) : [];

        // save
        technicals.map( async ({code, data}) => {
            
            // // save urls
            await CreateFile(`./data/technical/${code}.json`,JSON.stringify(data))
            await UpdateFile(`./data/technical/${code}.json`,JSON.stringify(data))

        })

        // Return
        return true
    }

    // Catch
    catch (err) {
        logger.error({ layer, message: err })
        await downloadTechnical()
        return false
    }

}


// GET URLS: to get all urls target
const getUrls = async () => {
    
    // Try
    try {

        // Get urls
        let urls = await ReadFile(`./data/urls.json`)

        // Return
        return JSON.parse(urls)
    }

    // Catch
    catch (err) {
        logger.error({ layer, message: err })
        return await getUrls()
    }

}


// Get Technicals
const getTechnical = async (code ='') => {

    // try
    try {
        // Get Technical
        const technical = await ReadFile(`./data/technical/${code}.json`)

        // Return
        return JSON.parse(technical)
    }

    // Catch
    catch (err) {
        logger.error({ layer, message: err })
        return false
    }
}

// Get Ratio
const getRatio = async (code ='') => {

    // try
    try {
        // Get Technical
        const technical = await ReadFile(`./data/ratio/${code}.json`)

        // Return
        return JSON.parse(technical)
    }

    // Catch
    catch (err) {
        logger.error({ layer, message: err })
        return false
    }
}

// POST DATA: to post new pofiles data 
const postData = async (targetPath = '', input = []) => {

    // Variables
    const target = `${ host + path[targetPath]}`

    const data = {
        [targetPath]: input
    }

    const config = {
        "headers": {
            "auth-token": token
        } 
    }

    // Post Data
    try {
        if(input.length > 0) await axios.post(target, data, config)
        return true
    } catch (err) {
        logger.error({ layer, message: err })
        return await postData(targetPath, input)
    }
}

module.exports = {
    getUrls,
    getTechnical,
    getRatio,
    downloadTechnical,
    postData
}