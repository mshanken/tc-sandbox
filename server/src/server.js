const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const clientBuildPath = path.join(__dirname, '../../client/build');

app.use(express.static(clientBuildPath));

app.get('*', (req, res) =>
  res.sendFile(path.join(clientBuildPath, 'index.html'))
);

app.listen(port, () => console.log(`Running on port ${port}`));
