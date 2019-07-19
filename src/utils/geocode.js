const request = require('request');
const gecode = (address, callback)=>{

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FudG9zaC1kZWxpZ2VuY2UiLCJhIjoiY2p5NGJlZGFmMTZvZzNtbHF3MDJveXRydyJ9.7VqgS9vvP-XMZc8eIckbZQ&limit=1'

	request({url,json:true},(error, {body})=>{

		if(error){
			callback("Unable to connect mapbox service", undefined)
		} else if(body.features.length === 0){
			callback("Unable to find location", undefined)
		} else{

			callback(undefined,{

				latitude : body.features[0].center[1],

				longitude : body.features[0].center[0],

				location :  body.features[0].place_name,
			})
		}

	})
}

module.exports=gecode