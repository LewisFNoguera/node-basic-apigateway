const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

class Logger {
    constructor() {
        if (!Logger.instance) {
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: 'logs/api-gateway.log' }),
                    // new ElasticsearchTransport({
                    //     level: 'info',
                    //     clientOpts: { node: 'http://localhost:9200' },
                    // })
                ]
            });
            Logger.instance = this;
        }
        return Logger.instance;
    }
    warn(message) {
        this.logger.warn(message);
    }

    info(message) {
        this.logger.info(message);
    }

    error(message) {
        this.logger.error(message);
    }
}

module.exports = new Logger();