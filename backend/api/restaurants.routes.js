import express, { Router } from "express";
import RestaurantsCtr from './restaurants.controller.js'
import ReviewCtr from './reviews.controller.js'

const router = express.Router()
router.route('/').get(RestaurantsCtr.apiGetRestaurants)
router.route('/id/:id').get(RestaurantsCtr.apiGetRestaurantsById)
router.route('/cuisines').get(RestaurantsCtr.apiGetRestaurantsByCuisine)

router
.route('/review')
.post(ReviewCtr.apiPostReview)
.put(ReviewCtr.apiUpdateReview)
.delete(ReviewCtr.apiDeleteReview)

export default router
