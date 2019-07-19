const path =  require('path')

const express = require('express')

const hbs = require('hbs')

const gecode = require('./utils/geocode');

const forecast = require('./utils/forecast');

const app = express()

console.log(path.join(__dirname, '../templates'))

//Define path for Express config
const viewPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlerbar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))
 
app.get('/', (req, res) => {
  res.render('index',{
	title:'weather app',
	name:'santosh'

  })
})

app.get('/about', (req, res) => {
  res.render('about',{
	title:'About Page',
	name:'santosh'

  })
})

app.get('/help', (req, res) => {
  res.render('help',{
	title:'Help Page',
	name:'santosh'

  })
})

app.get('/weather', (req, res) => {

	if(!req.query.address){
		return res.send({
			error: 'please provide an address'
		})
	}
	gecode(req.query.address,(error, {latitude, longitude, location}={})=>{

		if(error){
			return res.send({
				error:error
			})
		}

		forecast(latitude, longitude,(error,forecastData)=>{

			if(error){
				return res.send({
					error:error
				})
			}

			res.send({

				location:location,
				forecastData:forecastData
			})
			
		})

	})
	/*res.send({

		forecast:'It is showing',
		location:'Delhi',
		address:req.query.address

	})*/
})

app.get('/help/*', (req, res) => {
  res.render('404', {
  		title:'404',
        errorMessage: 'Help Article not found',
        name: 'santosh'
    })
})

app.get('*', (req, res) => {
  res.render('404', {
  		title:'404',
        errorMessage: 'Page not found',
        name: 'santosh'
    })
})

/*
app.get('/help', (req, res) => {
  res.send('Help page')
})

app.get('/about', (req, res) => {
  res.send({

  	name : 'santosh',
  	age : 28

  })
})*/


 
app.listen(3000,()=>{

	console.log("Server is up on port 3000")
})