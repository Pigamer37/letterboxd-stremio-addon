//npm run devStart
const express = require("express")
const app = express()

const fsPromises = require("fs/promises")

app.get("/manifest.json", (req, res) => {
  fsPromises.readFile('./package.json', 'utf8').then((data) => {
    const packageJSON = JSON.parse(data);
    const nameVec = packageJSON.name.split('-');
    let humName;
    for (let i = 0; i < nameVec.length; i++) {
      let word = nameVec[i];
      switch (i) {
        case (nameVec.length-1):
          humName += word.charAt(0).toUpperCase() + word.slice(1);
        break;
        case 0:
          humName = `${word} `;
        break;
        default:
          humName += word.charAt(0).toUpperCase() + word.slice(1)+" ";
      }
    }

    res.json({
      "id": 'com.' + packageJSON.name.replaceAll('-', '.'),
      "version": packageJSON.version,
      "name": humName,
      "description": packageJSON.description,
      "catalogs": [],
      "resources": [
        "subtitles"
      ],
      "types": [
        "movie",
        "series",
        "anime",
        "other"
      ],
      "idPrefixes": [
        "tt"
      ],
      "logo": "https://www.stremio.com/website/stremio-logo-small.png"
    });
  }).catch((err) => res.status(500).statusMessage("Error reading file"));
})

app.get("/:userId/subtitles/:type/:videoID.json", (req, res) => {
  console.log('bruh');
  res.json({subtitles: []});
})
app.get("/:userId/subtitles/:type/:videoID/:videoHash.json", (req, res) => {
  console.log('bruh');
  res.json({subtitles: []});
})

const subtitles = require("./routes/subtitles");
app.use('/subtitles', subtitles);

const setCORS = (req, res, next) => {
  console.log(req.originalUrl);
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

app.use(setCORS);

app.listen(3000);
/*const { addonBuilder, serveHTTP, publishToCentral }  = require('stremio-addon-sdk')
const builder = new addonBuilder({
  id: 'org.myexampleaddon',
  version: packageJSON.version,

  name: 'simple example',

  // Properties that determine when Stremio picks this addon
  // this means your addon will be used for streams of the type movie
  catalogs: [],
  resources: ['stream'],
  types: ['movie'],
  idPrefixes: ['tt']
})*/