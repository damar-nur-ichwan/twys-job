const cheerio = require('cheerio')

// Libraries
const date = require('../../data/time.json')['full']

// SCRAPE ELEMENTS: to scrape all elements
const scrape = async (elements = {}) => {
    
    // Variables
    let code = '', name='', dividends=[], temp=[]
    let $ = cheerio.load(elements)

    // Scrape code & name
    $('h1').each(function (i, e) {
        value = $(e).first().text();
        code = value.substring(value.length-1,value.length-6).replace(')','').replace('(','').replace('TX_p','CNTX')
        name = value.substring(value.length-8,0)
    })

    // Scrape dividend
    $('.dividendTbl td').each(function (i, e) {
        value = $(e).first().text();
        if(temp.length <5){
          temp.push(value)
        } else {
          dividends.push({
            exDate: temp[0],
            dividend: temp[1],
            payDate: temp[3],
            yield: temp[4]
          })
          temp = []
          temp.push(value)
        }
    })

    // return 
    return {date, code, name, dividends}
}

module.exports = {
    scrape
}