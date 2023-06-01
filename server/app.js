const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(201).json('server created');
});

app.listen(port, () => {
  console.log(`server started at port no ${port}`);
});
