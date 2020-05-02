const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "car_retail";
const url = "mongodb://localhost:27017";
const mongoOptions = {useNewUrlParser : true}

//initialize the db sate to null
const state ={
    db : null
};

const connect = (cb) => {
    if(state.db)//if connection exists
        cb();
    else{ 
        MongoClient.connect(url,mongoOptions, (err,client) =>   {
            if(err)
                cb(err);
            else{
                state.db =client.db(dbname);
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
