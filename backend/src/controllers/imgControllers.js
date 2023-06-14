const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().integer().presence("optional"),
      src: joi.string().max(600).presence(presence),
      projectId: joi.number().integer().presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.img
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
  models.img
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
  const img = req.body;
  const errors = validate(req.body);
  if (errors) {
    res.sendStatus(422);
  }
  img.id = parseInt(req.params.id, 10);

  models.img
    .update(img)
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
  const img = req.body;
  models.img
    .insert(img)
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
  models.img
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
