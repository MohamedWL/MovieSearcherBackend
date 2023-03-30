import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.xfgcwur.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
  uri,
  //options
  {
    maxPoolSize:50,//max amount of ppl on the server
    wtimeoutMS:2500,//2.5 sec after that a user is timed out
    useNewUrlParser: true
  }).catch(err => { //error cought
    console.error(err.stack)
    process.exit(1)
  }) 
  .then(async client =>{
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })