const dividend = require('./dividend/dividend.service')
const profile = require('./profile/profile.service')
const ratio = require('./ratio/ratio.service')
const summary = require('./summary/summary.service')
const technical = require('./technical/technical.service')
const email = require('./email/email.service')
const analysist = require('./analysist/analysist.service')
const share = require('./share/share.service')
const time = require('../utils/time/time.util')

const job = async () => {
    await time()
    setInterval( async () => {        
        const { hours, minutes, seconds } = await time()
        if(hours >= 7) email()
        if(hours === 12 && minutes === 30 && seconds < 15) profile()
        if(hours === 13 && minutes === 30 && seconds < 15) summary()
        if(hours === 14 && minutes === 30 && seconds < 15) dividend()
        if(hours === 15 && minutes === 30 && seconds < 15) ratio()
        if(hours === 16 && minutes === 30 && seconds < 15) technical(analysist, share)
    }, 15 * 1000)
}

module.exports = job
