const cheerio = require('cheerio')

// Libraries
const date = require('../../data/time.json')['full']

// SCRAPE ELEMENTS: to scrape all elements
const scrape = async (elements = {}) => {
    
    // Variables
    let code = '', name='', summary=''
    let $ = cheerio.load(elements)

    // Scrape code & name
    $('h1').each(function (i, e) {
        value = $(e).first().text();
        code = value.substring(value.length-1,value.length-6).replace(')','').replace('(','').replace('_p','')
        name = value.substring(value.length-8,0)
    })

    // Scrape summary
    $('.instrumentSummaryBody').each(function (i, e) {
        value = $(e).first().text().replace(/\n/g,'');
        summary = value
      })  

    // return 
    return {date, code, name, summary}
}

module.exports = {
    scrape
}