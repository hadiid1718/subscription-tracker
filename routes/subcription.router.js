import { Router } from 'express';

const subscriptionRouter = Router()

subscriptionRouter.get("/", (req,res)=> res.send({ message : "Get all subcriptions"}))

subscriptionRouter.get("/:id", (req,res)=> res.send({ message : "Get subcriptions details"}))

subscriptionRouter.post("/", (req,res)=> res.send({ message : "Create  subcriptions"}))

subscriptionRouter.put("/:id", (req,res)=> res.send({ message : "Updtate the subcriptions"}))

subscriptionRouter.delete("/:id", (req,res)=> res.send({ message : "Delete all subcriptions"}))

subscriptionRouter.get("/users/:id", (req,res)=> res.send({ message : "Get all users subcriptions"}))

subscriptionRouter.put("/:id/cancel", (req,res)=> res.send({ message : "Camcel the subcriptions"}))

subscriptionRouter.get("/upcoming-renewals", (req,res)=> res.send({ message : "Get Upcoming Renewals"}))

export default subscriptionRouter