// Libraries
let { logics, action } = require('../../utils/utils');
const { UpdateFile, CreateFile, ReadFile } = require('dni-file-system');

const tehnicalAnalysist = async (input = []) => {
    
    // Get input values
    const time = Object.keys(input)
    input = Object.values(input)


    // Add action every logics base
    const dataLogics = logics.map((logic) => {
        input.map((date, index) => {
            if(!date.status) date['status'] = 'Neutral'
            date['action'] = 'New'
            if(index > 0) date['action'] = action(input[index-1].status, date.status, logic)
            return date
        })
        return JSON.stringify(input)
    })

    // Variables
    const last = input[input.length -1], first = input[0]
    const code = last.code, change = last.change, 
    join_from = first.date, notification_date = last.date, price = last.price,
    volume = parseInt(last.id.replace(/,/g,''))
    let bestIncome = { code, logic: 0, total_income: 0, history: {}, win_rate: 0, total_trade: 0}

    // Get the best income & method, then build trading history
    dataLogics.map((technical, logic) => {
        technical = JSON.parse(technical)
            let total_income = 0, buyPriceList = [], avgBuyPrice = 0, stop_loss = -10, take_profit = 20, history = {}, win_rate = 0, total_trade = 0, total_win = 0
            technical.map((date, index)=>{
                date['code'] = date['code'].replace('NTX_p','CNTX')
                if(buyPriceList.length > 0) {
                    potential = (date.price / avgBuyPrice * 100) - 100
                    if(date.action === 'Sell' || potential <= stop_loss || potential >= take_profit){
                        date['action'] = 'Sell'
                        total_income += potential
                        date['income'] = parseFloat(potential.toFixed(2))
                        buyPriceList=[]
                        total_trade++
                        if(date['income'] > 0) total_win++
                        history[time[index]] = date
                    }
                }
                if(date.action === 'Buy') {
                    if(buyPriceList.length === 0) buyPriceList.push(date.price)
                    let lastPrice = buyPriceList[ buyPriceList.length - 1], sumBuyPrice = 0
                    if(buyPriceList.length > 0 && date.price < lastPrice) buyPriceList.push(date.price)
                    buyPriceList.map((nominal) => {sumBuyPrice += nominal})
                    avgBuyPrice = sumBuyPrice / buyPriceList.length
                    date['income'] = 0
                    history[time[index]] = date
                }
            })
            win_rate = parseFloat(((total_win / total_trade) * 100).toFixed(2)) || 0
            if(total_income > bestIncome.total_income) bestIncome = { code, logic, total_income, win_rate, total_trade, history }
            if(total_income === bestIncome.total_income){
                if(win_rate > bestIncome.win_rate) bestIncome = { code, logic, total_income, win_rate, total_trade,history }
                if(win_rate === bestIncome.win_rate) {
                    if(total_trade < bestIncome.total_trade){ 
                        bestIncome = { code, logic, total_income, win_rate, total_trade, history }
                    }
                }
            }
        })


    // Add Overview
    let total_trade = 0, total_win_count = 0, total_buy = 0, buy_count = 0, duration = [], firstBuy = 0,
    total_loss_count = 0, total_win = 0, total_loss = 0, total_match_count = 0, lowest_income = 100, higest_income = -100,
    buy_price = [], trading = false, tomorrow_action = 'Neutral'
    const historyTime = Object.keys(bestIncome.history)
    const nowTime = parseInt(require('../../data/time.json')['timestamp']/1000) - 21600
    Object.values(bestIncome.history).map((date, index)=>{
        if(historyTime[index] > nowTime) tomorrow_action = date.action
        switch(date.action){
            case 'Buy': {
                total_buy++
                buy_count++
                trading = true
                buy_price.push(date.price)
                if(buy_count === 1) firstBuy = historyTime[index]
                break;
            }
            case ('Sell'): {
                total_trade++
                buy_count = 0
                buy_price = []
                trading = false
                duration.push(historyTime[index] - firstBuy)
                if(date.income === 0) total_match_count++
                if(date.income > 0) { total_win_count++; total_win += date.income}
                if(date.income < 0) { total_loss_count++; total_loss += date.income}
                if(date.income < lowest_income) lowest_income = date.income
                if(date.income > higest_income) higest_income = date.income
                break;
            }
        }
    })
    if(higest_income === -100) higest_income = 0
    if(lowest_income === 100) lowest_income = 0
    bestIncome['code'] = bestIncome['code'].replace('NTX_p','CNTX')
    bestIncome['join_from'] = join_from
    bestIncome['total_market_reviewed'] = input.length
    bestIncome['total_win_count'] = total_win_count
    bestIncome['total_loss_count'] = total_loss_count
    bestIncome['total_match_count'] = total_match_count
    bestIncome['average_income'] = parseFloat((bestIncome['total_income'] / total_trade).toFixed(2)) || 0
    bestIncome['average_win_income'] = parseFloat((total_win / total_win_count).toFixed(2)) || 0
    bestIncome['average_loss_income'] = parseFloat((total_loss / total_loss_count).toFixed(2)) || 0
    bestIncome['higest_income'] = parseFloat(higest_income.toFixed(2)) || 0
    bestIncome['lowest_income'] = parseFloat(lowest_income.toFixed(2)) || 0
    bestIncome['total_income'] = parseFloat(bestIncome['total_income'].toFixed(2)) || 0
    bestIncome['avg_count_of_buy_per_trade'] =  total_trade > 0? Math.ceil(total_buy / total_trade): 0;
    bestIncome['average_trade_duration'] = Math.ceil((duration.reduce((a, b) => a + b, 0) / duration.length) / 86400000) || 0
    bestIncome['notification_date'] = notification_date
    bestIncome['volume'] = volume
    bestIncome['last_change'] = change
    bestIncome['last_price'] = price
    bestIncome['on_trading'] = trading
    bestIncome['buy_price'] = Math.ceil(buy_price.reduce((a, b) => a + b, 0) / buy_price.length) || 0
    bestIncome['income_potential'] = parseFloat((price / (buy_price.reduce((a, b) => a + b, 0) / buy_price.length) * 100 - 100).toFixed(2)) || 0
    bestIncome['tomorrow_action'] = tomorrow_action


    // Save history & overview
    await CreateFile(`./data/history/${bestIncome['code']}.json`,JSON.stringify(bestIncome.history))
    await UpdateFile(`./data/history/${bestIncome['code']}.json`,JSON.stringify(bestIncome.history))
    delete bestIncome.history
    await CreateFile(`./data/overview/${bestIncome['code']}.json`,JSON.stringify(bestIncome))
    await UpdateFile(`./data/overview/${bestIncome['code']}.json`,JSON.stringify(bestIncome))
}


const financialAnalysist = async (input = []) => {

    // Variables
    const code = input.code
    const param = {
        EPS : "EPS(MRQ) vs Qtr. 1 Yr. Ago MRQ",
        PER : "P/E Ratio TTM",
        PBV: "Price to Book MRQ",
        ROE: "Return on Equity TTM",
        DER: "Total Debt to Equity MRQ",
        DY: "Dividend Yield ANN"
    }

    let EPS = false, PER = false, PBV = false, ROE = false, DER = false, DY = false, rate = [0,0,0,0,0,0], financial_rate = 0
    input.ratios.map(({name, company, industry}) =>{
        company = parseFloat(company)
        industry = parseFloat(industry)
        if(name === param['EPS'] && company > 0) {EPS = true, rate[0] = 1}
        if(name === param['PER'] && company < industry) {PER = true, rate[1] = 1}
        if(name === param['PBV'] && company < industry) {PBV = true, rate[2] = 1}
        if(name === param['ROE'] && company > industry) {ROE = true, rate[3] = 1}
        if(name === param['DER'] && company < 100) {DER = true, rate[4] = 1}
        if(name === param['DY'] && company > 0) {DY = true, rate[5] = 1}
    })
    rate.map((score) => financial_rate += score)

    // Get Last Overview & update, then save it
    let overview = await ReadFile(`./data/overview/${code}.json`)
    overview = JSON.parse(overview)
    overview['financial_rate'] = financial_rate
    overview['financial_detail'] = {EPS, PER, PBV, ROE, DER, DY}
    await CreateFile(`./data/overview/${code}.json`,JSON.stringify(overview))
    await UpdateFile(`./data/overview/${code}.json`,JSON.stringify(overview))
}

module.exports = {
    tehnicalAnalysist,
    financialAnalysist
}