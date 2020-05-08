const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res, next) => {
  db.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  db.get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => next(err));
});

router.post("/", validateProjectID, (req, res, next) => {
  console.log(req.body);

  db.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", (req, res, next) => {
  db.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  db.remove(req.params.id)
    .then((count) => {
      count == 1
        ? res.status(200).json({ msg: "action deleted" })
        : res.status(400).json({ msg: "action not found" });
    })
    .catch((err) => next(err));
});

function validateProjectID(err, req, res, next) {
  if (!req.body.project_id) {
    res.status(400).json({ msg: "needs project ID" }, err);
    next();
  } 
}

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  res.status(500).json(error);
}
module.exports = router;
