const express = require('express');

const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
