import mysql from 'promise-mysql';
var Promise = require('bluebird');
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.then((r: any) => r.getConnection().then((connection:any)=>{
    r.releaseConnection(connection);
    console.log('DB is connected.')
}));

export default pool;