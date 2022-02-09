import express, { Router } from "express";
import RestaurantsCtr from './restaurants.controller.js'
import ReviewCtr from 'review.controller.js'

const router = express.Router()
router.route('/').get(RestaurantsCtr.apiGetRestaurants)

router
.route('/Review')
.post(ReviewCtr.apiPostReview)
.put(ReviewCtr.apiUpdateReview)
.delete(ReviewCtr.apiDeleteReview)

export default router
