const dbConn = require('../../config/database');
const router = require('express').Router();
const upload = require('../../middlewares/upload');
const bcrypt = require('bcryptjs');
const { checkToken } = require("../../middlewares/authorization");

// Update Faculty Profile 

router.post('/profileUpdate',checkToken,upload.single("profile"), 
async (req,res) => {
    let id = req.body.id;

     // To encrypt the password 
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt)

    try {   
    let sql = "UPDATE auth SET facultyName='"+req.body.facultyName+"',email ='"+req.body.email+"', password = '"+req.body.password+"',subject='"+req.body.subject+"',contactNumber='"+req.body.contactNumber+"',salary='"+req.body.salary+"' WHERE id='" + id + "'";
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

  // View faculty Profile 

  router.post('/ViewProfile', checkToken, async (req, res) => {
    try {
      let id = req.body.id
     let sql = "select emp_id, facultyName,email, contactNumber, subject, salary from auth where id='" + id + "'";
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
  
  // Delete faculty Profile  //
  
  router.post('/profileDelete', checkToken, async (req, res) => {
    try {
      let id = req.body.id
    let sql = "DELETE FROM auth WHERE id='" + id + "'";
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


  
// Update student Profile 

router.post('/studentprofileUpdate',checkToken,upload.single("profile"), 
async (req,res) => {
    let id = req.body.id;

     // To encrypt the password 
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt)

    try {   
    let sql = "UPDATE studentauth SET studentName='"+req.body.studentName+"',email ='"+req.body.email+"', password = '"+req.body.password+"',subject='"+req.body.subject+"',contactNumber='"+req.body.contactNumber+"'WHERE id='" + id + "'";
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


    // View student Profile 

    router.post('/ViewstudentProfile', checkToken, async (req, res) => {
      try {
        let id = req.body.id
       let sql = "select student_id, studentName,email, contactNumber, subject from studentauth where id='" + id + "'";
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

    // Delete student Profile  //
  
  router.post('/studentprofileDelete', checkToken, async (req, res) => {
    try {
      let id = req.body.id
    let sql = "DELETE FROM studentauth WHERE id='" + id + "'";
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