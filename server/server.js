const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const SmartHttp = require('smart-http');
const correlationId = require('correlationid-middleware');
const routes = require('./routes');
const logger = require('./logger/logger');
const { PORT } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  exposedHeaders: [ 'x-coreplatform-paging-limit', 'x-coreplatform-total-records', 'public-id', 'image-url',
    'Content-Type', 'File-Name', 'Content-Size', 'Content-disposition', 'message', 'location' ],
}));
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(correlationId, SmartHttp());

app.use('/', routes);
app.all('/*', (_req, res) => res.notFound());

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled promise rejection: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
