require('dotenv').config();
const app = require('./app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

let server;

(async () => {
    try {
        server = app.listen(PORT, () => {
            logger.info(`Server running in ${NODE_ENV} on all interfaces (0.0.0.0:${PORT})`);
        });
    } catch (error) {
        logger.error(`Failed to start application: ${error.message}`);
        process.exit(1);
    }
})();
