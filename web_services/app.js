const express = require('express')
const bodyParser = require('body-parser');
const routesLeader = require('./routes/cp');
const port = 3001;

const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/cp', routesLeader);
app.use(function (req, res, next) {
    res.status(404).send("Not found");
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Error: something went wrong');
});
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`));