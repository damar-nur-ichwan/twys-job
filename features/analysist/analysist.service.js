const { getTechnical, getRatio, downloadTechnical, postData } = require("./analysist.access")
const { tehnicalAnalysist, financialAnalysist } = require("./analysist.component")

// Service Name
const serviceName = 'analysist'

// Libraries
const { getUrls } = require(`./${serviceName}.access`)

const service = async () => {

    // Get All Technicals
    await downloadTechnical()
    console.info(`All technicals downloaded`)

    // Get Codes
    const codes = await getUrls()

    // Loop
    console.info(`Analyzing...`)
    for(let i = 0; i < codes.length; i++){

        // Variables
        const { code } = codes[i]
    
        // Get technical
        const technical = await getTechnical(code)

        // Tehnical analysist
        await tehnicalAnalysist(technical, code)

        // Get ratio
        const ratio = await getRatio(code)
       
        // Financial analysist
        await financialAnalysist(ratio, code)
    }
    console.info(`Analysist done`)

    // Saving
    let histories = [], overviews = []
    for(let i = 0; i < codes.length; i++){
        
        // Variables
        const { code } = codes[i]
        const history = require(`../../data/history/${code}.json`)
        const overview = require(`../../data/overview/${code}.json`)

        histories.push({code, data: history})
        overviews.push({code, data: overview})

        // if i +1 % 15 or i === url length - 1
        if((i + 1) % 15 === 0 || i === codes.length - 1){
            await postData('history',histories)
            await postData('overview',overviews)
            histories = []
            overviews = []
        }
    }
    console.info(`history & overview updated`)
}

module.exports = service