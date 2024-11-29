//const express = require("express")
//const app = express()

const fs = require("fs")
let packageJSON;

const wow = 

fs.readFile('./package.json', 'utf8', function(err, data){
  if (err) {console.error(err); throw err;}
  console.log(typeof data);
  const package = JSON.parse(data);
  packageJSON = package;
  return;
});

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

console.log(packageJSON);