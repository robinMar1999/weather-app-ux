const request=require('request')
const geocode=(address,callback)=>{
    const url='https://us1.locationiq.com/v1/search.php?key=pk.a92cf98dfae8747c1bbcc81d61b828b0&format=json&q='+encodeURIComponent(address)
    request({url, json:true},(err,{body})=>{
        if(err){
            callback('Unable to connect',undefined)
        } else if(body.error){
            callback('Location not found',undefined)
        } else{
            callback(undefined,{
                lat:body[0].lat,
                lon:body[0].lon,
                place:body[0].display_name
            })
        }
    })
}
module.exports=geocode