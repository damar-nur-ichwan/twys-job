// Service Name
const serviceName = 'email'

const service = require(`./${serviceName}.service`)
const { time, logger } = require('../../utils/utils')

// Variables
const layer = 'job'

const job = async () => {

    // Info
    logger.info({layer, message: `${serviceName} jobs running`})

    // 1 hour jobs
    setInterval(async () => {

        // Get Hour
        const myTime = await time()
        const { hours } = myTime

        // Run service
        if(hours > 6) service()

    // Interval 1 hour
    }, 15 * 1000)
}

module.exports = job