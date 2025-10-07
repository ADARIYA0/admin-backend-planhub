const { cleanEnv, str, num, bool } = require('envalid');
const logger = require('../utils/logger');

require('dotenv').config();

const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'production', 'test', 'staging'],
        default: 'development',
        desc: 'The application environment',
    }),
    PORT: num({
        default: 8000,
        desc: 'Port for the server to listen on',
    }),
    DB_HOST: str({ desc: 'Database host address' }),
    DB_PORT: num({ desc: 'Database port' }),
    DB_USER: str({ desc: 'Database user' }),
    DB_PASSWORD: str({ default: '', desc: 'Database password' }),
    DB_NAME: str({ desc: 'Database name' }),
    DB_SYNCHRONIZE: bool({ default: false, desc: 'Whether DB schema sync is enabled' }),
    CORS_ORIGINS: str({ default: '', desc: 'Comma-separated list of allowed CORS origins' }),
}, {
    reporter: ({ errors, env }) => {
        const keys = Object.keys(errors);
        if (keys.length > 0) {
            logger.error('Environment validation failed:');
            keys.forEach((key) => {
                logger.error(`- ${key}: ${errors[key].message}`);
            });
            process.exit(1);
        }
    }
});

module.exports = env;
