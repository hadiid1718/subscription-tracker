import { Router } from 'express';


const userRouter = Router();


userRouter.get("/", (req,res)=> res.send({message: "Get all users"}))

userRouter.get("/:id", (req,res)=> res.send({message: "Get suser details"}))

userRouter.post("/", (req,res)=> res.send({ message: "Create a user"}))

userRouter.put("/:id", (req,res)=> res.send({ message: "update user"}))

userRouter.delete("/:id", (req, res)=> res.send({ message: "Delete User"}))


export default userRouter;