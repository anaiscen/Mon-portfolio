const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(firstname, lastname, login, hashedPassword) {
    return this.database.query(
      `INSERT INTO ${this.table} ( firstname,
        lastname,
        login,
        hashedPassword) VALUES (?, ?, ?, ?)`,
      [firstname, lastname, login, hashedPassword]
    );
  }

  findByEmail(login) {
    return this.database.query(
      `SELECT user.id, firstname,
      lastname,
      login,
      hashedPassword
      FROM ${this.table}
      WHERE login = ?`,
      [login]
    );
  }
}

module.exports = UserManager;
