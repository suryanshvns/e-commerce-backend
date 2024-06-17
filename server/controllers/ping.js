const { VERSION, NAME } = require('../config');

/**
 * Check whether nodeservice is working
 * @return {object} status - returns ok that specifies that microservice is working.
 * */
const status = (req, res) => {
  res.getRequest({
    status: 'ok', version: VERSION, name: NAME,
  });
};

module.exports = { status };
