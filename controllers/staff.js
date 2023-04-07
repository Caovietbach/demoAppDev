const express = require('express')
const async = require('hbs/lib/async')
const path = require('path')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router()
const {getDB,insertObject,getAccount,getAllDocumentFromCollection,getAnAccount,updateAccount, getIdeaFeedback, getAEvent,
    checkUserRole,checkUserLogin,updateIdeaLikeCount,getAnIdea,checkCategory, checkUserLike, checkUserDislike,checkUserEmale,
    EVENT_TABLE_NAME,USER_TABLE_NAME,IDEA_TABLE_NAME,CATEGORY_TABLE_NAME,ROLE_TABLE_NAME,DEPARTMENT_TABLE_NAME,POSTLIKE_TABLE_NAME,POSTDISLIKE_TABLE_NAME,COMMENT_TABLE_NAME} = require('../databaseHandler');
const { ObjectId } = require('mongodb');


// POST





router.post('/newIdea',upload.array("myFile"), async (req,res)=>{
    const idea= req.body.txtIdea
    const author = req.session.user.userName
    const likeCount = 0
    const category = req.body.Category
    const event = req.body.Event
    const eventId = ObjectId(event) 
    const Anon = req.body.Anon
    const realTime = new Date().getTime() 
    const e = await getAEvent(eventId)
    const eDate = new Date(e.endDate).getTime()
    console.log(req.body);
    console.log(req.files);

    if (realTime > eDate){
        req.session.error = "The event is passed"
        res.redirect('/staff/newIdea')
        console.log("1")
        return;
    } else {
        if (Anon == "Yes"){
            const objectToInsert = {
                'idea': idea,
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