console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json())


app.use(bodyParser.urlencoded({extended: true}))

var db

MongoClient.connect('mongodb://efasal:pastor%40321@cluster0-shard-00-00-84sxp.mongodb.net:27017,cluster0-shard-00-01-84sxp.mongodb.net:27017,cluster0-shard-00-02-84sxp.mongodb.net:27017/eFasal?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err, database) => {
  if (err) return console.log(err)
  db = database
//a server where browsers can connect to
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  db.collection('quotes').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
  })
  console.log(__dirname)
})
*/

app.get('/project/crops', (req, res) => {
  db.collection('project.crops').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders project-crops-index.ejs
    res.render('project/crops/index.ejs', {crops: result})
  })
})

//add server checks
app.post('/project/crops', (req, res) => {
  console.log(req.body)
  db.collection('project.crops').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('crops saved to database')
    res.redirect('/project/crops')
  })
})

app.get('/project/mandis', (req, res) => {
  db.collection('project.mandis').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders project-crops-index.ejs
    res.render('project/mandis/index.ejs', {mandis: result})
  })
})

app.post('/project/mandis', (req, res) => {
  db.collection('project.mandis').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('mandis saved to database')
    res.redirect('/project/mandis')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

/*
app.get('/portal', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('mayur.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Darth Vader'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
      console.log(req)
	  db.collection('quotes').findOneAndDelete({name: req.body.name},
	  (err, result) => {
	    if (err) return res.send(500, err)
	    res.send('A darth vadar quote got deleted')
	  })
})

*/
