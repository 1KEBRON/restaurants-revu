import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let restaurants
export default class RestaurantsDAO {
      static async injectDB(conn){
            if(restaurants){
                  return
            }else{
                  try {
                        restaurants = await conn.db(process.env.RESTREVU_NS).collections('restaurants')
                  } catch (error) {
                        console.error(`Unable to establish a collection handle in restaurantsDAO: ${error}`);
                  }
            }
      }
      static async getRestaurants ({
            filters = null,
            page = 0,
            restaurantsPerPage = 25,
      }= {})
      {
            let query 
            if(filters){
                  if('name' in filters){
                        query = {$text:{$search:filters["name"]}}
                  }else if('cuisine' in filters){
                        query = {'cuisine': {$eq:filters['cuisine']}}
                  }else if ('zipcode' in filters){
                        query = {'address.zipcode':{$eq:filters['zipcode']}}
                  }
            }
            let cursor
            try {
                  cursor = await restaurants
                  .find(query)
            } catch (error) {
                  console.log(`unable to issue find command, ${error}`);
                  return {restaurantsList:[],totalNumRestaurants:0}
            }

            const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurants * page)
            try {
                  const restaurantsList =  await displayCursor.toArray();
                  const totalNumRestaurants = await restaurants.countDocuments(query)
                  
                  return {restaurantsList,totalNumRestaurants}
            } catch (error) {
                  console.error(`Unable to convert cursor to array or problem with counting documents, ${error}`);

                  return {restaurantsList:[],totalNumRestaurants:0}

            }
      }
}
