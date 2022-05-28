# Utility: Time
This utility module is used to process data from http://worldtimeapi.org/api/timezone/{area}/{location}}
into ready-to-use output.

## Usage Example

```js
const time = require('./time.utils.js')
const url = 'http://worldtimeapi.org/api/timezone/Asia/Jakarta'

time(url)
.then((output)=>{
    console.log(output)
})
```