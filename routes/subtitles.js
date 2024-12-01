const express = require("express")
const subtitles = express.Router()

require('dotenv').config()//process.env.var

function HandleLongSubRequest(req, res, next) {
  console.log(`e\x1b[96mEntered HandleLongSubRequest with\x1b[39m ${req.originalUrl}`)
  const params = searchParamsRegex(req.params[0])
  next()
}
function HandleSubRequest(req, res, next) {
  console.log(`\x1b[96mEntered HandleSubRequest with\x1b[39m ${req.originalUrl}`)
  if(req.params.type==="movie"){
    console.log('\x1b[33mGot a movie\x1b[39m')
    res.json({subtitles: []});
    next();
    return;
  }
  res.json({subtitles: []});
}

subtitles.get("/:type/:videoId/*.json", HandleLongSubRequest, HandleSubRequest)
subtitles.get("/:type/:videoId.json", HandleSubRequest)

function searchParamsRegex(extraParams) {
  //console.log(`\x1b[33mfull extra params were:\x1b[39m ${extraParams}`)
  if(extraParams!==undefined){
    const paramMap = new Map()
    const keyVals = extraParams.split('&');
    for(keyVal of keyVals){
      const keyValArr = keyVal.split('=')
      const param = keyValArr[0]; const val = keyValArr[1];
      paramMap.set(param, val)
    }
    const paramJSON = Object.fromEntries(paramMap)
    console.log(paramJSON)
    return paramJSON
  }else return {}
}

module.exports=subtitles;