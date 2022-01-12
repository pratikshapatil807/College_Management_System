const dbConn = require('../../config/database');
const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const { checkToken} = require("../../middlewares/authorization")

// Create Student Profile

router.post('/createStudent', checkToken, 
check('studentName', 'Student Name is required').not().isEmpty(),
check('rollNo', 'Roll Number is requird').not().isEmpty(),
check('instructorName' ,'instructorName Is required').not().isEmpty(),
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
    studentName: req.body.studentName,
    instructorName: req.body.instructorName,
    rollNo: req.body.rollNo,
    className: req.body.className,
    classDate: req.body.classDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
try {
  //Make Roll Number as a unique 
  if(data.rollNo){
    dbConn.query('SELECT * FROM studentRegister WHERE rollNo = ?', [data.rollNo], 
    (error, response, fields)=>{
        if (response.length>0){
          res.status(500).json({
            Status:"False",
            Message:"Roll Number Exit..!!",
          })
        } else
{
               let sql = 'INSERT INTO studentRegister SET ?';
let query =  dbConn.query(sql,data, (err, results) => {
  if(err) {
    res.status(500).json({
      Status:"False",
      Message:"Creating Student Failed..!!",
      Error:err
    })
  } 
  else {
    res.status(200).json({
      Status: "True",
      Message: 'Creating Student Successfully..!!',  
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


// Update Student Profile 

router.post('/studentUpdate',checkToken, 
async (req,res) => {
  let student_id = req.body.student_id;
  try {
  let sql = "UPDATE studentRegister SET studentName='"+req.body.studentName+"',rollNo='"+req.body.rollNo+"', instructorName='"+req.body.instructorName+"', className='"+req.body.className+"', classDate='"+req.body.classDate+"', startTime='"+req.body.startTime+"', endTime='"+req.body.endTime+"' WHERE student_id='" + student_id + "'";
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
      Message: 'Student Data Updated Successfully..!!',
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

//View Particular Student Profile

router.post('/liststudent', checkToken, async (req, res) => {
  try {
    let student_id = req.body.student_id;
   let sql = "select studentName, rollNo, instructorName,className, classDate, startTime, endTime from studentRegister where student_id='" + student_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching Student Data Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Fetching student Data Success..!!',
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

//View All Student Profile

router.post('/allStudentProfile', checkToken, async (req, res) => {
  try {
   let sql = "select studentName, rollNo, instructorName,className, classDate, startTime, endTime from studentRegister";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching Student Data Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Fetching student Data Success..!!',
        Result: results
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

//View All Instuctor Profile

router.post('/allInstructorProfile', checkToken, async (req, res) => {
  try {
   let sql = "select instructorName,className, classDate, startTime, endTime from classmanagement";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Fetching Instructor Data Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'Fetching Instructor Data Success..!!',
        Result: results
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

// Delete Student Profile //

router.post('/studentDelete', checkToken,async (req, res) => {
  try {
    let student_id = req.body.student_id
  let sql = "DELETE FROM studentRegister WHERE student_id='" + student_id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Deleting Student Data Failed...!!",
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
      Message: 'Student Data Deleted Succesfully ..!!',
     
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
