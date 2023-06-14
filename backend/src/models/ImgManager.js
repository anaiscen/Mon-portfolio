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

  update(img) {
    return this.database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      {
        src: img.src,
        projectId: img.projectId,
      },
      img.id,
    ]);
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
