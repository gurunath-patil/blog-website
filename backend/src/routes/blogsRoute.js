const express = require("express")
const {
	getAllBlogsController,
	createBlogController,
	updateBlogController,
	getBlogByIdController,
	deleteBlogController,
	userBlogController,
} = require("../control/blogsController")
const multer = require("multer")
const storageSetting = require("../config/fileStorage")
const upload = multer({
	storage: storageSetting,
	limits: {
		fileSize: 2000000, // 2 MB
	},
})

const router = express.Router()

router.get("/all-blogs", getAllBlogsController)

router.post("/create-blog", upload.single("blogImage"), createBlogController)

router.put("/update-blog/:id/:userid", updateBlogController)

//Get single blog
router.get("/get-blog/:id", getBlogByIdController)

router.delete("/delete-blog/:blogid/:userid", deleteBlogController)

router.get("/user-blog/:id", userBlogController)
module.exports = router
