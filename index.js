const express = require('express')
const axios = require('axios').default;
const app = express()
const dataJson=require('./Movie Data/data.json')
const port = 3000
const User=new Select(dataJson.title,dataJson.poster_path,dataJson.overview)
const bodyParser = require('body-parser')
app.use(bodyParser.json())



require('dotenv').config()
const apiKey="47c347695c678d86f909c7e7475d3dde"





////////////////////////////////////////////////////database////////////////////////////////////////////
const {  Client } = require('pg')
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const client = new Client({
  host:"localhost",
  port:"5432",
  password:"12345",
  user:"postgres",
  database:"lith"
})
client.connect()



////////////////////////////////////////////get all databasse/////////////////////////////////////////

app.get("/getMovies",(req,res)=>{
  client.query('SELECT * FROM land', (err, resbase) => {
    res.json(resbase.rows)
    client.end()
  })
})

//////////////////////////////////////////post movie////////////////////////////////////////////////

app.post("/addMovie",(req,res)=>{
  const{id,name,movie}=(req.body)
  let value=[id,name,movie]
  let sql='INSERT INTO land (id,name,movie) VALUES ($1,$2,$3)'
  client.query(sql,value).then().catch()
})




app.get('/', (req, res) => {
    res.json(User)
})
app.get('/favorite', (req, res) => {
    res.send('Welcome to Favorite Page')
})


/////////////////////////////////////////////get trindig api///////////////////////////////////////
app.get('/trending', (req, res) => {
    let url=`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`
    axios.get(url)
  .then(function (response) {
    // handle success
    let data=(response.data.results.find((a)=>(a.id=="634649")));
    let Doto=new Trindong(data.id,data.title,data.release_date,data.poster_path,data.overview)
    
    res.json(Doto)

  })
  .catch(function (error) {
  })

})


////////////////////////////////////////////////search api ////////////////////////////////////////////////

app.get('/search/:query', (req, res) => {
    let quer=req.params.query
    console.log(quer)
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${quer}&page=2`
    axios.get(url)
  .then(function (response) {
      res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
  })

})

/////////////////////////////////////////////update request///////////////////////////////////////
app.put('/UPDATE/:id', (req, res) => {
  (req.params.id)
  client.query(`UPDATE land SET title = 'freddy@gmail.com' WHERE id = ${(req.params.id)};`, (err, resbase) => {
    res.json("update successful")
    client.end()
  })
 
})

app.delete('/DELETE/:id',(req,res)=>{
  console.log(  (req.params.id)  )
  client.query(`DELETE FROM land WHERE id =${  (  (req.params.id)  )  }`, (err, resbase) => {
    res.json("delete successful")
    client.end()
  })
})

app.get("/getMovie/:id",(req,res)=>{
  (  (req.params.id)  )
  client.query(`SELECT * FROM land WHERE id=${  (  (req.params.id)  )  }`, (err, resbase) => {
    res.json(resbase.rows)
    client.end()
  })
})










  
app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})
//////////constructor for select
function Select(title,poster_path,overview){
    this.title=title,
    this.poster_path=poster_path,
    this.overview=overview
}


///////////////constructor for trinding
function Trindong(id,title,release_date,poster_path,overview){
    this.id=id,
    this.title=title,
    this.release_date=release_date,
    this.poster_path=poster_path,
    this.overview=overview
}
