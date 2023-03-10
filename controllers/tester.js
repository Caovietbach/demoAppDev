const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME, IDEA_TABLE_NAME,getAllDocumentFromCollection} = require('../databaseHandler')





// GET

router.get('/home',(req,res)=>{
    res.render('tester/home')
})

router.get('/users',async (req,res)=>{
    const results = await getAllDocumentFromCollection(USER_TABLE_NAME)
    res.render('tester/viewUser',{'users':results})
})



module.exports = router;