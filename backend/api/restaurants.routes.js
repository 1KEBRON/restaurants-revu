import express, { Router } from "express";

const router = express.Router()

router.route('/').get((req,res)=>res.send("hello wrld"))

export default router
