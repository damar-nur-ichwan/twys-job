const cheerio = require('cheerio');

const scrapeList = (elements = '') => {

    let $ = cheerio.load(elements), code = [], output = []

    $('.entry-content').each(function (i, e) {
        value = $(e).first().text().split(`\n`);
        value.map(v=>{
            if(v.length === 4 && v != 'Kode') code.push({code:v})
        })
    })

    code.map((v)=>{
        if(v.code.replace( /^\D+/g, '').length === 0 && v.code.length === 4) output.push(v)
    })
    
    return output
}

const scrapeAvatar = (elements = '') => {
    
    let $ = cheerio.load(elements), avatar = '', value = ''

    //avatar
    $('img').each(function (i, e) {
      value = $(e).first().attr('src');
      if(value != undefined && value.includes('symbol-logo.tradingview.com') && !value.includes('https://s3-symbol-logo.tradingview.com/country/ID.svg')){
        avatar = value
      }
    })

    return avatar
}

const scrapeInvesting = (elements = '') => {
    
    let $ = cheerio.load(elements), investing = '', value = ''

    //investing
    $('a').each(function (i, e) {
        value = $(e).first().attr('href');  
        if(value.includes('https://id.investing.com/')
        && !value.includes('https://id.investing.com/indices/')
        && !value.includes('https://id.investing.com/markets/')
        && !value.includes('https://id.investing.com/commodities/')
        && investing === ''
        && value !== 'https://id.investing.com/'
        && value !== 'https://id.investing.com/equities/' 
        && value !== 'https://id.investing.com/equities/indonesia'
        ){
          investing = value.replace('https://id','https://www')
        }
    })

    const del = [
        '-company-profile',
        '-historical-data',
        '-related-indices',
        '-chart',
        '-advanced-chart',
        '-financial-summary',
        '-income-statement',
        '-balance-sheet',
        '-cash-flow',
        '-ratios',
        '-dividends',
        '-earnings',
        '-technical',
        '-candlestick',
        '-consensus-estimates',
        '-commentary',
        '-scoreboard',
        '-user-rankings',
        '-advanced',
        '-news',
        '/2'
    ]

    del.map(val=>{
        if(investing.includes(val)){
          investing = investing.replace(val,'')
        }
    })
    
    return investing
}

const findNewCodes = (oldList = [], newList = []) => {
    let newCodes = []
    newList.map((v1) => {
        let check = false
        oldList.map((v2) => {
            if(v1.code === v2.code) check = true
        })
        if(!check) newCodes.push(v1)
    })
    newCodes.pop()
    return newCodes
}

const scrapeCode = (elements = '') => {
    
    let $ = cheerio.load(elements), code = '', value = ''

    //code & name
    $('.instrument-header_title__GTWDv').each(function (i, e) {
        value = $(e).first().text();
        code = value.split(' (')[1].substring(0,4)
    })

    return code
}

module.exports = {
    scrapeList,
    findNewCodes,
    scrapeAvatar,
    scrapeInvesting,
    scrapeCode
}