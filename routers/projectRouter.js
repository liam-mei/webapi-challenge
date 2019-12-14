const express = require("express");

const projectDb = require("../data/helpers/projectModel");
const { validateProject, validateProjectId } = require("../middleware/projectMiddleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json({ error: "error retrieving projects", err }));
});

router.get("/:id", validateProjectId, (req, res, next) => {
  res.json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  projectDb
    .getProjectActions(req.params.id)
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      next({
        errorMessage: "ProjectID exists but there was error retrieving actions",
        originalError: err
      })
    );
});

router.post("/", validateProject, (req, res, next) => {
  const { name, description, completed } = req.body;

  projectDb
    .insert({ name, description, completed })
    .then(post => res.status(201).json(post))
    .catch(err => next({ errorMessage: "Error saving project to DB", originalError: err }));
});

router.put("/:id", validateProject, validateProjectId, (req, res, next) => {
  const { name, description, completed } = req.body;

  projectDb
    .update(req.params.id, { name, description, completed })
    .then(updatedProject => res.status(200).json(updatedProject))
    .catch(err => next({ errorMessage: "error updating project", originalError: err }));
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  projectDb
    .remove(req.params.id)
    .then(numberRemoved => res.status(202).json(req.project))
    .catch(err => next({ errorMessage: "error removing project from db", originalError: err }));
});
module.exports = router;
