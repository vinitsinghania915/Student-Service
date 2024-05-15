const mysql = require(`mysql2`);
const mysqlConfig = require(`${__dirname}/../configs/config`)["mysql"];
const conPool = mysql.createPool(mysqlConfig);
conPool.getConnection(function (error, connection) {
  if (error) {
    console.error(error);
  }
});
module.exports = {
  connection: async () => {
    return new Promise((resolve, reject) => {
      conPool.getConnection(function (error, connection) {
        if (error) {
          console.error(error);
        }
        return resolve(connection);
      });
    });
  },
  execquery: async (query, params = [], single = false) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      conPool.query(query, params, function (error, result, fields) {
        if (error) {
          console.log("error", error);
        } else {
          response.success = true;
          response.status = 200;
          response.res = single && Boolean(result[0]) ? result[0] : result;
        }
        return resolve(response);
      });
    });
  },
};
