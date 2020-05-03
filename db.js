const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "car_retail";
const url = "mongodb+srv://aman:OcKQGqq38Zlq0KW2@cluster0-cpgnw.mongodb.net/test?retryWrites=true&w=majority" || "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true}

//initialize the db sate to null
const state ={
    db : null
};

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://aman:<password>@cluster0-cpgnw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/ 
const connect = (cb) => {
    if(state.db)//if connection exists
        cb();
    else{ 
        MongoClient.connect(url,mongoOptions, (err,client) =>   {
            if(err){
                console.log(err);
                cb(err);}
            else{
                state.db =client.db(dbname);
                console.log("data base connecting on :  "+url);
                cb();
            }
        });
    }
}
//helps to qury the db 
const getPrimaryKey = (_db) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};
