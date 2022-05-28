const dividend = require('./dividend/dividend.job')
const profile = require('./profile/profile.job')
const ratio = require('./ratio/ratio.job')
const summary = require('./summary/summary.job')
const technical = require('./technical/technical.job')
const email = require('./email/email.job')
const analysist = require('./analysist/analysist.service')
const share = require('./share/share.service')
const time = require('../utils/time/time.util')

const job = async () => {
    await time()
    dividend()
    profile()
    ratio()
    summary()
    technical(analysist, share)
    email()
}

module.exports = job
