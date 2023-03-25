const express = require('express')
const fileUpload = require('express-fileupload');
const async = require('hbs/lib/async')
const fs = require('fs')
const router = express.Router()
const {getDB,insertObject,getAccount,getAllDocumentFromCollection,getAnAccount,updateAccount, getIdeaFeedback, getAEvent,
    checkUserRole,checkUserLogin,updateIdeaLikeCount,getAnIdea,checkCategory, checkUserLike, checkUserDislike,checkUserEmale,
    EVENT_TABLE_NAME,USER_TABLE_NAME,IDEA_TABLE_NAME,CATEGORY_TABLE_NAME,ROLE_TABLE_NAME,DEPARTMENT_TABLE_NAME,POSTLIKE_TABLE_NAME,POSTDISLIKE_TABLE_NAME,COMMENT_TABLE_NAME} = require('../databaseHandler')

router.use(fileUpload())
// POST
router.use(function(req, res, next) {
    console.log(typeof req.next);

    next();
});

router.post('/newIdea', async (req,res,next)=>{
    const idea= req.body.txtIdea
    if(!req.files)
    {
        res.send("File was not found");
        return;
    }

    var file = req.files.myFile
    const ideaContent = fs.readFileSync(file.path)
    const author = req.session.user.userName
    const likeCount = 0
    const category = req.body.Category
    const event = req.body.Event
    const Anon = req.body.Anon
    const realTime = new Date().getTime() 
    const e = await getAEvent()
    const eDate = new Date(e.endDate).getTime()

    if (realTime < eDate){
        req.session.error = "The event is passed"
        res.redirect('/staff/newIdea')
        console.log("1")
        return;
    } else {
        if (Anon == "Yes"){
            const objectToInsert = {
                'idea': idea,
                'ideaContent': ideaContent,
                'author': "Guest",
                'user': author,
                'likeCount':likeCount,
                'category': category,
                'event': event
            }
            insertObject(IDEA_TABLE_NAME,objectToInsert)
            res.redirect('/staff/viewIdea')
        } else {
            const objectToInsert = {
                'idea': idea,
                'author':author,
                'user': author,
                'likeCount':likeCount,
                'category': category,
                'event': event
            }
            insertObject(IDEA_TABLE_NAME,objectToInsert)
            res.redirect('/staff/viewIdea')
        }
    }

})

router.get('/likeIdea', async (req, res) => {
    
})





//GET


router.get('/newIdea',async (req,res)=>{
    const category = await getAllDocumentFromCollection(CATEGORY_TABLE_NAME)
    const event = await getAllDocumentFromCollection(EVENT_TABLE_NAME)
    res.sendFile(__dirname + '/newIdea.hbs')
    res.render('staff/newIdea',{categories:category,events:event})
})

router.get('/home',(req,res)=>{
    res.render('staff/home')
})

router.get('/viewIdea', async (req, res) => {
    const results = await getAllDocumentsFromCollection(IDEA_TABLE_NAME)
    res.render('staff/viewIdea',{idea:results})
})




module.exports = router;