import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middlewar.js';


const userRouter = Router();


userRouter.get("/", getUsers)

userRouter.get("/:id",authorize,  getUser)

userRouter.post("/", (req,res)=> res.send({ message: "Create a user"}))

userRouter.put("/:id", (req,res)=> res.send({ message: "update user"}))

userRouter.delete("/:id", (req, res)=> res.send({ message: "Delete User"}))


export default userRouter;