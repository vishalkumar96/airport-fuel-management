const jwt = require('jsonwebtoken');

const tokenVerification =  (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) return res.status(401).json({'msg':'Unauthorized user',  status: 'error'})
    token = token.replace('JWT ', '');
    try {
        const decoded = jwt.verify(token, 'MY_SECRET_API');
        next()
    } catch (err) {
        res.status(401).json({'status':'error', 'msg': 'Unauthorized user'})
    }
}
module.exports = {
    tokenVerification
}