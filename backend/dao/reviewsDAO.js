import mongodb from 'mongodb'
import { ObjectId } from 'mongodb'

let reviews

export default class ReviewsDAO{
      static async injectDB(conn){
            if(reviews){
                  return
            }try {
                  reviews = await conn.db(process.env.RESTREVU_NS).collection('reviews')
            } catch (error) {
                   console.error(`Unable to establish a collection handle in userDAO: ${error}`,)
                  }
            }
      static async addReview (restaurantId,user,review,date){
            try {
                const reviewDoc = {
                      name:user.name,
                      user_id:user._id,
                      date:date,
                      text:review,
                      restaurantId:ObjectId(restaurantId),}  
                return await reviews.insertOne(reviewDoc)

            } catch (err) {
                  console.error(`Unable to post review: ${err}`)
                  return {error:err}
            }
      }
      static async updateReview(reviewId,userId,text,date){
            try {
                  const updateResponse = await reviews.updateOne(
                        {user_id:userId, _id:ObjectId(reviewId)},
                        {$set:{text,date:date}}
                  )
                  return updateResponse
            } catch (err) {
                  console.error(`Unable to update the review: ${err}`);     
                  return {error:err}
            }
      }

      static async deleteReview(reviewId,userId){
            try {
                  const deleteResponse = await reviews.deleteOne({
                        _id: ObjectId(reviewId),
                        user_id:userId
                  })
                  return deleteResponse
                 } catch (err) {
                       console.error(`Unable to delete the review: ${err}`);     
                       return {error:err}
            }
            
      }
      }
