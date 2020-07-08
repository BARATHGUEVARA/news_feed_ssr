import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/app/App';

const PORT = process.env.PORT || 3006;
const app = express();
const fetch = require("node-fetch");



app.get('/', (req, res) => {
  try {
    const page = req.query.page;
    let reqURL = 'https://hn.algolia.com/api/v1/search?tags=front_page';
    if(page) {
      reqURL += `&page=${page}`
    }
    fetch(reqURL)
      .then(res => res.json())
      .then(result => {
        if (!result || !result.hits) {
          return res.status(500).send('Oops, better luck next time!');
        }
        if(!result.hits.length) {
          res.redirect(301, '/');
          return;
        }
        const app = ReactDOMServer.renderToString(<App data={JSON.stringify(result)} isServer />);
        const indexFile = path.resolve('./build/index.html');
        fs.readFile(indexFile, 'utf8', (err, data) => {
          if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
          }
          return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(result)}</script>`)
          );
        });
      });
  } catch (err) {
    console.error('Something went wrong:', err);
    return res.status(500).send('Oops, better luck next time!');
  }
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});