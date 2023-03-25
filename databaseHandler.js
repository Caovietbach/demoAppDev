const async = require('hbs/lib/async');
const {MongoClient,ObjectId} = require('mongodb');

const URL = 'mongodb+srv://nguyen190221:shinobi123@cluster0.akpagoe.mongodb.net/test';
const DATABASE_NAME = "Test"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertObject(collectionName,objectToInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

async function checkUserRole(nameI,passI){
    const dbo = await getDB();
    const user= await dbo.collection(USER_TABLE_NAME).findOne({userName:nameI,password:passI});
    if (user ==null) {
        return "-1"
    }else{
        return user.role;
    }
}

async function checkUserEmale(nameI,passI){
    const dbo = await getDB();
    const user= await dbo.collection(USER_TABLE_NAME).findOne({userName:nameI,password:passI})
    if (user == null) {
        return "-1"
    }else{
        return user.email;
    }
}


async function checkUserLogin(nameI) {
    const dbo = await getDB();
    const results = await dbo.collection(USER_TABLE_NAME).findOne({userName: nameI})
    if (results) {
    return results;
    } else {
    return -1;
    }
}

async function checkCategory(categoryName) {
    const dbo = await getDB();
    const results = await dbo.collection(CATEGORY_TABLE_NAME).findOne({categoryName: categoryName});
    if (results) {
        return 1;
    } else {
        return -1;
    }
}

async function getAllDocumentFromCollection(collectionName) {
    const dbo = await getDB();
    const results = await dbo.collection(collectionName).find().toArray();
    return results;
}

async function getAccount(){
    const dbo = await getDB();
    const result = await dbo.collection(USER_TABLE_NAME).find().toArray();
    return result
}


async function getAnAccount(accountID){
    const dbo = await getDB();
    const result = await dbo.collection(USER_TABLE_NAME).findOne({_id: accountID})
    return result
}

async function getAEvent(eventID){
    const dbo = await getDB();
    const results = await dbo.collection(EVENT_TABLE_NAME).findOne({_id: eventID})
    return results
}


async function getAnIdea(ideaID){
    const dbo = await getDB();
    const result = await dbo.collection(IDEA_TABLE_NAME).find({_id: ideaID}).toArray()
    return result;
}

async function getIdeaFeedback(ideaI){
    const dbo = await getDB();
    const results = await dbo.collection(COMMENT_TABLE_NAME).find({ ideaID: ideaI}).toArray()
    console.log(results);
    return results
}

async function updateAccount(accountID,account){
    const dbo = await getDB();
    const result = await dbo.collection(USER_TABLE_NAME).updateOne({_id: accountID},{$set : account})
    return result;
}

async function updateIdeaLikeCount(ideaID, newLikeCount){
    const dbo = await getDB();
    await dbo.collection(IDEA_TABLE_NAME).updateOne({_id: ideaID},{$set : {likeCount:newLikeCount}});
}

async function checkUserLike(ideaI, Email){
    const dbo = await getDB()
    var results = await dbo.collection(POSTLIKE_TABLE_NAME).findOne({ ideaID: ideaI, userEmail: Email})
    if (results){
        return 1;
    } else {
        return -1;
    }
}

async function checkUserDislike(ideaI, Email){
    const dbo = await getDB()
    var results = await dbo.collection(POSTDISLIKE_TABLE_NAME).findOne({ ideaID: ideaI, userEmail: Email})
    if (results){
        return 1;
    } else {
        return -1;
    }
}







const USER_TABLE_NAME = "Users"
const IDEA_TABLE_NAME = "Ideas"
const CATEGORY_TABLE_NAME = "Categories"
const ROLE_TABLE_NAME = "Roles"
const EVENT_TABLE_NAME = "Events"
const DEPARTMENT_TABLE_NAME = "Departments"
const POSTLIKE_TABLE_NAME = "Postlike"
const COMMENT_TABLE_NAME = "Comments"
const POSTDISLIKE_TABLE_NAME = "Postdislike"

module.exports = {getDB,insertObject,getAccount,getAllDocumentFromCollection,getAnAccount,updateAccount, getIdeaFeedback, getAEvent,
                checkUserRole,checkUserLogin,updateIdeaLikeCount,getAnIdea,checkCategory, checkUserLike, checkUserDislike,checkUserEmale,
                EVENT_TABLE_NAME,USER_TABLE_NAME,IDEA_TABLE_NAME,CATEGORY_TABLE_NAME,ROLE_TABLE_NAME,DEPARTMENT_TABLE_NAME,POSTLIKE_TABLE_NAME,POSTDISLIKE_TABLE_NAME,COMMENT_TABLE_NAME}
