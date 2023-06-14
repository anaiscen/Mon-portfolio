const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  constructor() {
    super({ table: "project" });
  }

  insert(project) {
    return this.database.query(
      `insert into ${this.table} (title, description, date, webSiteLink, gitHubLink) values ( ?, ?, ?, ?, ?)`,
      [
        project.title,
        project.description,
        project.date,
        project.webSiteLink,
        project.gitHubLink,
      ]
    );
  }

  update(project) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      {
        title: project.title,
        description: project.description,
        date: project.date,
        webSiteLink: project.webSiteLink,
        gitHubLink: project.gitHubLink,
      },
      project.id,
    ]);
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} 
    WHERE id = ?`,
      [id]
    );
  }
}

module.exports = ProjectManager;
