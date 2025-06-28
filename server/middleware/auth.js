const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = auth;


// try {
//   let token = req.headers["x-access-token"];
//   console.log(token)
//   if (!token) {
//     return res.status(403).send({
//       status: "fail",
//       message: "No token provided!"
//     });
//   }