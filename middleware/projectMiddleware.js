const db = require("../data/helpers/projectModel");

function validateProject(req, res, next) {
  const { project_id, description, notes } = req.body;

  const 
}

function validateProjectId(req, res, next) {}

module.exports = { validateProject, validateProjectId };
