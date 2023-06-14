const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().integer().presence("optional"),
      firstname: joi.string().max(45).presence(presence),
      lastname: joi.string().max(45).presence(presence),
      login: joi.string().max(45).presence(presence),
      hashedPassword: joi.string().max(255).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const findByEmailToNext = (req, res, next) => {
  const { login } = req.body;
  models.user
    .findByEmail(login)
    .then(([result]) => {
      if (result[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = result[0];
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// eslint-disable-next-line consistent-return
const add = (req, res) => {
  const errors = validate(req.body);
  if (errors) return res.sendStatus(422);
  console.warn(errors);
  const { firstname, lastname, login, hashedPassword } = req.body;
  models.user
    .insert(firstname, lastname, login, hashedPassword)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err.errno === 1062) {
        res.status(409).send("User already exists");
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};

module.exports = {
  findByEmailToNext,
  add,
};
