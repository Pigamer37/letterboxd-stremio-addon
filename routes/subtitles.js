const express = require("express")
const subtitles = express.Router()

require('dotenv').config()//process.env.var

function HandleSubRequest(req, res, next) {
  if(req.params.type!=="movie"){
    res.json({subtitles: []});
    next();
    return;
  }
  res.json({subtitles: []});
}

subtitles.get("/:type/:videoId/:videoHash.json", HandleSubRequest)
subtitles.get("/:type/:videoId.json", HandleSubRequest)
subtitles.get("/:type/:videoId/:videoHash.json", HandleSubRequest)
subtitles.get("/:type/:videoId.json", HandleSubRequest)

module.exports=subtitles;