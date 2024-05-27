const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express()
const port = 3001
const cors = require('cors')
app.use(cors({ origin: true}));
//node app.js

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
  
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html' , { root : __dirname});
})

app.post('/send', (req, res) => {
  console.log("Sending......")
  db.serialize(() => {
    db.run('INSERT INTO forum(post, user, hours, minutes) VALUES(?, ?, ?, ?)', [`${req.body["post"]}`, `${req.body["username"]}`, `${req.body["hours"]}`, `${req.body["minutes"]}`]); 
  });
  res.send('200')
})

app.get('/text', (req, res) => {
  posts = []
  db.serialize(() => {
    db.all(`SELECT * FROM forum`, (err, row) => {
      if (err) {
        console.error(err.post);
      }
      row.forEach((row) => {
        list=[]
        list.push(row.post)
        list.push(row.user)
        list.push(row.hours)
        list.push(row.minutes)
        posts.push(list)
        list=[]
      });
      res.send(posts)
    });
    
  });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})