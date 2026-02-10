import { Router } from 'express';

const subscriptionRouter = Router()

subscriptionRouter.get("/", (req,res)=> res.send({ message : "Get all subcriptions"}))

export default subscriptionRouter