const request=require('request')
const forecast=({lat,lon},callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(lat)+'&lon=' + encodeURIComponent(lon)+'&units=metric&appid=f955c7808bee805bff67772331ed72b3'
    request({url, json:true},(err,{body})=>{
        if(err){
            callback('Unable to connect',undefined)
        } else if(body.message){
            callback('There was some problem on the server side',undefined)
        } else{
            callback(undefined,'It is '+body.weather[0].description + ' with ' +body.main.temp + ' degree celsius')
        }
    })
}
module.exports=forecast