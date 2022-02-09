import e from 'express'
import ReviewsDAO from '../dao/reviewDAO.js'

export default class ReviewController {
      static async apiPostReview(req,res,next) {
            try {
                  const restaurantId = req.body.restaurant_id
                  const review = req.body.text
                  const userInfo = {
                        name:req.body.name,
                        _id:req.body._id
                  }
                  const date = new Date()

                  const reviewResponse = await ReviewsDAO.addReview(
                        restaurantId,
                        userInfo,
                        review,
                        date,
                  )
                  res.json({status:'Success'})
            } catch (error) {
                  res.status(500).json({error:e.message})
            }
      }

      static async apiUpdateReview(req,res,next) {
            try {
                  const reviewId = req.body.review_id
                  const text = req.body.text
                  const date = new Date()

                  const reviewResponse = await ReviewsDAO.updateReview(
                        reviewId,
                        req.body.user_id,
                        text,
                        date,
                  )
                  var {error} = reviewResponse
                  if (error){
                        res.status(400).json({error})
                  }

            } catch (error) {
               res.status(400).json({error: error.message})

            }

            if(reviewResponse.modifiedCount === 0){
                  throw new Error(
                        "Unable to update the review - You/user may not be the original poster  "
                  )
            }
      }

      static async apiDeleteReview(req,res,next) {
            try{
                  const reviewId = req.query.id
                  const userId = req.body.id
                  console.log(reviewId);
                  const reviewResponse = await ReviewsDAO.deleteReview(
                        reviewId,
                        userId,
                  )
                  res.json({status:'Success'})
            }catch(error){
                  res.status(500).json({error:e.message})
            }
      }
}