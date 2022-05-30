const time = () => {
    const dt = convertTZ(new Date(), "Asia/Jakarta")
    return {
        timestamp: dt.getTime(), 
        years: dt.getFullYear(),
        months: dt.getMonth()+1,
        date: dt.getDate(),
        hours: dt.getHours(),
        minutes: dt.getMinutes(),
        seconds: dt.getSeconds(),
        fullDate:`${addZero(dt.getDate())}/${addZero(dt.getMonth()+1)}/${dt.getFullYear()}`,
        fullTime:`${addZero(dt.getHours())}:${addZero(dt.getMinutes())}`,
        full: `${addZero(dt.getDate())}/${addZero(dt.getMonth()+1)}/${dt.getFullYear()} ${addZero(dt.getHours())}:${addZero(dt.getMinutes())}`
    }
}
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
function addZero(number){
    if(parseInt(number) < 10) return '0' + parseInt(number)
    return number
}

module.exports=time