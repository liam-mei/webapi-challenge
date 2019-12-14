const express = require("express");

const actionDb = require("../data/helpers/actionModel");
const { validateAction, validateActionId } = require("../middleware/actionMiddleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => res.status(500).json({ error: "error retrieving actions", err }));
});

router.get("/:id", validateActionId, (req, res, next) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  const { project_id, description, notes, completed } = req.body;

  actionDb
    .insert({ project_id, description, notes, completed })
    .then(post => res.status(201).json(post))
    .catch(err => next({ errorMessage: "Error saving action to DB", originalError: err }));
});

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  const { project_id, description, notes, completed } = req.body;

  actionDb
    .update(req.params.id, { project_id, description, notes, completed })
    .then(updatedAction => res.status(200).json(updatedAction))
    .catch(err => next({ errorMessage: "error updating action", originalError: err }));
});

router.delete("/:id", validateActionId, (req, res, next) => {
  actionDb
    .remove(req.params.id)
    .then(numberRemoved => res.status(202).json(req.action))
    .catch(err => next({ errorMessage: "error removing action from db", originalError: err }));
});
module.exports = router;
