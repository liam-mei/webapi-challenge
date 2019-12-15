const db = require("../data/helpers/actionModel");

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;

  const errors = {};
  if (!project_id) errors.project_id = "Please enter project_id";
  if (!description) errors.missingDescription = "Please enter description";
  if (description.length > 128 ) errors.descriptionLength = "Description Length Too long.  Max 128 Characters"
  if (!notes) errors.missingNotes = "Please enter notes";
  if (Object.keys(errors).length) res.status(400).json(errors);

  next();
}

function validateActionId(req, res, next) {
  const { id } = req.params;

  db.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({ statusCode: 400, errorMessage: "Action of that Id does not exist" });
      }
    })
    .catch(err => next({ originalError: err }));
}

module.exports = { validateAction, validateActionId };
