if(process.env.Node_ENV !=='production'){
    console.log("yo")
    console.log(process.env)
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts=require('express-ejs-layouts')

const indexRouter=require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose= require ('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true})
const db=mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/',indexRouter)

app.listen(process.env.Port || 3000)