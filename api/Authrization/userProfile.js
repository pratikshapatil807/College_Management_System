const dbConn = require('../../config/database');
const router = require('express').Router();
const upload = require('../../middlewares/upload');
const bcrypt = require('bcryptjs');
const { checkToken } = require("../../middlewares/authorization");

// Update Profile 

router.post('/profileUpdate',checkToken,upload.single("profile"), 
async (req,res) => {
    let secretKey = req.body.secretKey;

     // To encrypt the password 
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt)

    try {
    let sql = "UPDATE auth SET userName='"+req.body.userName+"',email ='"+req.body.email+"', password = '"+req.body.password+"',contactNumber='"+req.body.contactNumber+"',role='"+req.body.role+"' WHERE secretKey='" + secretKey + "'";
    let query = await dbConn.query(sql,(err, results) => { 
   if(err) {
     res.json({
       Status:"false",
       Message:"Update Failed..!!",
       Error:err
     })
   }
      return res.status(200).json({
        Status: "True",
        Message: 'Profile Updated Successfully..!!',
      });
    });
  
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
          Status: "False",
          Message: 'Some thing went Wrong'   
        });
  }
  });

  // View Own Profile by Given Secret Key//

  router.post('/ViewProfile', checkToken, async (req, res) => {
    try {
      let secretKey = req.body.secretKey;
     let sql = "select userName,email, contactNumber, role from auth where secretKey='" + secretKey + "'";
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"View Profile Failed..!!",
          Error:err
        })
      }
      if (results.length) {
        res.status(200).json({
          Status: "True",
          Message: 'View Profile Successfully..!!',
          Result: results[0]
        });
        return;
      }
      res.status(500).json({
        Status: "False",
        Message: 'Record Not Found ..!!',
      });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
          Status: "False",
          Message: 'Some thing went Wrong'   
        });
  }
  });
  
  // Delete Own Profile By Given Secret Key //
  
  router.post('/peofileDelete', checkToken, async (req, res) => {
    try {
      let secretKey = req.body.secretKey
    let sql = "DELETE FROM auth WHERE secretKey='" + secretKey + "'";
    let query = await dbConn.query(sql, (err, results) => {
      if(err) {
        res.status(500).json({
          Status:"False",
          Message:"Deleting Profile Failed...!!",
          Error:err
        })
      }
      if (results.affectedRows == 0) {
        res.status(500).json({
          Status: "False",
          Message: 'Record Not Found..!!',
        });
        return;
      }
      res.status(200).json({
        Status: "True",
        Message: 'Profile Deleted Succesfully ..!!',
      });
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