const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME, IDEA_TABLE_NAME} = require('../databaseHandler')

router.post('/newIdea', async (req,res)=>{
    const idea= req.body.txtIdea
    const author = req.body.txtAuthor
    

    const objectToInsert = {
        'idea': idea,
        'author':author
    }
    //goi ham insert: bang Users, new user trong objectToInsert
    insertObject(IDEA_TABLE_NAME,objectToInsert)
    res.render('home')

})

router.get('/newIdea',(req,res)=>{
    res.render('newIdea')
})


router.get('/home',(req,res)=>{
    res.render('admin/home')
})



module.exports = router;