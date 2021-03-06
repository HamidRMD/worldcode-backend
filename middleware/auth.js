const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
   
    let token = req.headers.authorization.split(' ')[1]
    let tokenLesbar = jwt.verify(token, process.env.JWT || 'ein Geheimnis')
   
    req.tokenNutzer = tokenLesbar
    next()
  } catch (error) {
    return res.status(401).send('Konnte nicht einloggen!')
  }
}
