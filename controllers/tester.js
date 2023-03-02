const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME, IDEA_TABLE_NAME} = require('../databaseHandler')

router.get('/home',(req,res)=>{
    res.render('tester/home')
})


module.exports = router;