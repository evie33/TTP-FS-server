const express = require('express');
const app = express();

app.get('/api/xx', (req, res) => {
  const body = [
    {
      id: 1
    }
  ];
  res.json(body);
  console.log(body);
});
const port = 5000;

app.listen(port, () => {
  console.log(`server running on port ${port} `);
});
