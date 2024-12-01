//npm run devStart
const express = require("express")
const app = express()

const { addonBuilder, serveHTTP, publishToCentral }  = require('stremio-addon-sdk')

function setCORS(req, res, next) {
  //console.log(req.originalUrl);
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
}
app.use(setCORS);

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

    manifest = {
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
    }
    res.json(manifest);
  })/*.then(()=>{
    const builder = new addonBuilder({
      id: manifest.id,
      version: manifest.version,
      name: manifest.name,
      catalogs: [],
      resources: manifest.resources,
      types: manifest.types,
      idPrefixes: manifest.idPrefixes
    })

    builder.defineSubtitlesHandler(function(args) {
      /*if (args.id === 'tt1254207') {
          // serve one subtitle
          const subtitle = {
              url: 'https://mkvtoolnix.download/samples/vsshort-en.srt',
              lang: 'eng'
          }
          return Promise.resolve({ subtitles: [subtitle] })
      } else {
          // otherwise return no subtitles
          return Promise.resolve({ subtitles: [] })
      }*/
      /*console.log(`sub request at supposed: ${args.type}/${args.id}/${args?.extra?.videoHash}.json`)
      return Promise.resolve({ subtitles: [] })
    })
  })*/.catch((err) => res.status(500).statusMessage("Error reading file"));
})

const subtitles = require("./routes/subtitles");
app.use('/subtitles', subtitles);

app.listen(3000);