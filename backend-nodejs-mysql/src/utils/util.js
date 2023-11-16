import { connection } from "../database/config.js";

// Lấy Dữ liệu
export function getData(resource) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${resource}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

// Tạo Dữ liệu

export function insertData(tableName, data) {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject("Data is null or undefined");
      return;
    }

    const dataArray = Array.isArray(data) ? data : [data];
    if (data.length === 0) {
      reject("Object array is empty");
      return;
    }

    const keys = Object.keys(dataArray[0]);
    const values = dataArray.map((obj) => keys.map((key) => obj[key]));
    const sql = `INSERT INTO ${tableName} (${keys.join(",")}) VALUES ?`;

    connection.query(sql, [values], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Sửa Dữ liệu
export function editData(tableName, id, updatedData) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${tableName} SET ? WHERE id = ?`;

    connection.query(sql, [updatedData, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// Xóa Dữ liệu
export function deleteData(tableName, id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${tableName} WHERE id = ?`;

    connection.query(sql, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Lấy dữ liệu theo id
export function getDataById(tableName, id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName} WHERE id = ?`;

    connection.query(sql, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}