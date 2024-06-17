const express = require('express');

const router = express.Router();
const pingRoutes = require('./ping');
const healthCheckRoutes = require('./health-check');
const sampleRoutes = require('./sample');
const auth = require('./auth')

pingRoutes(router);
healthCheckRoutes(router);
sampleRoutes(router);
auth(router);

module.exports = router;
