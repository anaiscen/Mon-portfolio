// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");

// const app = express();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "upload");
//   },
//   filename(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

// app.use(cors());
// app.use(express.json());

// // eslint-disable-next-line consistent-return
// app.post("/img", upload.single("picture"), (req, res, next) => {
//   const { file } = req;
//   if (!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     return next(error);
//   }

//   res.status(200).send(file);
// });

// app.listen(8000, () => {
//   // eslint-disable-next-line no-restricted-syntax
//   console.log("server listening on port 8001");
// });
