const cheerio = require('cheerio')
const { time } = require('../../utils/utils')

// Libraries
const date = time()['full']

// SCRAPE ELEMENTS: to scrape all elements
const scrape = (elements = {}, code = '') => {
    
    // Variables
    let temp = []
    let name='', description='', contact={}, topExecutives = []
    let $ = cheerio.load(elements)

    // Scrape code & name
    $('h1').each(function (i, e) {
        value = $(e).first().text();
        name = value.substring(value.length-8,0)
    })
    
    // Scrape description
    $('.companyProfileBody').each(function (i, e) {
        value = $(e).first().text();
        description = value.replace(/\n/g,'')
    })

    // Scrape address
    temp = [], i = 0
    $('.companyAddress span').each(function (i, e) {
      value = $(e).first().text();
      if(i>2){
          temp.push(value)
      }
      i++
    })
    contact['address'] = temp

    // Scrape phone
    temp = [], i = 0
    $('.companyPhone span').each(function (i, e) {
      value = $(e).first().text();
      if(i>1){
          temp.push(value)
      }
      i++
    })
    contact['phone'] = temp[0]

    // Scrape fax
    temp = [], i = 0
    $('.companyFax span').each(function (i, e) {
      value = $(e).first().text();
      if(i>1){
          temp.push(value)
      }
      i++
    })
    contact['fax'] = temp[0]

    // Scrape web
    $('.companyWeb span a').each(function (i, e) {
        value = $(e).first().attr('href');
    })
    contact['web'] = value

    // Scrape top exec
    temp = [], i = 0
    $('.topExecsTbl td').each(function (i, e) {
      value = $(e).first().text();
      if(temp.length < 4){
          temp.push(value)
      } else {
          topExecutives.push({
              name: temp[0],
              age: temp[1],
              since: temp[2],
              title: temp[3]
          })
          temp = []
          temp.push(value)
      }
    })

    // return 
    return {date, code, name, description, contact, topExecutives}
}

module.exports = {
    scrape
}