const cheerio = require('cheerio')
const { getElements, getOverview } = require('./technical.access')

// Libraries
const date = require('../../data/time.json')['full']

// SCRAPE ELEMENTS: to scrape all elements
const scrape = (elements = {}, code = '') => {
    
    // Variables
    let name='', change='', price='', status='',id=''
    let value, temp = []
    let $ = cheerio.load(elements)

    // Conditioning
    let different = false
    if(elements.includes('float_lang_base_1 relativeAttr')){
      different = true
      elements = elements.replace(/float_lang_base_1 relativeAttr/g,'instrument-header_title__GTWDv')
      elements = elements.replace(/float_lang_base_2 bold/g,'key-info_dd-numeric__2cYjc')
      elements = elements.replace(/genTbl closedTbl technicalSummaryTbl/g,'instrument-tech-summary_instrument-tech-summary__2AoP7')
    }

    // Scrape id
    $('.key-info_dd-numeric__2cYjc').each(function (i, e) {
      value = $(e).first().text();
      temp.push(value)
      id = temp[8]
      if(different){id = temp[6]}
    })
        
    // Scrape code & name
    $('.instrument-header_title__GTWDv').each(function (i, e) {
      value = $(e).first().text();
      code = value.substring(value.length-1,value.length-6).replace(')','').replace('(','')
      name = value.substring(value.length-8,0)
    });
        
    // Scrape price
    temp = []
    if(different){
      $('.overViewBox').each(function (i, e) {
        value = $(e).first().text().split('%')[0].split('\n');
        
        price = parseInt(value[6].replace(/,/g,''))
        change = parseFloat(value[9])
      })
    } else {
      $('.instrument-price_instrument-price__3uw25 .text-2xl').each(function (i, e) {
        value = $(e).first().text();
        price=parseInt(value.replace(/,/g,''))
      });
    }

    // Scrape change
    if(!different){
      $('.instrument-price_change-percent__19cas').each(function (i, e) {
        value = $(e).first().text().replace('(', '').replace(')', '');
        change = parseFloat(value)
      });
    }

    // Scrape status
    $('.instrument-tech-summary_instrument-tech-summary__2AoP7').each(function (i,e,) {
      if(different){
        value = $(e)
        .first()
        .text()
        .split('Summary')[1]
        .split('\n')[4]
      } else {
        value = $(e)
        .first()
        .text()
        .split('Summary')[2]
        .replace(/lB/g, 'l:B')
        .replace(/lS/g, 'l:S')
        .replace(/lN/g, 'l:N')
        .replace(/yB/g, 'y:B')
        .replace(/yS/g, 'y:S')
        .replace(/yN/g, 'y:N')
        .split(':')[3];
      }
      status = value || 'Neutral';
    });

    // return 
    return {date, id, code, name, change, price, status}
}

const checkVolume = async () => {
  const code = 'BBCA'
  const url = 'https://www.investing.com/equities/bnk-central-as'
  // get BBCA last id o Firebase
  const firebaseId = await getOverview(code)

  // get BBCA last Id on Investing
  const elements = await getElements(url)
  const investingId = scrape(elements,code).id
  
  if(firebaseId === investingId) return false
  return true
};

module.exports = {
    scrape,
    checkVolume
}