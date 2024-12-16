//npm run devStart
const express = require("express")
const app = express()

const { addonBuilder, serveHTTP, publishToCentral } = require('stremio-addon-sdk')

function setCORS(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
}
app.use(setCORS);

const fsPromises = require("fs/promises")
function ReadManifest() {
  return fsPromises.readFile('./package.json', 'utf8').then((data) => {
    const packageJSON = JSON.parse(data);
    const nameVec = packageJSON.name.split('-');
    let humName = "";
    for (let i = 0; i < nameVec.length; i++) {
      let word = nameVec[i];
      humName += word.charAt(0).toUpperCase() + word.slice(1);
      if (i !== nameVec.length - 1) humName += " ";
    }

    let manifest = {
      "id": 'com.' + packageJSON.name.replaceAll('-', '.'),
      "version": packageJSON.version,
      "name": humName,
      "logo": "https://www.stremio.com/website/stremio-logo-small.png",
      "description": packageJSON.description,
      "catalogs": [],
      "resources": [
        "subtitles"
      ],
      "types": [
        "movie",
        "anime",
        "other"
      ],
      "idPrefixes": [
        "tt"
      ],
      "behaviorHints": { "configurable": true }
    }
    return manifest;
  })
}

app.get("/manifest.json", (req, res) => {
  ReadManifest().then((manif) => {
    manif.behaviorHints.configurationRequired = true
    res.json(manif);
  }).catch((err) => {
    res.status(500).statusMessage("Error reading file: " + err);
  })
})

app.get("/:config/manifest.json", (req, res) => {
  ReadManifest().then((manif) => {
    //console.log("Params:", decodeURIComponent(req.params[0]))
    res.json(manif);
  }).catch((err) => {
    res.status(500).statusMessage("Error reading file: " + err);
  })
})

const subtitles = require("./routes/subtitles");
app.use(subtitles);
/*
fetch('https://api.strem.io/api/datastoreMeta', { headers: {"Referer": "https://web.stremio.com/", "Content-Type": "text/plain;charset=UTF-8"}, body: {
    "authKey": "StremioAuthKey",
    "collection": "libraryItem"
}, method: "POST"}).then((resp) => {
      if ((!resp.ok) || resp.status !== 200) console.log(new Error(`HTTP error! Status: ${resp.status}`))
      if (resp === undefined) console.log(new Error(`undefined response!`))
      return resp.json()
    }).then((data) => {
      if (data === undefined) console.log(new Error("Invalid response!"))
      console.log(data)
    }).catch(e => {
      console.log(e)
    })
 
    Responds with (example):
    {
    "result": [
        [
            "kono-koi-ni-kizuite-1",
            1731587229876
        ],
        [
            "tt0111161",
            1727700167081
        ],
        [
            "tt0480489",
            1732797458101
        ]
    ]
}
*/
app.listen(3000);