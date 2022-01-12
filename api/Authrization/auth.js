const dbConn = require('../../config/database');
const { check, validationResult, body } = require('express-validator');
const router = require('express').Router();
const upload = require('../../middlewares/upload');
const bcrypt = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const Crypto = require('crypto');

//Register 

router.post('/register', upload.single("profile"), 
check('userName', 'User Name is required').not().isEmpty(),
check('contactNumber', 'Contact number is required ').not().isEmpty().isMobilePhone(),
check('email','Email is required').isEmail(),
check('password', 'password is required').not().isEmpty(),
check('role', 'role is required').not().isEmpty(),
 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = {
    userName: req.body.userName,
    contactNumber:req.body.contactNumber,
    email: req.body.email,
    password:req.body.password,
    role: req.body.role
  };

  // To encrypt the password 
  const salt = bcrypt.genSaltSync(10);
  data.password = bcrypt.hashSync(data.password, salt)

   //Generate the Random Password
              
  var randomPassword = randomString();
   function randomString(size = 5) {  
   return Crypto.randomBytes(size).toString('base64').slice(0, size)
     }
       
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

     //Update the Auth table with Random Password
              
    let sql_lf ="UPDATE  auth SET secretKey='" + randomPassword + "' WHERE email='" + data.email + "'";
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
        SecretLey: randomPassword
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


// Login By Email,Password ANd Given Secret Key 

router.post('/login', 
check('password', 'password is required').not().isEmpty(),
check('email','email is required').not().isEmpty(),
check('secretKey','secret Key is required').not().isEmpty(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let email = req.body.email;
    let password = req.body.password;
    let secretKey = req.body.secretKey;
   let sql = "select * from auth where email='" + email + "'AND secretKey='" +secretKey +"'";
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
        Message: 'User does not find..!!',
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