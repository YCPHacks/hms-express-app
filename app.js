require('dotenv').config();
const express = require('express');

const router = require('./routes/index.js');

const app = express();

app.use(router);

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
