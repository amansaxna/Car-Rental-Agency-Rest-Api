const express =  require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const path = require('path');

const db = require('./db');
const collection = "car";

/*                      READ                          */
app.get('/display/all', (req ,res) => {
    console.log(req.body);
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});

app.get('/display/car/:feature/:value', (req ,res) => {
    const val = req.params.value;
    let query_st = "";
    if(!isNaN(parseInt(val)))
    {
        console.log(val);
        console.log(parseInt(val))
        query_st = `{ "${req.params.feature}" : ${req.params.value} }`;
    }
    else
        query_st = `{ "${req.params.feature}" : "${req.params.value}" }`;
    const query = JSON.parse(query_st);
    console.log(query);
    db.getDB().collection(collection).find(query).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});

app.get('/display/booking/:feature/:value', (req ,res) => {
    const val = req.params.value;
    let query_st = "";
    if(!isNaN(parseInt(val)))
    {
        console.log(val);
        console.log(parseInt(val))
        query_st = `{ "${req.params.feature}" : ${req.params.value} }`;
    }
    else
        query_st = `{ "${req.params.feature}" : "${req.params.value}" }`;
    console.log(query_st);
    const query = JSON.parse(query_st);
    console.log(query);
    db.getDB().collection(collection).find(query).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});

/*                      Create                         */
app.post('/add/car/', (req ,res) => {
    const userInput =req.body;
    userInput.Bookings = [];
    const myquery = { vehicle_no : parseInt(userInput.vehicle_no), Bookings : {$size : 0 } };

    db.getDB().collection(collection).updateOne(myquery,{$set:userInput, $setOnInsert: { car_added_at: new Date() } }, { upsert: true },(err,result)=>{
        if(err)
            console.log(err);
        else
        {
            console.log('one document added');
            //console.log(result);
            res.json({result});
        }
    });
}); 

app.put('/book/:vehicle_no',(req ,res) => {
    const vehicle_no =req.params.vehicle_no;
    var userInput1 = {
        "no": req.body.no,
        "name": req.body.name,
        "phone_no": req.body.phone_no,
        "issue_date": new Date(req.body.issue_date),
        "return_date": new Date(req.body.return_date)
    }
    console.log(userInput1) ;

    const myquery = { vehicle_no : parseInt(vehicle_no) };
    
    db.getDB().collection(collection).updateOne(myquery,{$addToSet:{Bookings: userInput1 } },(err,result)=>{
        if(err)
            console.log(err);
        else
        {
            res.json(result);
        }
    });
});




/*                      DELETE                          */
app.delete('/delete/car/:vehicle_no', (req ,res) => {
    const query = { vehicle_no : parseInt(req.params.vehicle_no) , Bookings : {$size : 0 }};
    console.log(query);
    //{ comments: { $exists: true, $size: 0 } }
    db.getDB().collection(collection).deleteOne(query,(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }
    });
});

/*                      UPDATE                          */
app.put('/update/car/:vehicle_no',(req ,res) => {
    const vehicle_no =req.params.vehicle_no;
    const userInput = req.body;
    console.log(userInput);
    const myquery = { vehicle_no : parseInt(vehicle_no) , Bookings : {$size : 0} };
    console.log(myquery);

    db.getDB().collection(collection).updateOne(myquery,{$set:userInput},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }
    });
});

//***************************************************************************************** */
const port = process.env.PORT || 3000;
db.connect((err) => {
    if(err){
        console.log('unable to connect to database');
        console.log(err);
        process.exit(1);
    }
    else{
        app.listen( port , () => {
            console.log(`connected to database, running on port ${port}`)
        })
    }
})

//const port = process.env.PORT || 3000;
//
//app.listen(port, () =>  console.log(`listening on port ${port}`));


/*
app.post('/add/car', (req ,res) => {
    const userInput =req.body;
    //const myquery = { vehicle_no : parseInt(userInput.vehicle_no) };
    db.getDB().collection(collection).insertOne((userInput),(err,result)=>{
        if(err)
            console.log(err);
        else
        {
            console.log('one document added');
            //console.log(result);
            res.json({result : result, document : result.ops[0]});
        }
    });
});
*/