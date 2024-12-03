# letterboxd-stremio-addon
 Node.js & Express based addon trying to sync watched movies on Stremio with Letterboxd activity. (I'm new to backend so I'm using it as a learning experience)

Based on [Sagetendo's MAL-Stremio Addon](https://github.com/SageTendo/mal-stremio-addon), wich in turn bases itself on another utility. Even if it uses a different language (Python) and thus different frameworks, it has been hugely helpful for understanding the flow and routing necessary to do this kind of thing. Thank you @SageTendo !

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
