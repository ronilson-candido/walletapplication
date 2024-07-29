const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Importar rotas
const verificationRoutes = require('./routes/verification');
app.use('/verification', verificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
