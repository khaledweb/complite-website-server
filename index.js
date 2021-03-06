const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jmtl7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 5000

app.get('/', (req, res) =>{
  res.send('Database Working')
})

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  const orderCollection = client.db("tech-master").collection("orderProducts");

  app.post('/addOrder', (req, res) =>{
    const order = res.body;
    orderCollection.insertOne(order)
    .then(result =>{
      res.send(res.listenerCount)
    })
  })
});

app.listen(process.env.PORT || port)