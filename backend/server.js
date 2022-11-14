const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.static('./backend/static'));
app.use(express.json());
// app.use(morgan('tiny'));



app.listen(port, async () => {
  console.log(`
    App is listening on port http://localhost:${port}; \n 
    Now connecting to Database \n
    Press Ctrl-C to terminate
  `);
  // await client.connect();
});

// process.on('exit', () => {
//   client.end();
// });

// The route below is a wildcard fallback route , may need to be more specific e.g 404 etc
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});