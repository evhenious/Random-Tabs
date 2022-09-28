import colors from 'colors';
colors.enable();

/**
 * Offers colored prefixed logger
 */
const logger = {
  log: (...args: any[]) => console.log('[BACKEND]'.green.bold, ...args),
  warn: (...args: any[]) => console.log('[BACKEND]'.yellow.bold, ...args),
  error: (...args: any[]) => console.log('[BACKEND]'.red.bold, ...args),
};

export { logger };
