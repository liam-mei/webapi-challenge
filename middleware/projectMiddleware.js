const db = require("../data/helpers/projectModel");

function validateProject(req, res, next) {
  const { name, description } = req.body;

  const errors = {};
  if (!name) errors.missingName = "Please Enter Name";
  if (!description) errors.missingDescription = "Please Enter Description";
  if (Object.keys(errors).length) res.status(400).json(errors);

  next();
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  db.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        // res.status(400).json({ error: "Project of That Id does not exist" });
        next({ statusCode: 400, errorMessage: "Project of that Id does not exist" });
      }
    })
    .catch(err => next({ originalError: err }));
}

module.exports = { validateProject, validateProjectId };
