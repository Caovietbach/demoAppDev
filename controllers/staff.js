const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME, IDEA_TABLE_NAME} = require('../databaseHandler')


// POST


router.post('/newIdea', async (req,res)=>{
    const idea= req.body.txtIdea
    const author = req.body.txtAuthor
    //const likeCount = req.body.txtLikeCount
    const category = req.body.txtCategory

    const objectToInsert = {
        'idea': idea,
        'author':author,
        //'likeCount':likeCount,
        'category': category
    }
    insertObject(IDEA_TABLE_NAME,objectToInsert)
    res.render('admin/home')

})







//GET


router.get('/newIdea',(req,res)=>{
    res.render('newIdea')
})

router.get('/home',(req,res)=>{
    res.render('staff/home')
})

router.get('/viewIdea', async (req, res) => {
    const results = await getAllDocumentsFromCollection(IDEA_TABLE_NAME)
    res.render('viewIdea',{idea:results})
})




module.exports = router;