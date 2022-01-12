const { verify } = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization');
    if (token) {
      token = token.slice(7);
      verify(token, 'qwe1234', (err, decoded) => {
        if (err) {
          res.status(500).json({
            success: 500,
            message: 'Invalid token',
          });
        } else {
          next();
        }
      });
    } else {
      res.status(500).json({
        success: 500,
        message: 'Access denained! unauthorised usee',
      });
    }
  },
};

