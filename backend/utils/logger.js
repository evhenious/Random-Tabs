const logger = {
  log: (...args) => console.log('[BACKEND]'.green.bold, ...args),
  warn: (...args) => console.log('[BACKEND]'.yellow.bold, ...args),
  error: (...args) => console.log('[BACKEND]'.red.bold, ...args),
};

module.exports = {
  logger,
};
