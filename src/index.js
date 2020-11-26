const express = require('express');
const app = express();

// Settings
// app.set('port', 8081);
 app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

app.get('/', (req, res) => { 
      res.json("Holas"); 
  
});
// Routes
 app.use(require('./routes/employees'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
