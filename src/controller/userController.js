const ApiError = require('../utils/apiError');
const db = require('../index');
const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
    try {
        const token = await jwt.sign(user, 'MY_SECRET_API', {
            expiresIn: 604800,
        });
        return token;
    } catch (err) {
        return (new ApiError('Unable to generate token', 400));
    }
}

exports.login = async (req, res, next) => {
    try {
        let {email, password} = req.body;
        
        let connection = await db.getConnection();

        const query = `select * from user where email = '${email}' and password = '${password}' `;
        
        const result = await db.query(connection, query);

        if( result && result.length) {
            const token = await generateToken({email:result[0].email, password:result[0].password});
            return res.status(200).json({ 'msg': 'User login successfully', status: 'success', data: {token, result}});

        } else {
            return res.status(400).json({ 'msg': 'User not found', status: 'error'})
        }
    } catch (err) {
        return next(new ApiError('Error occured while fetching airport transaction detail', 400));
    }
}
