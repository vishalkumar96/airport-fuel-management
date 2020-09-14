const ApiError = require('../utils/apiError');
const db = require('../index');

exports.login = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        
        let connection = await db.getConnection();

        const query = `select * from user where username = ${username} and password = ${password} `;
        
        const result = await db.query(connection, query);

        if( result && result.length) {
            return res.status(200).json({ 'msg': 'User login successfully', status: 'success', data: []});
        } else {
            return res.status(400).json({ 'msg': 'User not found', status: 'error'})
        }
    } catch (err) {
        return next(new ApiError('Error occured while fetching airport transaction detail', 400));
    }
}
