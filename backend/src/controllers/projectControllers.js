const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().integer().presence("optional"),
      title: joi.string().max(45).presence(presence),
      description: joi
        .string()
        .max(800)
        .presence("optional")
        .allow(null)
        .allow(""),
      date: joi.date().presence("optional").allow(null).allow(""),
      webSiteLink: joi
        .string()
        .max(255)
        .presence("optional")
        .allow(null)
        .allow(""),
      gitHubLink: joi
        .string()
        .max(255)
        .presence("optional")
        .allow(null)
        .allow(""),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.project
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.project
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const project = req.body;
  const errors = validate(req.body);
  if (errors) {
    res.sendStatus(422);
  }
  project.id = parseInt(req.params.id, 10);

  models.project
    .update(project)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// eslint-disable-next-line consistent-return
const add = (req, res) => {
  const errors = validate(req.body);
  if (errors) return res.sendStatus(422);
  const project = req.body;
  models.project
    .insert(project)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err.errno === 1062) {
        res.status(409);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.project
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
