const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
}

const levelName = (process.env.LOG_LEVEL || 'info').toLowerCase()
const currentLevel = LOG_LEVELS[levelName] ?? LOG_LEVELS.info

function formatMessage(level, context, message, ...args) {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]${context ? ` [${context}]` : ''}`
    return [prefix, message, ...args]
}

function logAt(level, consoleFn, context, message, ...args) {
    if (currentLevel > LOG_LEVELS[level]) {
        return
    }
    consoleFn(...formatMessage(level, context, message, ...args))
}

function createLogger(context = '') {
    return {
        debug: (message, ...args) => logAt('debug', console.debug, context, message, ...args),
        info: (message, ...args) => logAt('info', console.log, context, message, ...args),
        warn: (message, ...args) => logAt('warn', console.warn, context, message, ...args),
        error: (message, ...args) => logAt('error', console.error, context, message, ...args),
    }
}

module.exports = { createLogger, logger: createLogger() }
