# letterboxd-stremio-addon
 Node.js & Express based addon trying to sync watched movies on Stremio with Letterboxd activity. (I'm new to backend so I'm using it as a learning experience)

Based on [Sagetendo's MAL-Stremio Addon](https://github.com/SageTendo/mal-stremio-addon), wich in turn bases itself on another utility. Even if it uses a different language (Python) and thus different frameworks, it has been hugely helpful for understanding the flow and routing necessary to do this kind of thing. Thank you @SageTendo !

## Normal program flow:
Whenever you start watching something on Stremio that matches some parameters set in the manifest (generated on `index.js`), the platform will call this addon. When the program can get the data for the item you are watching, it will let you know by having a language entry in the subtitles that looks something like `LB-[source of data, either TMDB or the Cinemeta addon]OK`. When it can't get the data, the entry wont be available.
#### Future flow:
When getting the data correctly, which is necessary for the following steps, log activity on the user's Letterboxd account.
Hypothetical: Update new Stremio Library items on Letterboxd's watchlist, or create a catalog based on the later.

## Run locally:
0. Previous steps: 
   1. This project runs on Node.js, so install both Node.js and the npm package manager
   2. You'll need to get all necessary API keys. Right now you only need to get keys for the TMDB API, wich is free. In the future, you will probably need a Letterboxd API key too.
   3. Enter those parameters inside a .env file like this:
      ```
      TMDB_API_READ_TOKEN = "yourTMDBAPIkey"
      LETTERBOXD_API_TOKEN = "yourLetterboxdAPIkey"
      ```
1. Clone the repo/dowload the code on your machine, and go to the projects directory (where `package.json` is)
2. Run the following command to install all necessary dependencies based on `package.json`:
   ```
   npm install
   ```
3. Run a local instance using `nodemon`, with the preprogrammed devStart command (`nodemon index.js` under the hood) with:
   ```
   npm run devStart
   ```
4. Make requests to the app on localhost:3000 or by using Stremio

## Acknowledgements:
![The Movie DataBase logo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg)
This application/addon uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.

In case TMDB doesn't work, the [Cinemeta Stremio Addon](https://v3-cinemeta.strem.io/) will be used to get metadata

## TO DO:
- [ ] Get access to letterboxd API
- [ ] Make config page for OAuth flow and manifest config
- [ ] Configure DataBase (will probably use MongoDB, but feel free to recommend other options)
### Enhancements/new features
- [ ] Investigate Stremio API
- [ ] Create catalog based on the user's letterboxd watchlist, probably using [`stremio-imdb-list`](https://github.com/jaruba/stremio-imdb-watchlist?tab=readme-ov-file#4-proxy-a-different-add-on-to-get-list-responses-based-on-list-id)

## Documentation used:
- [Stremio Addon guide](https://stremio.github.io/stremio-addon-guide/basics)
- [Stremio Addon docs](https://github.com/Stremio/stremio-addon-sdk/tree/master/docs)
- [Letterboxd API docs](https://api-docs.letterboxd.com/)
- Node.js docs
- Express.js docs
- [MDN docs](https://developer.mozilla.org/en-US/docs/Web)
- [JSDoc docs](https://jsdoc.app/)
