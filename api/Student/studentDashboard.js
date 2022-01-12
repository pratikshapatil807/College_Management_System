const dbConn = require('../../config/database');
const router = require('express').Router();
const { checkToken} = require("../../middlewares/authorization")


//View Particular Profile

router.post('/studentProfile', checkToken, async (req, res) => {
  try {
    let rollNo = req.body.rollNo;
   let sql = "select studentName, rollNo, instructorName,className, classDate, startTime, endTime from studentRegister where rollNo='" + rollNo + "'";
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



module.exports = router;
