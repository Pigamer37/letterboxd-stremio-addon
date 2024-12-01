const express = require("express")
const subtitles = express.Router()

require('dotenv').config()//process.env.var

const https = require('https')

function HandleLongSubRequest(req, res, next) {
  console.log(`\x1b[96mEntered HandleLongSubRequest with\x1b[39m ${req.originalUrl}`)
  const params = searchParamsRegex(req.params[0])
  next()
}
function HandleSubRequest(req, res, next) {
  console.log(`\x1b[96mEntered HandleSubRequest with\x1b[39m ${req.originalUrl}`)
  if(req.params.type==="movie"){
    console.log('\x1b[33mGot a movie\x1b[39m')
    searchIMDB(req.params.videoId)
  }
  res.json({subtitles: []});
  next()
}

function searchIMDB(imdbID){
  const headers = {"user-agent": process.env.USER_AGENT}
  const options = {"headers": headers, "timeout": 10000}
  const reqURL = (process.env.URL_IMDB_BASE+process.env.URL_PAGE_FILL_ID_IMDB+imdbID+"/")
  console.log(reqURL)
  https.get(reqURL,options,(resp)=>{
    //console.log(`status: ${resp.statusCode}`)
    if(resp.statusCode===200) { //HTTPS OK
      resp.setEncoding('utf8');
      let rawData = '';
      resp.on('data', (d)=>{ rawData += d })
      resp.on('end', ()=>{
        //do things with HTML
        //console.log(rawData)
        const metaTag = rawData.indexOf('property="og:title"')
        if(metaTag===-1) return 500;
        let contentIdx = rawData.indexOf('content', metaTag+18)//search after previous match
        if(contentIdx===-1) return 500;
        contentIdx = rawData.indexOf('"', contentIdx+7)//search opening tag of content attr
        if(contentIdx===-1) return 500;
        const endContIdx = rawData.indexOf('"', contentIdx+1)
        if(contentIdx===-1 || contentIdx===endContIdx) return 500;
        const contentSplit = rawData.substring(contentIdx, endContIdx).split(" | ")
        const titleAndYearRating = contentSplit[0].split(" (")
        const yearAndRating = titleAndYearRating[1].split(" ⭐ ")
        const title = titleAndYearRating[0], year = yearAndRating[0].substring(0,4), rating = yearAndRating[1];
        console.log(title, year, rating)
        return {"title": title, "year": year, "rating": rating}
      })
    }else return 500;
  }).on('error', (e)=>{return 500})
}

function scrapeIMDBPage(html){

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