import { Router } from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middlewar.js';


const userRouter = Router();


userRouter.get("/", getUsers)

userRouter.get("/:id",authorize,  getUser)

userRouter.post("/", (req,res)=> res.send({ title: "Create User Route"}))

userRouter.put("/:id", authorize,updateUser)

userRouter.delete("/:id", authorize, deleteUser)


export default userRouter;