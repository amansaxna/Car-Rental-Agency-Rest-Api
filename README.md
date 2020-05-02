
## Car-Rental-Agency-Rest-Api

### Rest-Api for CURD operations over Car objs.

Technologies Used :- 
* Nodejs with Express Microfamework ,
* Mongo DB
<hr />

### REST-API :

1. Initialize a Node Application with ***package.js***

```bash
npm init --yes
```

2. Install Express

```bash
npm i express 
```
4. Create a server file

```node
//index.js
const express =  require('express');
const app = express();

app.get('/', (req ,res) => {

    res.send('hello world')
});

app.listen(3000, () =>  console.log('listening on port 3000'));
```

3. To start the node application

```bash
node index.js
```

4. To ease the development process install nodemon(node-monitor)
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

```bash
npm i -g nodemon
```

5. To start the node application w/ Nodemon

```bash
nodemon index.js
#or
#export PORT=5000 && nodemon index.js
```

<hr />

### Mongo-db :

1. install Body-parser // helps to parse json b/w clients and servers

```bash
npm install body-parser
```

2. Install Mongo-db :

```bash
npm install mongodb
```

3. Install path module :

```bash
npm install path
```


npm run serve


```json
{ 
	"vehicle_no" : "3" ,
	"model" : "c" ,
	"seating Capacity": "6" ,
	"rent_per_day" : "100" , 
	"Bookings" : 
	[
		{
			"no" : "1" ,
			"name": "aman" ,
			"phone_no" : "9868740xxx" ,
			"issue_date" : "05042020",
			"return_date" : "06042020" 
		}
	]
}
```


https://docs.mongodb.com/manual/tutorial/remove-documents/



post
http://localhost:3000/add/car::
{ 
	"vehicle_no" : 4 ,
	"model" : "d" ,
	"seating Capacity": 10 ,
	"rent_per_day" : 1000 , 
	"Bookings" : 
	[
		{
			"no" : 1 ,
			"name": "aman" ,
			"phone_no" : "9868740xxx" ,
			"issue_date" : "05042020",
			"return_date" : "06042020" 
		}
	]
}

delete:
http://localhost:3000/delete/car/4

put:
http://localhost:3000/book/1
{
	"no": 2,
	"name": "raman",
	"phone_no": "9868740xxx",
	"issue_date": "Jan 7, 2020Z",
	"return_date": "Jan 8, 2020Z"
}
