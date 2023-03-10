const express = require('express')
const async = require('hbs/lib/async')
const {ObjectId} = require('bson')
const router = express.Router()
const {getDB,insertObject,getAllDocumentFromCollection,getAccount,checkUserRole,ROLE_TABLE_NAME,USER_TABLE_NAME,IDEA_TABLE_NAME,getAnAccount,updateAccount,} = require('../databaseHandler')


function requiresLoginAdmin(req,res,next){
    if(req.session.user){
        return next()
    }else{
        res.redirect('/login')
    }
}

//POST

router.post('/register',requiresLoginAdmin,(req,res)=>{
    const name = req.body.txtName
    const role = req.body.Role
    const pass= req.body.txtPassword

    const objectToInsert = {
        userName: name,
        role:role,
        password: pass
    }
    insertObject(USER_TABLE_NAME,objectToInsert)
    res.render('admin/home')
})

router.get('/updateAccount', async (req,res)=>{
    let id = req.query.id;
    let objectId = ObjectId(id)
    let account = await getAnAccount(objectId);
    res.render('admin/updateAccount',{'account':account})
})

router.post('/doUpdateAccount', async (req,res)=>{
    let id = req.body.id;
    let objectId = ObjectId(id)
    const username = req.body.txtUsername
    const password = req.body.txtPassword
    const role = req.body.Role
    let account = {
        'userName' : username,
        'password' : password,
        'role': role
    }
    await updateAccount(objectId,account)
    res.redirect('/admin/viewAccount')
})

router.get('/deleteAccount',async (req,res)=>{
    let id = req.query.id
    console.log(id)
    let objectId = ObjectId(id);
    let dbo = await getDB();
    await dbo.collection(USER_TABLE_NAME).deleteOne({_id:objectId})
    res.redirect('/admin/viewAccount')
})




//GET

router.get('/register',requiresLoginAdmin, async(req,res)=>{
    const results = await getAllDocumentFromCollection(ROLE_TABLE_NAME)
    console.log(results)
    res.render('register',{'roles':results})
})
router.get('/home',requiresLoginAdmin,(req,res)=>{
    res.render('admin/home')
})

router.get('/viewIdea',requiresLoginAdmin, async(req,res)=>{
    const results = await getAllDocumentFromCollection(IDEA_TABLE_NAME)
    res.render('admin/viewIdea',{'ideas':results})
})

router.get('/viewAccount', async (req,res)=>{
    let result = await getAccount();
    res.render('admin/viewAccount',{'accounts': result})
})

module.exports = router;