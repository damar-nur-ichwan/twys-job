const cheerio = require('cheerio')
const { time } = require('../../utils/utils')

// Libraries
const date = time()['full']

// SCRAPE ELEMENTS: to scrape all elements
const scrape = async (elements = {}, code = '') => {
    
    // Variables
    let name='', ratios=[], temp1=[], temp2 = []
    let $ = cheerio.load(elements)

    // Scrape code & name
    $('h1').each(function (i, e) {
      value = $(e).first().text();
      name = value.substring(value.length-8,0)
    })
    // Scrape ratio
    $('.ratioTable td').each(function (i, e) {
      value = $(e).first().text();
      // if(value && (value.includes('.') || value.includes('-') || value.length>5)){
        if(value.includes('\n')){
          value = value.split('\n')
          value.map(v=>{
            if(v.length > 1 || v === '-'){
              temp1.push(v)
            }
          })
        } else {
          if(value.length > 1 || value === '-'){
            temp1.push(value)
          }
        }
    })
    temp1.map(v=>{
      if(temp2.length < 2 && v !== 'Efficiency'){
        temp2.push(v)
      } else {
        temp2.push(v)
        if(!temp2[0].includes('TTM vs 5 Year Average Margins') && !temp2[0].includes('Efficiency')){
          ratios.push({
            name: temp2[0],
            company: temp2[1],
            industry: temp2[2],
          })
        }
        temp2 = []
      }
    })

    // return 
    return {date, code, name, ratios}
}

module.exports = {
    scrape
}