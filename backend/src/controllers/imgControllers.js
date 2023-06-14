const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.img
    .findAll(req.params.projectId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { imageName } = req.params;
  const readStream = fs.createReadStream(`../public/images/${imageName}`);
  readStream.pipe(res);
};

// eslint-disable-next-line consistent-return
const add = (req, res) => {
  const img = {
    src: req.file.filename,
    projectId: req.body.projectId,
  };
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
  add,
  destroy,
};
