const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// define paths for express configuration
const publicDirectoryPath=path.join(__dirname,'../public') 
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        pageTitle:'Weather',
        title:'Weather',
        name:'Robin'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        pageTitle:'Help',
        title:'Help page',
        name:'Robin',
        message:'This is the help page'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        pageTitle:'About',
        title:'About Me',
        name:'Robin'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }
    geocode(req.query.address,(err,{lat,lon,place}={})=>{
        if(err){
            return res.send({
                error:err
            })
        }
        forecast({lat,lon},(err,forecastData)=>{
            if(err){
                return res.send({
                    error:err
                })
            }
            res.send({
                forecastData,
                address:place
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        pageTitle:'404',
        title:'Error-404',
        name:'Robin',
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        pageTitle:'404',
        title:'Error-404',
        name:'Robin',
        message:'Page not found'
    })
})

const portno=4000
app.listen(portno,()=>{
    console.log('Server is running on port ' + portno)
})