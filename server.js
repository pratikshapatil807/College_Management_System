const express = require("express");
const bodyParser = require("body-parser");

//create express app
const app = express();

//setup server code port
const port = process.env.PORT || 5000;

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

//Parse request Data content type appkication/x-ww-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse request data content type appkication/json
app.use(bodyParser.json());

//define the route of the server
app.get('/' ,(req, res) => {
    res.send("Hello world");
});

app.use('/api/Authrization',require('./api/Authrization/auth'));
app.use('/api/userProfile',require('./api/Authrization/userProfile'));
app.use('/api/classManagement',require('./api/Instructor/classManagement'));
app.use('/api/studentManagement',require('./api/Teacher/studentManagement'));
app.use('/api/studentDashboard',require('./api/Student/studentDashboard'));


//listen the port
app.listen(port, () => {
    console.log(`Express is running at port ${port}`);
})