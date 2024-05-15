const Joi = require("@hapi/joi");
const model = require("../models/student");
async function fetchStudentDetails(req, res) {
  console.log("req.query", req.query);
  const schema = Joi.object().keys({
    query: {
      pageSize: Joi.number().optional(),
      pageIndex: Joi.number().optional(),
    },
    body: {
      filter: Joi.object().optional(),
    },
  });

  Joi.validate(
    { query: req.query, body: req.body },
    schema,
    async (err, value) => {
      if (err) {
        return res.send({
          success: false,
          error: err.details[0].message,
          message: "Invalid request",
          data: [],
        });
      } else {
        let data = await model.getStudentData(req.query);
        return res.status(200).send(data);
      }
    }
  );
}

module.exports = {
  fetchStudentDetails,
};
