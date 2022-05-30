const axios = require('axios').default;
const { twys } = require('../../configs')
const { logger } = require("../../utils/utils")

// Variables
const layer = 'access'
const { host, path, token } = twys

const getNewList = async () => {
    try{
      let raw = await axios.get('https://britama.com/index.php/perusahaan-tercatat-di-bei/')
      return raw.data
    }
    catch (err) {
      return await getElements()
    }
}

const getOldList = async () => {
    
    // Try
    try {

        // Get urls
        const target = host+path['url']
        const config = {
            "headers": {
                "auth-token": token
            } 
        }
        const urls = await axios.get(target, config)

        // Return
        return urls.data
    }

    // Catch
    catch (err) {
        logger.error({ layer, message: err })
        return await getOldList()
    }
}

const getAvatar = async (code = '') => {
    try{
        let raw = await axios.get(`https://id.tradingview.com/symbols/IDX-${code}/`)
      raw = raw.data
      return raw
    } 
    catch (err){
      logger.error({ layer, message: err })
      return await getAvatar()
    }
}

const getInvesting = async (code = '') => {
  try{
    let raw = await axios.get(`https://id.search.yahoo.com/search;_ylt=AwrxycyVVyhigjQADwDLQwx.;_ylc=X1MDMjExNDczMzAwMwRfcgMyBGZyA3lmcC10BGZyMgNzYi10b3AEZ3ByaWQDQUp3eDBfQU9UZnFTeVhJX1Y3ejdjQQRuX3JzbHQDMARuX3N1Z2cDMARvcmlnaW4DaWQuc2VhcmNoLnlhaG9vLmNvbQRwb3MDMARwcXN0cgMEcHFzdHJsAzAEcXN0cmwDMzIEcXVlcnkDKEJBTkspJTIwLSUyMGludmVzdGluZy5jb20lMjBJbmRvbmVzaWEEdF9zdG1wAzE2NDY4MTEwNDA-?p=%28(${code})%29+-+id.investing.com+Indonesia&fr2=sb-top&fr=yfp-t&fp=1`)
    raw = raw.data
    return raw
  }
  catch (err){
    logger.error({ layer, message: err })
    return await getInvesting()
  }
}

const checkInvesting = async (investing = '') => {
  try{
    let raw = await axios.get(investing)
    raw = raw.data
    return raw
  }
  catch (err){
    logger.error({ layer, message: err })
    return await checkInvesting()
  }
}

const postTrueUrl = async (url = []) => {
  try{
    // Post urls
    const target = host+path['url']
    const config = {
        "headers": {
            "auth-token": token
        } 
    }
    const data = {url}
    await axios.post(target, data, config)
    return true
  }
  catch (err){
    logger.error({ layer, message: err })
    return await postTrueUrl()
  }
}

const postFalseUrl = async (url = []) => {
  try{
    // Post urls
    const target = host+path['url']+'/false'
    const config = {
        "headers": {
            "auth-token": token
        } 
    }
    const data = {url}
    await axios.post(target, data, config)
    return true
  }
  catch (err){
    logger.error({ layer, message: err })
    return await postTrueUrl()
  }
}

module.exports = {
  getNewList,
  getOldList,
  getAvatar,
  getInvesting,
  checkInvesting,
  postTrueUrl,
  postFalseUrl,
}

