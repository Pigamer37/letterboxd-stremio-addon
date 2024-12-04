# letterboxd-stremio-addon
 Node.js & Express based addon trying to sync watched movies on Stremio with Letterboxd activity. (I'm new to backend so I'm using it as a learning experience)

Based on [Sagetendo's MAL-Stremio Addon](https://github.com/SageTendo/mal-stremio-addon), wich in turn bases itself on another utility. Even if it uses a different language (Python) and thus different frameworks, it has been hugely helpful for understanding the flow and routing necessary to do this kind of thing. Thank you @SageTendo !

## Acknowledgements:
![The Movie DataBase logo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg)
This application/addon uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.

In case TMDB doesn't work, the [Cinemeta Stremio Addon](https://v3-cinemeta.strem.io/) will be used to get metadata

## TO DO:
- Get access to letterboxd API
- Make config page for OAuth flow and manifest config
- Configure DataBase (will probably use MongoDB, but feel free to recommend other options)
- Create catalog based on the user's letterboxd watchlist, probably using [`stremio-imdb-list`](https://github.com/jaruba/stremio-imdb-watchlist?tab=readme-ov-file#4-proxy-a-different-add-on-to-get-list-responses-based-on-list-id)

## Documentation used:
- [Stremio Addon guide](https://stremio.github.io/stremio-addon-guide/basics)
- [Stremio Addon docs](https://github.com/Stremio/stremio-addon-sdk/tree/master/docs)
- [Letterboxd API docs](https://api-docs.letterboxd.com/)
- Node.js docs
- Express.js docs
- [MDN docs](https://developer.mozilla.org/en-US/docs/Web)
- [JSDoc docs](https://jsdoc.app/)
