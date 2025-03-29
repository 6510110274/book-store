import knex from 'knex'
import appConfig from './config';
import knexStringcase from 'knex-stringcase'; 

const db = knex(knexStringcase({
  client: 'mysql2',
  connection: appConfig.dbConnectionInfo,
  useNullAsDefault: true,
}));


export default db;