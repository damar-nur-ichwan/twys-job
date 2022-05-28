const {CreateFile, UpdateFile} = require('dni-file-system')

const limit = 10, counter = 0.05
let tpsl = []
for(let stop_loss = -counter; stop_loss >= -limit; stop_loss -= counter ){
    for(let take_profit = counter; take_profit <= limit; take_profit += counter ){
        stop_loss = parseFloat(stop_loss.toFixed(2))
        take_profit = parseFloat(take_profit.toFixed(2))
        tpsl.push({stop_loss, take_profit})
    }
}
CreateFile('./utils/tpls/tpsl.util.json', JSON.stringify(tpsl))
UpdateFile('./utils/tpls/tpsl.util.json', JSON.stringify(tpsl))