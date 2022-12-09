const app = require('./server.js');

const port = 3000;

app.listen(port, async () => {
    console.log(`
      App is listening on port http://localhost:${port}; \n 
      Now connecting to Database \n
      Press Ctrl-C to terminate
    `);
  });


