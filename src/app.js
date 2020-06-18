const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
 const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handle bar engine and views locations
app.set('view engine' ,'hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup staic dir to serve 
app.use(express.static(publicDir))

app.get('',(req,res) =>{

res.render('index',{

    title:'Weather App',
    name:'vijay'

})

})

 

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About ',
        name:'vijay',
        aboutMsg:'This is a weather app to show forecast about weather based on location details'

    })
})

app.get('/help',(req,res) =>{

res.render('help',{
    title:'Help',
    helpText:'Please feel free to contact us at contact Number +910000111122',
name:'vijay'
})

})

    app.get('/weather',(req,res) =>{

            if(!req.query.address){

            return res.send({
                error:'You must provide the address  ... '
            })
            }

            geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{

                        if(error){
                            return res.send({error})
                        }
                       
                        forecast(latitude,longitude,(error,forecastData) =>{

if(error){
    return res.send(error)
}
                    res.send({
                            forecast:forecastData,
                            location,
                            address:req.query.address



                    })

              })

            })
       
    })  


    app.get('/products',(req,res) => {


        if (!req.query.search){
       return  res.send({

    error:'You must provide a search term '
            })
        }
        
        console.log(req.query.search)
        res.send({

         products:[]

        })
    
    })


app.get('/help/*',(req,res)=>{
res.render('404',{



    title:'404',
    name:'Vijay',
    errorMessage:'Help article not found'


})

})

app.get('*',(req,res)=>{

res.render('404',{


    title:'404',
    name:'Vijay',
    errorMessage:'Page not found'

})



})







app.listen(3000, () =>{

    console.log('server is running on port 3000')
})
