const app = require('../../package.json')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, layer, timestamp, __dirname }) => {
  return `${timestamp} [${level}] [${layer}] ${message} ${__dirname||''}`;
});

const logger = { 
  development: createLogger({
    level: 'debug',
    format: combine( timestamp(), myFormat ),
    transports: [new transports.Console()]
  }),
  
  production: createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: {
        host: process.env.HOST,
        appname: app.name,
        version: app.version,
        time: new Date(),
      },
    transports: [
      new transports.Console()
    ],
  })
}

module.exports = logger[process.env.NODE_ENV || 'production']
