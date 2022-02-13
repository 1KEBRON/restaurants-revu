import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class  RestaurantsController {
      static async apiGetRestaurants(req,res,next){
            // if the query inside the params oif url exist convert to integer
            const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage,10):25
            const page = req.query.page ? parseInt(req.query.page,10):0

            let filters = {}
            if(req.query.cuisine){
                  filters.cuisine = req.query.cuisine
            }else if (req.query.zipcode){
                  filters.zipcode = req.query.zipcode
            }else if(req.query.name) {
                  filters.name = req.query.name
            }
            const {restaurantsList,totalNumRestaurants} = await RestaurantsDAO.getRestaurants({
                  filters,
                  page,
                  restaurantsPerPage
            })

            let response = {
                  restaurants:restaurantsList,
                  page:page,
                  filters:filters,
                  entries_per_page: restaurantsPerPage,
                  total_restaurants: totalNumRestaurants,
            }
            res.json(response)
      }

      static async apiGetRestaurantsById(req,res,next){
            try {
                  let id = req.params.id || {}
                  let restaurants = await RestaurantsDAO.getRestaurantByID(id)
                  if(!restaurants){
                        res.status(404).json({error:'You are in the lost,aka. page not found '})
                        return
                  }
                  res.json(restaurants)
            } catch (err) {
                  console.log(`api, ${err}`);
                  res.status(500).json({error:err})
            }
      }
      static async apiGetRestaurantsByCuisine(req,res,next){
            try{
                  let cuisine = await RestaurantsDAO.getCuisines()
                  res.json(cuisine)
            }catch(err){
                  console.log(`api, ${err}`);
                  res.status(500).json({error:err})

            }
      }
}