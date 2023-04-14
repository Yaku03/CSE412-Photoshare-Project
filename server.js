const express = require('express');
const routes = require('./src/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api', routes);
app.listen(port, () => {console.log(`app listening on port ${port}`)});
