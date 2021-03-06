const { time } = require("../../utils/utils")

// Service Name
const serviceName = 'technical'

// Libraries
const { getUrls, getElements, postData } = require(`./${serviceName}.access`)
const { scrape, checkVolume } = require(`./${serviceName}.component`)

const service = async (analysist = async function(){}, share = async function(){}) => {

    // checking 
    const check = await checkVolume()
    if(!check){
        console.info(`${serviceName} already updated`)
        return false
    }

    // Info
    console.info(`${serviceName} service running`)

    // Get All Url
    const urls = await getUrls()

    // Get Time
    const timestamp = parseInt(time()['timestamp'] / 1000)

    // Define Output
    let output = []

    // Loop
    for(let i = 0; i < urls.length; i++){

        // Define Target
        const { investing, code } = urls[i]

        // Get http element
        const elements = await getElements(investing)

        // Scrape
        const data = {code, data: {[timestamp]: scrape(elements, code)}}

        // Push to Output
        output.push(data)

        // Info
        console.info(i, `${code} ${serviceName} scraped`)

        // if i +1 % 50 or i === url length - 1
        if((i + 1) % 50 === 0 || i === urls.length - 1){
            
            // POST to twys
            await postData(output)

            // Info
            console.info(`${serviceName} updated`)

            // Reset output
            output = []
        }
    }
    await analysist()
    await share()
    return true
}

module.exports = service