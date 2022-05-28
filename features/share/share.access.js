const { default: axios } = require("axios")

async function Discord(content = ''){
    try{
        await axios.post('https://discordapp.com/api/webhooks/933610348647419944/VZjB2VqPzGxIOdaEe16-vHgApTehFIopXXDzXodQEl3YSHoaMrJayECrPFWxgtaGyq3Y',{content})
    } catch (err) {
        return await Discord(content)
    }
    console.log('Discord sent')
}

module.exports = {
    Discord
}