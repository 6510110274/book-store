import dbConnectionInfo from './db-conn.json'

const isProd = process.env.NODE_ENV == 'production' //Production mode isProd = True
let appConfig = {
  isProd,
  clearDataBeforeLodingFixture: isProd ? false : true, //Production mode not allow clear data
  dbConnectionInfo,
}

export default appConfig;