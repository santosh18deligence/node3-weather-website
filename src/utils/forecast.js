const request = require('request');

const forecast = (lat,long,callback)=>{
	const url = 'https://api.darksky.net/forecast/ebc1ff4eeb0058721f461bd4855baf73/'+lat+','+long+'?units=si'

	request({url,json:true},(error, {body})=>{

		if(error){
			callback("Unable to connect weather service", undefined)
		} else if(body.error){
			callback("Unable to find location", undefined)
		} else{
			callback(undefined, 'The current temperature is '+body.currently.temperature+' degree out')
		}


	})
}

module.exports = forecast