const ApiError = require('../utils/apiError');
const db = require('../index');

exports.addAircraft = async (req, res, next) => {
    const  { aircraft_no, airline,source, destination } = req.body;
    try {
        let connection = await db.getConnection();
        const query = `insert into aircraft(aircraft_no, airline, source, destination) values('${aircraft_no}', 
        '${airline}', '${source}', '${destination}');`;

        const result = await db.query(connection, query);
        return res.status(200).json({'msg': 'Aircraft added successfully', status: 'success', aircraft_id: result.insertId})

    } catch(err) {
        return next (new ApiError('Error occured while adding Aircraft',400));
    }

}

exports.listAircraft = async (req, res, next) => {
    try {
        let connection = await db.getConnection();
        const query = `select * from aircraft`;
        const result = await db.query(connection, query);
        return res.status(201).json({ 'msg': 'Aircraft list fetched successfully', status: 'success', data: result })

    } catch (err) {
        return next(new ApiError('Error occured while fetching aircraft', 400));
    }
}