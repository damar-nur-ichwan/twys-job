const { default: axios } = require("axios")
const { CreateFile, UpdateFile } = require("dni-file-system")

async function time(url=''){
    try{
        // Get time
        let res = await axios.get('http://worldtimeapi.org/api/timezone/asia/jakarta')
    
        // Build output
        const datetime = res.data.datetime
        const newRes = datetime.substring(0,22).split('T')
        const date = newRes[0].split('-')
        const timestamp = (new Date(date[0],date[1]-1,date[2],newRes[1].split(':')[0],newRes[1].split(':')[1],newRes[1].split(':')[2].split('.')[0],newRes[1].split(':')[2].split('.')[1])).getTime()
        const full = `${date[2]}/${date[1]}/${date[0]}, ${newRes[1].split(':')[0]}:${newRes[1].split(':')[0]} GMT+7`
        const output = {
            timestamp,
            hours: parseInt(newRes[1].split(':')[0]),
            minutes: parseInt(newRes[1].split(':')[1]),
            seconds: parseInt(newRes[1].split(':')[2]),
            full
        }

        // Save time
        await CreateFile(`./data/time.json`,JSON.stringify(output))
        await UpdateFile(`./data/time.json`,JSON.stringify(output))
        
        // Return
        return output

    } catch (err){
        await time(url)
    }
}

module.exports=time