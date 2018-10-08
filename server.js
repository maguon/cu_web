const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'web')));

app.listen(9200, () => {
    console.info(`server started at localhost:${9200} ` + new Date().toLocaleString());
})