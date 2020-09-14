const ApiError = require('../utils/apiError');
const db = require('../index');

exports.addAirport = async (req, res, next) => {
    const  {airport_name, fuel_capacity} = req.body;
    try {
        let connection = await db.getConnection();
        const query = `insert into airport(airport_name, fuel_capacity, fuel_available) values('${airport_name}', '${fuel_capacity}', '${fuel_capacity}');`;

        const result = await db.query(connection, query);
        return res.status(201).json({'msg': 'airport added successfully', status: 'success', airport_id: result.insertId})

    } catch(err) {
        return next (new ApiError('Error occured while adding airport',400));
    }

}

exports.listAirport = async (req, res, next) => {
    try {
        let connection = await db.getConnection();
        const query = `select * from airport`;
        const result = await db.query(connection, query);
        return res.status(200).json({ 'msg': 'airport list fetched successfully', status: 'success', data: result })

    } catch (err) {
        return next(new ApiError('Error occured while fetching airport', 400));
    }
}

exports.transaction = async(req, res, next) => {
    try {
        const {transaction_type, airport_id, quantity} = req.body;
        let transaction_id_parent = req.body.transaction_id_parent || 0;
        let aircraft_id = req.body.aircraft_id;

        let transaction_date_time = new Date().toISOString().split('T')[0];
        let connection = await db.getConnection();

        const query = `insert into transaction(transaction_type, airport_id, aircraft_id, quantity, transaction_date_time,
        transaction_id_parent) values('${transaction_type}', '${airport_id}', '${aircraft_id}', '${quantity}', 
        '${transaction_date_time}', '${transaction_id_parent}');`;
        
        const result = await db.query(connection, query);
        const airPortData = await db.query(connection, `select fuel_available from airport where airport_id = ${airport_id}`);

        if(transaction_type.toLowerCase() == 'in' ) {
            let fuel_available = airPortData[0].fuel_available + quantity
            await db.query(connection, `update airport set fuel_available = ${fuel_available} where airport_id = ${airport_id}`);
        }

        if(transaction_type.toLowerCase() == 'out' ) {
            let fuel_available = airPortData[0].fuel_available - quantity
            await db.query(connection, `update airport set fuel_available = ${fuel_available} where airport_id = ${airport_id}`);
        }
        
        return res.status(201).json({ 'msg': 'airport list fetched successfully', status: 'success', transaction_id: result.insertId })

    } catch (err) {
        console.log(err);
        return next(new ApiError('Error occured while fetching airport', 400));
    } 
} 



exports.airportTransactionDetail = async (req, res, next) => {
    try {
        let airport_id = req.query.airport_id;
        
        let connection = await db.getConnection();

        const query = `select * from airport`;
        
        const result = await db.query(connection, query);
        if(result.length) {
            let transactionDetail = await db.query(connection, `select * from  where airport` );
            return res.status(200).json({ 'msg': 'airport list fetched successfully', status: 'success', data: transactionDetail })
        } else {
            return res.status(400).json({ 'msg': 'airport id does not exist', status: 'error'})

        }
    } catch (err) {
        return next(new ApiError('Error occured while fetching airport', 400));
    }
}
