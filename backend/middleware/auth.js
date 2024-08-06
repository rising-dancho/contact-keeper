const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token'); //key tp the token inside the header

  // Check if token doesnt exist
  if (!token) {
    return res.status(401).send({ msg: 'No token,  authorization denied' });
  }

  // Decode the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user; // replacing the value in req.user with the decoded version
    next();
  } catch (error) {
    res.status(401).send({ msg: 'Token is not valid' });
  }
};
