const express = require('express')
const app = express()
const dataJson=require('./Movie Data/data.json')
const port = 3000
const User=new Select(dataJson.title,dataJson.poster_path,dataJson.overview)
app.get('/', (req, res) => {
    res.json(User)
})
app.get('/favorite', (req, res) => {
    res.send('Welcome to Favorite Page')

})
  
app.listen(port, () => {
    console.log(dataJson)

  console.log(`Example app listening on port ${port}`)
})

function Select(title,poster_path,overview){
    this.title=title,
    this.poster_path=poster_path,
    this.overview=overview
}