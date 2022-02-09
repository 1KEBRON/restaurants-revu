import express, { Router } from "express";
import RestaurantsCtr from './restaurants.controller.js'
const router = express.Router()

router.route('/').get(RestaurantsCtr.apiGetRestaurants)

export default router
