// Service Name
const serviceName = 'technical'

const { service_hour } = require('../../configs')
const service = require(`./${serviceName}.service`)
const { logger } = require('../../utils/utils')

// Variables
const layer = 'job'
const run_hour = service_hour[`${serviceName}_hour`]

const job = async (analysist = async function(){}, share = async function(){}) => {

    // Info
    logger.info({layer, message: `${serviceName} jobs running`})

    // 1 hour jobs
    setInterval(async () => {

        // Info
        logger.info({layer, message: `${serviceName} jobs running`})

        // Get Hour
        const { hours } = require('../../data/time.json')

        // Run service
        if(hours === run_hour) {
            await service()
            await analysist()
            await share()
        }

    // Interval 1 hour
    }, 60 * 60 * 1000)
}

module.exports = job