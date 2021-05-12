var express = require('express');
var router = express.Router();
const axios = require('axios');
require("dotenv").config()

router.post('/', function(req, res, next) {
	console.log("req = ", req.body.id);
	const url = "https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id="+req.body.id+"&key="+process.env.YOUTUBE_API_KEY;
	const getViews = async () => {
	  try {
	  	const response = await axios.get(url);
	  	const views = response.data.items[0].statistics.viewCount;
	  	res.status(200).send(views);
	  } catch (error) {
	    console.error(error)
	    res.status(400).send("There was an error");
	  }
	}
	getViews();

});

module.exports = router;