const dbConn = require('../../config/database');
const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const { checkToken} = require("../../middlewares/authorization");


// Schedule Class

router.post('/scheduleClass', checkToken, 
check('instructorName', 'Instructor Name is required').not().isEmpty(),
check('className', 'className is required').not().isEmpty(),
check('classDate','classDate is required').not().isEmpty(),
check('startTime', 'startTime required').not().isEmpty(),
check('endTime','endTime is required').not().isEmpty(),
 (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  let data = {
    instructorName: req.body.instructorName,
    className: req.body.className,
    classDate: req.body.classDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime, 
  };
  try {

  let sql = 'INSERT INTO classmanagement SET ?';
 let query =  dbConn.query(sql, data, (err, results) => { 
  if(err) {
   return res.json ({
      Status: "Failed",
         Message:"Creating Class Failed..!!",
            Error: err
             })
        }
   return res.status(200).json({
         Status: "True",
             Message: 'Class Created Successfully..!!',  
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


// Update class Schule details 

router.post('/UpdateClassSchudule',checkToken, 
async (req,res) => {
  let class_id = req.body.class_id;
  try {
  let sql = "UPDATE classmanagement SET instructorName='"+req.body.instructorName+"', className='"+req.body.className+"', classDate='"+req.body.classDate+"', startTime='"+req.body.startTime+"', endTime='"+req.body.endTime+"' WHERE class_id='" + class_id + "'";
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
      Message: 'Class Data Updated Successfully..!!',
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

// List own class details 

router.post('/listClass', checkToken, async (req, res) => {
  try {
    let id = req.body.id;
    let class_id = req.body.class_id;
  let sql = "SELECT instructorName,className,classDate, startTime, endTime from classmanagement WHERE class_id ='" + class_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching instructor class Data Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Fetching instructor class Data Success..!!',
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


// Delete Class 

router.post('/classDelete', checkToken,async (req, res) => {
  try {
    let class_id = req.body.class_id
  let sql = "DELETE FROM classmanagement WHERE class_id='" + class_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Deleting Class Data Failed...!!",
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
      Message: 'Class Data Deleted Succesfully ..!!',
     
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
