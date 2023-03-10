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

async function  checkUserRole(nameI,passI){
    const dbo = await getDB();

    const user= await dbo.collection(USER_TABLE_NAME).findOne({userName:nameI,password:passI});
    if (user ==null) {
        return "-1"
    }else{
        return user.role;
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

async function getAllDocumentFromCollection(collectionName) {
    const dbo = await getDB();
    const results = await dbo.collection(collectionName).find().toArray();
    return results;
}

async function getAccount(){
    let dbo = await getDB();
    let result = await dbo.collection(USER_TABLE_NAME).find().toArray();
    return result;
}


async function getAnAccount(accountID){
    let dbo = await getDB();
    let result = await dbo.collection(USER_TABLE_NAME).findOne({_id: accountID})
    return result;
}

async function updateAccount(accountID,account){
    let dbo = await getDB();
    let result = await dbo.collection(USER_TABLE_NAME).updateOne({_id: accountID},{$set : account})
    return result;
}

const USER_TABLE_NAME = "Users"
const IDEA_TABLE_NAME = "Ideas"
const CATEGORY_TABLE_NAME = "Categories"
const ROLE_TABLE_NAME = "Roles"
module.exports = {getDB,insertObject,getAccount,getAllDocumentFromCollection,getAnAccount,updateAccount,checkUserRole,checkUserLogin,USER_TABLE_NAME,IDEA_TABLE_NAME,CATEGORY_TABLE_NAME,ROLE_TABLE_NAME}
