const dividend = require('./dividend/dividend.service')
const profile = require('./profile/profile.service')
const ratio = require('./ratio/ratio.service')
const summary = require('./summary/summary.service')
const technical = require('./technical/technical.service')
const email = require('./email/email.service')
const analysist = require('./analysist/analysist.service')
const share = require('./share/share.service')
const { time } = require('../utils/utils')

const job = () => {
    setInterval(() => {
        const { hours, minutes, seconds } = time()
        if(hours >= 7 && hours <= 23) email()
        if(minutes === 30 && seconds < 15) {
            switch(hours){
                case 12: profile(); break;
                case 13: summary(); break;
                case 14: dividend(); break;
                case 15: ratio(); break;
                case 16: technical(analysist, share); break;
            }
        }
    }, 15 * 1000)
}
module.exports = job
