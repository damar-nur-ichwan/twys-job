const { getOldList, getNewList, getAvatar, getInvesting, checkInvesting, postTrueUrl, postFalseUrl } = require("./url.access")
const { scrapeList, findNewCodes, scrapeAvatar, scrapeInvesting, scrapeCode } = require("./url.component")

// Service Name
const serviceName = 'url'

const service = async () => {
    
    // Info
    console.info(`${serviceName} service running`)

    // Variables
    let elements = '', trueList = [], falseList = []

    // Get Old List
    const oldList = await getOldList()

    // Get New List
    elements = await getNewList()
    const newList = scrapeList(elements)

    // Get New Codes
    const newCodes = findNewCodes(oldList, newList)
    console.log(newCodes)
    // loop
    for(let i = 0; i < newCodes.length; i++){
        const code = newCodes[i]['code']

        // Get Avatar
        const avatar = await getAvatar(code)
        newCodes[i]['avatar'] = scrapeAvatar(avatar)

        // Get Investing
        const investing = await getInvesting(code)
        newCodes[i]['investing'] = scrapeInvesting(investing)

        // Check Investing
        elements = await checkInvesting(scrapeInvesting(investing))
        const codeFound = scrapeCode(elements)
        const check  = code === codeFound
        
        if(check){
            trueList.push(newCodes[i])
        } else {
            falseList.push(newCodes[i])
        }

    }
    await postTrueUrl(trueList)
    await postFalseUrl(falseList)
    console.info('url updated')
}

module.exports = service