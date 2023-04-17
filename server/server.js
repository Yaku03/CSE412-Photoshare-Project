const express = require('express');
const routes = require('./src/routes');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.listen(port, () => {console.log(`app listening on port ${port}`)});
