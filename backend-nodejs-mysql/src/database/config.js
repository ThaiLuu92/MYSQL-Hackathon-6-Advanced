import mysql2 from "mysql2";
import "dotenv/config";

const SQL_DATABASE = process.env.SQL_DATABASE;
const SQL_PASSWORD = process.env.SQL_PASSWORD;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
};

const connection = mysql2.createConnection(
  dbConfig,
);

// Kết nối với cơ sở dữ liệu
const connectToDB = async () => {
  try {
    await connection.promise().connect();
    console.log("Kết nối thành công đến cơ sở dữ liệu MySQL");
  } catch (error) {
    console.error("Lỗi kết nối với cơ sở dữ liệu:", error);
  }
};



export { connectToDB,  connection };
