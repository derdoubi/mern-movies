import express from "express"

// controllers 

import { 
 createUser , 
 loginUser  , 
 logoutCurrentUser , 
 getAllUsers,
 getCurrentUserProfile , 
  updateCurrentUserProfile
} from "../controllers/userController.js"
// midllewares
import { authenticate , authorizeAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers)

router.post("/auth" , loginUser)

router.post("/logout" , logoutCurrentUser) 

router.get("/profile" , authenticate , getCurrentUserProfile)

router.put("/profile" , authenticate, updateCurrentUserProfile)


export default router