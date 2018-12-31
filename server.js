let express  = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');

let employeeRoutes = require('./src/routes/employee');

let port = process.env.port || 8081;

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;

app.get('/', (req, res) => {
    res.send('Im from my first rest API');
});

app.use('/employee', employeeRoutes);

app.listen(port, function () {
    console.log("Server Started: " + port);
});
