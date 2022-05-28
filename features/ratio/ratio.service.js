const { CreateFile, UpdateFile } = require("dni-file-system")

// Service Name
const serviceName = 'ratio'

// Libraries
const { getUrls, getElements, postData } = require(`./${serviceName}.access`)
const { scrape } = require(`./${serviceName}.component`)

const service = async () => {

    // Info
    console.info('Service running')

    // Get All Url
    const urls = await getUrls()

    // Define Output
    let output = []

    // Loop
    for(let i = 0; i < urls.length; i++){

        // Define Target
        const { investing, code } = urls[i]

        // Get http element
        const elements = await getElements(investing)

        // Scrape
        const data = scrape(elements, code)

        // Push to Output
        output.push(await data)

        // Info
        console.info(i, `${code} ${serviceName} scraped`)

        // if i +1 % 50 or i === url length - 1
        if((i + 1) % 15 === 0 || i === urls.length - 1){
            
            // POST to twys
            await postData(output)

            // Info
            console.info(`${serviceName} updated`)

            // Reset output
            output = []
        }

        // Save data
        await CreateFile(`./data/${serviceName}/${code}.json`,JSON.stringify(await data))
        await UpdateFile(`./data/${serviceName}/${code}.json`,JSON.stringify(await data))
    }
}

module.exports = service