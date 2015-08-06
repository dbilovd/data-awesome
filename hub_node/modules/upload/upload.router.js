/**
 * /modules/upload/upload.router.js
 * Handle routes for upload module
 * 
 */

// Requirements
var express = require("express"),
	multer = require("multer");
	
var router = express.Router();

// multer configurations
var complete = false;
router.use(multer({
	dest : './../../uploads',
	rename : function (fieldname, filename){
		return filename + Date.now();
	},
	onUpStart : function (file){
		console.log("starting to uploading of " + file.originalname);
	},

	onUPStop : function (){
		console.log(file.originalname + " uploaded to " + file.path);
		complete = true;
	}
}));

// Get
router.get("*", function (req, res, next){
	res.send("Upload new file: <br /> <input type='file' name='upload-file' />");
});

// post
router.post("/upload", function (req, res, next){

});

// Export module
module.exports = router