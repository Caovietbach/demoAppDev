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

const USER_TABLE_NAME = "Users"
const IDEA_TABLE_NAME = "Ideas"

module.exports = {insertObject,checkUserRole,checkUserLogin,USER_TABLE_NAME,IDEA_TABLE_NAME}
