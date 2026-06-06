import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const salt = bcrypt.genSaltSync(10);

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "jwt",
// });

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const handleCreateUser = async (email, password, username) => {
  let hash = hashPassword(password);

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  await connection.execute(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hash, username],
  );
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  const [rows, fields] = await connection.execute("SELECT * FROM users");
  return rows;
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  await connection.execute("DELETE FROM users WHERE id = ?", [id]);
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  const [rows, fields] = await connection.execute(
    "SELECT * FROM users WHERE id = ?",
    [id],
  );

  return rows;
};

const UpdateUser = async (id, email, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  await connection.execute(
    "UPDATE users SET email = ?, username = ? WHERE id = ?",
    [email, username, id],
  );
};

module.exports = {
  handleCreateUser,
  getUserList,
  UpdateUser,
  deleteUser,
  getUserById,
};
