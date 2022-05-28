const cheerio = require('cheerio')

// Libraries
const date = require('../../data/time.json')['full']

// SCRAPE ELEMENTS: to scrape all elements
const scrape = async (elements = {}, code = '') => {
    
    // Variables
    let name='', summary=''
    let $ = cheerio.load(elements)

    // Scrape code & name
    $('h1').each(function (i, e) {
        value = $(e).first().text();
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