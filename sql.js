const express = require('express');
const bodyParse = require(`body-parser`);
const { Client } = require('pg');
const connectionString = "postgres://postgres:AlM@localhost:5432/postgres";

const client = new Client({
    connectionString: connectionString,
    user: "postgres",
    password: "AlM",
    database: "postgres",
    port: 5432
});

client.connect();
const app = express();
app.use(bodyParse.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.set('port', process.env.PORT || 4000);
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})