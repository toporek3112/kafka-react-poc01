const express = require('express')
const bodyParser = require('body-parser')
const myKafka = require('./myKafka');

const app = express();

const data = [{
    "topic":"first_topic",
    "value":"karol",
    "offset":37,
    "partition":0,
    "highWaterOffset":38,
    "key":null,
    "timestamp":"2020-09-16T11:59:51.337Z"
},
{
    "topic":"first_topic",
    "value":"barbara",
    "offset":38,
    "partition":0,
    "highWaterOffset":38,
    "key":null,
    "timestamp":"2020-09-16T11:59:51.437Z"
}]

app.use(express.static(__dirname))

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile('./main.html', { root: __dirname })
})

app.post('/sendMessage', (req, res) => {
    let message = req.body.message

    console.log(` [Writing] Message: ${message}`);

    myKafka.writeToKafka(message)
    res.send({message: message});
})

app.get('/readMessage', (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",

        // enabling CORS
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    })

    myKafka.readFromKafka().pipe(res);
})

app.get("/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",

        // enabling CORS
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    })

    setInterval(() => {
        res.write(`data: ${JSON.stringify(data)}\n\n`)
    }, 2000)
})


app.listen(5000, () => {
    console.log('App listening on port 5000');
})