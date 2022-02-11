import app from './server.js'
import mongodb from 'mongodb'
import RestaurantsDAO from './dao/restaurantsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js'
import dotenv from 'dotenv'
dotenv.config();
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
      process.env.RESTREVU_DB_URI,{
            maxPoolSize:50,
            wtimeoutMS:2500,
      })
      .catch(err=>{
            console.log(err.stack);
            process.exit(1)
      })
      .then(async client=>{
            await RestaurantsDAO.injectDB(client)
            await ReviewsDAO.injectDB(client)
            app.listen(port,()=>{
                  console.log(`Server running on port : ${port}`);
            })

      })





