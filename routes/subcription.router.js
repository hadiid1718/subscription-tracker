import { Router } from 'express';
import { cancelSubscription, createSubscription, deleteSubscription, getAllubscriptions, getSubscription, getUserSubscriptions, updateSubscription } from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middlewar.js';

const subscriptionRouter = Router()

subscriptionRouter.get("/", authorize, getAllubscriptions)

subscriptionRouter.get("/:id", authorize, getSubscription)

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", authorize, updateSubscription)

subscriptionRouter.delete("/:id", authorize, deleteSubscription)

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions)

subscriptionRouter.put("/:id/cancel",authorize, cancelSubscription)

subscriptionRouter.get("/upcoming-renewals", (req,res)=> res.send({ message : "Get Upcoming Renewals"}))

export default subscriptionRouter