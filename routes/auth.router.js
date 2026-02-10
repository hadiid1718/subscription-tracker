import { Router } from 'express';

const authRouter = Router()

authRouter.post("/sign-up", (req,res)=>  res.send({message: "Sign up route"}))
authRouter.post("/sign-in", (req,res)=> res.send({message: "Sign in route"}))
authRouter.post("/sign-out", (req,res)=> res.send({message: "Sign out route"}))

export default authRouter;