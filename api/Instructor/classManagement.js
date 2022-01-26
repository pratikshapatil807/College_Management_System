const dbConn = require('../../config/database');
const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const { checkToken} = require("../../middlewares/authorization");
const { response } = require('express');


// View faculty and Student details by subject Profile 

router.post('/viewstudentTeacher', checkToken, 
check('subject', 'subject is required').not().isEmpty(),
 (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  let data = {
    subject: req.body.subject,
  };
  try {
    let sql = "select userName,emp_id from auth where subject='" + data.subject + "'";
    let query =  dbConn.query(sql, (err, result) => {

      let sql_lf = "select studentName,student_id from studentauth where subject='" + data.subject + "'";
    let query_lf =  dbConn.query(sql_lf, (err, Results) => {

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
             Faculty: result,
            //  data: data,
             student: Results
         });   
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

// Schedule Class

router.post('/scheduleClass', checkToken, 
check('emp_id', 'emp_id is required').not().isEmpty(),
check('student_id','student_id is required').not().isEmpty(),
check('subject', 'subject is required').not().isEmpty(),
check('startDate','startDate is required').not().isEmpty(),
check('endDate','endDate is required').not().isEmpty(),
check('startTime', 'startTime required').not().isEmpty(),
check('endTime','endTime is required').not().isEmpty(),
check('days','days is required').not().isEmpty(),
 (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  let data = {
    emp_id: req.body.emp_id,
    student_id: req.body.student_id,
    username: req.body.username,
    studentName: req.body.studentName,
    subject: req.body.subject,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    days: req.body.days,
  };
  try {
    let sql = "select userName from auth where emp_id='" + data.emp_id + "'";
    let query =  dbConn.query(sql, (err, result) => {

      let sql_lf = "select studentName from studentauth where student_id='" + data.student_id + "'";
    let query_lf =  dbConn.query(sql_lf, (err, Results) => {

  let sql_insert = 'INSERT INTO classmanagement SET ?';
 let query_insert =  dbConn.query(sql_insert, data, (err, results) => {});
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
             data: data,
             Faculty: result,
             Student: Results,
           
         });   
  }); 
    })   
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
  let sql = "UPDATE classmanagement SET emp_id='"+req.body.emp_id+"',student_id='"+req.body.student_id+"',   username='"+req.body.username+"', studentName='"+req.body.studentName+"', subject='"+req.body.subject+"', startDate='"+req.body.startDate+"',  endDate='"+req.body.endDate+"', startTime='"+req.body.startTime+"', endTime='"+req.body.endTime+"' WHERE class_id='" + class_id + "'";
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

// List schuduled class details 

router.post('/listClass', checkToken, async (req, res) => {
  try {
    let class_id = req.body.class_id;
  let sql = "SELECT * from classmanagement WHERE class_id ='" + class_id + "'";
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


// Add Event

router.post('/addevent', checkToken, 
check('eventName', 'eventName is required').not().isEmpty(),
check('description','description is required').not().isEmpty(),
check('date', 'date is required').not().isEmpty(),
 (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  let data = {
    eventName: req.body.eventName,
    description: req.body.description,
    date: req.body.date,
  };
  try {
  let sql_insert = 'INSERT INTO event SET ?';
 let query_insert =  dbConn.query(sql_insert, data, (err, results) => {;
     if(err) {
   return res.json ({
      Status: "Failed",
         Message:"Creating event Failed..!!",
            Error: err
             })
        }
   return res.status(200).json({
         Status: "True",
             Message: 'Event Created Successfully..!!',  
           
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

// View Event

router.post('/ViewEvent',  async (req, res) => {
  try {
    let id = req.body.id
   let sql = "select * from event where id='" + id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"View Event Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'View Event Successfully..!!',
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

// Delete Event  //

router.post('/deleteevent', checkToken, async (req, res) => {
  try {
    let id = req.body.id
  let sql = "DELETE FROM event WHERE id='" + id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Deleting Event Failed...!!",
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
      Message: 'Event Deleted Succesfully ..!!',
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

  
// Update Event

router.post('/updateEvent',checkToken, 
async (req,res) => {
    let id = req.body.id;

    try {   
    let sql = "UPDATE event SET eventName='"+req.body.eventName+"',description ='"+req.body.description+"', date = '"+req.body.date+"'WHERE id='" + id + "'";
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
        Message: 'Event Updated Successfully..!!',
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


  // Add Holiday

router.post('/addholiday', checkToken, 
check('reason', 'reason is required').not().isEmpty(),
check('date', 'date is required').not().isEmpty(),
 (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  let data = {
    reason: req.body.reason,
    date: req.body.date
  };
  try {
  let sql_insert = 'INSERT INTO holiday SET ?';
 let query_insert =  dbConn.query(sql_insert, data, (err, results) => {;
     if(err) {
   return res.json ({
      Status: "Failed",
         Message:"Creating event Failed..!!",
            Error: err
             })
        }
   return res.status(200).json({
         Status: "True",
             Message: 'Event Created Successfully..!!',  
           
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

// View Holiday

router.post('/ViewHoliday',  async (req, res) => {
  try {
    let id = req.body.id
   let sql = "select * from holiday where id='" + id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"View Holiday Failed..!!",
        Error:err
      })
    }
    if (results.length) {
      res.status(200).json({
        Status: "True",
        Message: 'View Holiday Successfully..!!',
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

// Delete Holiday

router.post('/deleteholiday', checkToken, async (req, res) => {
  try {
    let id = req.body.id
  let sql = "DELETE FROM holiday WHERE id='" + id + "'";
  let query = await dbConn.query(sql, (err, results) => {
    if(err) {
      res.status(500).json({
        Status:"False",
        Message:"Deleting holiday Failed...!!",
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
      Message: 'Holiday Deleted Succesfully ..!!',
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

  
// Update holiday

router.post('/updateholiday',checkToken, 
async (req,res) => {
    let id = req.body.id;

    try {   
    let sql = "UPDATE holiday SET reason='"+req.body.reason+"',date = '"+req.body.date+"'WHERE id='" + id + "'";
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
        Message: 'Holiday Updated Successfully..!!',
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
