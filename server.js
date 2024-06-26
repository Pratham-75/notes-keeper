const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles')
const Article=require('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/blogsDatabase')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.get('/', async(req,res)=> {
    const articles = await Article.find().sort({CreatedAt:'desc'})
    res.render('articles/index',{articles:articles});
})

app.use('/articles',articleRouter);

app.listen(3000, ()=>{
    console.log("server is running")
})