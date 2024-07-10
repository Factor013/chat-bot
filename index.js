const express = require('express');
const cors = require('cors')
const routes  = require('./src/routes/Routes')

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.SERVER_PORT || 3000, () => {

    console.log('Server ON');

});
app.get('/', (request, response) =>{
    response.status(200).send('Hello World');
});