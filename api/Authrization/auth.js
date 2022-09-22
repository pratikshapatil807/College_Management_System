const dbConn = require('../../config/database');
const { check, validationResult, body } = require('express-validator');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const Crypto = require('crypto');
var nodemailer = require('nodemailer');
const upload = require('../../middlewares/upload');

// Faculty Register 

router.post('/register',upload.single('profile'), 
check('facultyName', 'Faculty Name is required').not().isEmpty(),
check('contactNumber', 'Contact number is required ').not().isEmpty().isMobilePhone(),
check('email','Email is required').isEmail(),
check('password', 'password is required').not().isEmpty(),
check('subject', 'subject is required').not().isEmpty(),
check('salary', 'Salary is required').not().isEmpty(),
 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = {
    facultyName: req.body.facultyName,
    contactNumber:req.body.contactNumber,
    email: req.body.email,
    password:req.body.password,
    subject:req.body.subject,
    salary:req.body.salary,
    profile: 'http:' + '//' + req.hostname + ':' + 5000 + '/' + req.file
  };

  // To encrypt the password 
  const salt = bcrypt.genSaltSync(10);
  data.password = bcrypt.hashSync(data.password, salt)

   //Generate the Random Password
              
  // var randomPassword = randomString();
  //  function randomString(size = 5) {  
  //  return Crypto.randomBytes(size).toString('base64').slice(0, size)
  //    }

   //Generating Emp_id;

  var employeeId = create_UUID();
   function create_UUID(){
    var dt = new Date().getTime();
      var uuid = 'EMP-xx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

console.log(employeeId);       
  try {
    //Make email as a unique 
    if(data.email){
      dbConn.query('SELECT * FROM auth WHERE email = ?', [data.email], 
      (error, response, fields)=>{
          if (response.length>0){
            res.status(500).json({
              Status:"False",
              Message:"Email Exit..!!",
            })
          } else
{
                 let sql = 'INSERT INTO auth SET ?';
  let query =  dbConn.query(sql,data, (err, results) => {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ppratiksha94@gmail.com',
        pass: 'pratiksha@developer'
      },
      tls:{
        rejectUnauthorized: false
    }
    });
    
    var mailOptions = {
      from: 'ppratiksha94@gmail.com',
      to: data.email,
      subject: 'Sending Email using Node.js',
      text:    'Thank you for Registeration Login Your accout with your registered Email and Password And This is your &Employee Id=' +employeeId,
      };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
    
     //Update the Auth table with Random Password
              
    let sql_lf ="UPDATE  auth SET  emp_id= '" +employeeId + "' WHERE email='" + data.email + "'";
      let query_lf = dbConn.query(sql_lf, (err, results) => {
              if(err) {
                  console.log(err)
                     }
                       });
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Registeration Failed..!!",
        Error:err
      })
    } 
    else {
      res.status(200).json({
        Status: "True",
        Message: 'Registered Successfully..!!',  
        // SecretLey: randomPassword,
        emp_id: employeeId,
        email: mailOptions,
        profile_url: `http://localhost:5000/profile/${req.file}`
      });
    }                
  });
}       
 }
   )}
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});


// Faculty Login By Email,Password 

router.post('/login', 
check('password', 'password is required').not().isEmpty(),
check('email','email is required').not().isEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let email = req.body.email;
    let password = req.body.password;
   let sql = "select * from auth where email='" + email +"'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Login Failed..!!",
        Error:err
      })
    }
    //To generate The Json Web Token
    const jsontoken = sign({results:results},'qwe1234', {
      expiresIn: '24h',
    });

    if (results.length > 0) {
      //Compare the hashed password from the database
      bcrypt.compare(password, results[0].password, function(err, response) {
        if (response) {
          req.user = results;
          res.status(200).json({
            Status: "True",
            Message: 'Login Successfully..!!',
            token:jsontoken
          });
        } else {
          res.status(500).json({ message: "Wrong username/password combination!" });
        }
      });
 
    } else {
      res.status(500).json({
        Status: "False",
        Message: 'Faculty does not find..!!',
      });
    }
  });
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});


// Student Register 

router.post('/studentRegister', upload.single('profile'),  
check('studentName', 'student Name is required').not().isEmpty(),
check('contactNumber', 'Contact number is required ').not().isEmpty().isMobilePhone(),
check('email','Email is required').isEmail(),
check('password', 'password is required').not().isEmpty(),
check('subject', 'subject is required').not().isEmpty(),

 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = {
    studentName: req.body.studentName,
    contactNumber:req.body.contactNumber,
    email: req.body.email,
    password:req.body.password,
    subject:req.body.subject,
    profile: 'http:' + '//' + req.hostname + ':' + 5000 + '/' + req.file.path
  };

  // To encrypt the password 
  const salt = bcrypt.genSaltSync(10);
  data.password = bcrypt.hashSync(data.password, salt)

        //Generating stu_id;

  var studentId = create_UUID();
  function create_UUID(){
   var dt = new Date().getTime();
     var uuid = 'STU-xx'.replace(/[xy]/g, function(c) {
       var r = (dt + Math.random()*16)%16 | 0;
       dt = Math.floor(dt/16);
       return (c=='x' ? r :(r&0x3|0x8)).toString(16);
   });
   return uuid;
}

console.log(studentId);
       
  try {
    //Make email as a unique 
    if(data.email){
      dbConn.query('SELECT * FROM studentauth WHERE email = ?', [data.email], 
      (error, response, fields)=>{
          if (response.length>0){
            res.status(500).json({
              Status:"False",
              Message:"Email Exit..!!",
            })
          } else
{
                 let sql = 'INSERT INTO studentauth SET ?';
  let query =  dbConn.query(sql,data, (err, results) => {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ppratiksha94@gmail.com',
        pass: 'pratiksha@developer'
      },
      tls:{
        rejectUnauthorized: false
    }
    });
    
    var mailOptions = {
      from: 'ppratiksha94@gmail.com',
      to: data.email,
      subject: 'Sending Email using Node.js',
      text:    'Thank you for Registeration Login Your accout with your registered Email and Password And This is your &Student Id=' +studentId,
      };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

     //Update the StudentAuth table with Random Password
              
    let sql_lf ="UPDATE studentauth SET student_id= '" +studentId + "'WHERE email='" + data.email + "'";
      let query_lf = dbConn.query(sql_lf, (err, results) => {
              if(err) {
                  console.log(err)
                     }
                       });
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Registeration Failed..!!",
        Error:err
      })
    } 
    else {
      res.status(200).json({
        Status: "True",
        Message: 'Registered Successfully..!!',  
        // SecretLey: randomPassword,
        student_id: studentId,
        Email: mailOptions,
        profile_url: `http://localhost:5000/profile/${req.file.filename}`
      });
    }                
  });
}       
 }
   )}
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});


// Student Login By Email,Password 

router.post('/studentlogin', 
check('password', 'password is required').not().isEmpty(),
check('email','email is required').not().isEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let email = req.body.email;
    let password = req.body.password;
   let sql = "select * from studentauth where email='" + email + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Login Failed..!!",
        Error:err
      })
    }
    //To generate The Json Web Token
    const jsontoken = sign({results:results},'qwe1234', {
      expiresIn: '24h',
    });

    if (results.length > 0) {
      //Compare the hashed password from the database
      bcrypt.compare(password, results[0].password, function(err, response) {
        if (response) {
          req.user = results;
          res.status(200).json({
            Status: "True",
            Message: 'Login Successfully..!!',
            token:jsontoken
          });
        } else {
          res.status(500).json({ message: "Wrong username/password combination!" });
        }
      });
 
    } else {
      res.status(500).json({
        Status: "False",
        Message: 'Student does not find..!!',
      });
    }
  });
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});

// Admin Login By Email,Password

router.post('/adminlogin', 
check('password', 'password is required').not().isEmpty(),
check('email','email is required').not().isEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let email = req.body.email;
    let password = req.body.password;
   let sql = "select * from adminauth where email='" + email + "' AND password='" +password + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Login Failed..!!",
        Error:err
      })
    }
    //To generate The Json Web Token
    const jsontoken = sign({results:results},'qwe1234', {
      expiresIn: '24h',
    });

    if (results.length > 0) {
          res.status(200).json({
            Status: "True",
            Message: 'Login Successfully..!!',
            token:jsontoken
          });
        } else {
          res.status(500).json({
                  Status: "False",
                  Message: 'Admin does not find..!!',
                });
        }
      });
} catch (err) {
  console.error(err.message);
  return res.status(500).send({
        Status: "False",
        Message: 'Some thing went Wrong'   
      });
}
});

  module.exports = router;