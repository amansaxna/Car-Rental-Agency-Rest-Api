//require('express'); this returns a function
const express =  require('express');
const app = express();





app.get('/', (req ,res) => {

    res.send('hello world')
});


app.get('/one', (req ,res) => {

    res.send([1,2,3])
});

app.get('/one/id', (req ,res) => {
    res.send(req.params.id)
});

const port = process.env.PORT || 3000;

app.listen(port, () =>  console.log(`listening on port ${port}`));

