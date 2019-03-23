const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/news', (req, res) => {
    res.send("This is greetings from server");
});

app.listen(process.env.PORT || 8081);