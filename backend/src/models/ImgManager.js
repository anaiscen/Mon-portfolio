const AbstractManager = require("./AbstractManager");

class ImgManager extends AbstractManager {
  constructor() {
    super({ table: "img" });
  }

  insert(img) {
    return this.database.query(
      `insert into ${this.table} (src, projectId) values (?, ?)`,
      [img.src, img.projectId]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} 
    WHERE id = ?`,
      [id]
    );
  }

  findAll(projectId) {
    return this.database.query(
      `select id, src,
  projectId FROM img  WHERE projectId = ?`,
      [projectId]
    );
  }
}

module.exports = ImgManager;
