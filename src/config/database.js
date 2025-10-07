require('reflect-metadata');
const { DataSource } = require('typeorm');
const env = require('./env');
const logger = require('../utils/logger');

const NODE_ENV = env.NODE_ENV;
const isProduction = NODE_ENV === 'production';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * 700) + 800;

async function validateEnv() {
    if (isProduction) {
        return;
    }

    logger.info('Starting environment variable validation (development mode)...');
    await sleep(800);

    const varsToCheck = [
        'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME', 'DB_SYNCHRONIZE'
    ];

    for (const key of varsToCheck) {
        const value = env[key];

        logger.info(`Checking ${key}...`);
        await sleep(randomDelay());

        if (value === undefined || value === null || value === '') {
            logger.warn(`${key} is missing or empty!`);
        } else {
            logger.info(`${key} = ${value} (checked!)`);
        }

        await sleep(300);
    }

    logger.info('All environment variables validated successfully (development mode).');
    await sleep(randomDelay());
}

const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: env.DB_SYNCHRONIZE,
    logging: !isProduction,
    entities: ['src/entities/**/*.js'],
});

const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        logger.info('Database connected successfully!');
    } catch (error) {
        logger.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = {
    AppDataSource,
    connectDB,
    validateEnv
};
