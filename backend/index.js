const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')



const app = express()
const port = 5000
app.use(cors())
// middleware 
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/inotebook', ()=>{
    console.log('db connected')
})




app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Available routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`)
})