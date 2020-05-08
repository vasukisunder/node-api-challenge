const express = require("express");
const db = require("../data/helpers/projectModel");
const actionDb = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res, next) => {
  db.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  db.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => next(err));
});

router.get("/:id/actions", (req, res, next) => {
    db.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch((err) => next(err));

})

router.post("/", (req, res, next) => {
    db.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch((err) => next(err));
})

router.post("/:id/actions", (req, res, next) => {
    req.body.project_id = req.params.id;
    actionDb.insert(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch((err) => next(err));
})

router.put("/:id", (req, res, next) => {
    db.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch((err) => next(err));
})

router.delete("/:id", (req, res, next) => {
    db.remove(req.params.id)
    .then(count => {
        count == 1 ? 
        res.status(200).json({msg: "project deleted"}) : res.status(400).json({msg: "project not found"})
    })
    .catch((err) => next(err));
})


router.use(errorHandler);

function errorHandler(error, req, res, next) {
  res.status(500).json(error.message);
}
module.exports = router;
