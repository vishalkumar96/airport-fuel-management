const ApiError = require('../utils/apiError');
const db = require('../index');

const generateToken = (async (user) => {
    try {
        const token = await jwt.sign(user, 'MY_SECRET_API', {
            expiresIn: 604800,
        });
        return token;
    } catch (err) {
        return (new ApiError('Unable to generate token', 400));
    }
})

exports.login = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        
        let connection = await db.getConnection();

        const query = `select * from user where username = ${username} and password = ${password} `;
        
        const result = await db.query(connection, query);

        if( result && result.length) {
            
            const token = await generateToken(user);

            return res.status(200).json({ 'msg': 'User login successfully', status: 'success', data: {token, user}});

        } else {
            return res.status(400).json({ 'msg': 'User not found', status: 'error'})
        }
    } catch (err) {
        return next(new ApiError('Error occured while fetching airport transaction detail', 400));
    }
}
