const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const connectDb = async () => {
  db.connect((err) => {
    if (err) {
      throw err;
    }
    // .cyan.underline is from the colors package to color this line in console
    console.log(`Connected to database`.cyan.underline);
  });
};

module.exports = {
  db,
  connectDb,
};
