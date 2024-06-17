const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const winston = require('winston');

const logDirectory = path.join(__dirname, '..', 'loggings');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }),
  ],
});

module.exports = logger;