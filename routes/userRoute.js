const express = require("express");
const { getBioProfile, followUser, unfollowUser, getSingleUser, getAllUsers, searchUsers, updateUserProfile  } = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middleware/auth")


// search user
router.get("/search",searchUsers);


// single user by id
router.get('/', authMiddleware, getBioProfile);

// follow user
router.post('/follow/:followersId',authMiddleware,followUser);

// unfollow user
router.post("/unfollow/:followerId",authMiddleware,unfollowUser);

// single user
router.get("/userprofile/:userId", getSingleUser);

// all users
router.get("/all",getAllUsers)

// updated user profile
router.patch('/update-profile', authMiddleware, updateUserProfile);


module.exports = router