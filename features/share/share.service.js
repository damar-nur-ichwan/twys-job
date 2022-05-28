// Service Name
const serviceName = 'share'

const { numberWithCommas } = require('../../utils/utils')
// Libraries
const { Discord } = require('./share.access')

const service = async () => {

    // Get Codes
    let urls = require(`../../data/urls.json`)

    // Loop
    for(let index = 0; index < urls.length; index++){
        
        // Get code
        const { code } = urls[index]
        
        // Get overview
        const overview = require(`../../data/overview/${code}.json`)

        if(
            (
            (overview.tomorrow_action === 'Sell' && overview.total_trade > 5) || 
            (overview.tomorrow_action === 'Buy' && overview.total_trade >= 5)
            ) && overview.win_rate > 50 && overview.financial_rate > 3
            && overview.volume > 5000000){
            let content = ''
            content += `\n*******************`
            content += `\ncode: ${overview.code}`
            content += `\njoin_from: ${overview.join_from}`
            content += `\nfinancial_rate: ${overview.financial_rate}/6 stars`
            content += `\nstrategy_code: ${overview.logic}`
            content += `\ntotal_trade: ${overview.total_trade} trades`
            content += `\naverage_income: ${overview.average_income}%`
            content += `\nwin_rate: ${overview.win_rate}%`
            content += `\naverage_trade_duration: ${overview.average_trade_duration} days`
            content += `\naverage_count_of_buy_per_trade: ${overview.avg_count_of_buy_per_trade} buys`
            content += `\nnotification_date: ${overview.notification_date}`
            content += `\nvolume: ${numberWithCommas(overview.volume)}`
            content += `\nlast_change: ${overview.last_change}%`
            content += `\nlast_price: ${numberWithCommas(overview.last_price)}`
            content += `\non_trading: ${overview.on_trading}`
            content += `\nbuy_price: ${numberWithCommas(overview.buy_price)}`
            content += `\nincome_potential: ${overview.income_potential}%`
            content += `\ntomorrow_action: ${overview.tomorrow_action}`
            content += `\n###################`
            
            Discord(content)
            console.log(content)
        }
    }
}

module.exports = service

