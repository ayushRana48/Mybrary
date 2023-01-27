const res = require("express/lib/response")

const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//all author route
router.get('/', async(req,res) =>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !==''){
        searchOptions.name= new RegExp(req.query.name, 'i')
    }
    try{
        const authors =await Author.find(searchOptions)
        res.render("authors/index", {authors:authors, searchOptions:req.query})

    }
    catch{
        res.redirect('/')
    }
})

//new author route
router.get('/new',(req,res) =>{
    res.render('authors/new',{author: new Author()})
})

//create new author route
router.post('/',async (req,res) =>{
    const author = new Author({name:req.body.name})
    // author.save((err,newAuthor) =>{
    //     if(err){
    //         console.log("thrugh")
    //         console.log(author)
    //         res.render('authors/new',{
    //             author:author,
    //             errorMessage:'Error creating Author'
    //         })
    //     }
    //     else{
    //         console.log(author)
    //         //res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect('authors')
            

    //     }
    // })
    try{
        const newAuthor= await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    }
    catch{
        console.log("thrugh")
        console.log(author)
        res.render('authors/new',{
            author:author,
            errorMessage:'Error creating Author'
        })
    }
})

module.exports=router