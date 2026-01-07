type LogLevel = 'info' | 'error' | 'warn';

export function createLogger(level: LogLevel) {
  function log(lvl: LogLevel, message: string, meta?: unknown) {
    if (meta) {
      console.log(`[${lvl.toUpperCase()}] ${message}`, meta);
    } else {
      console.log(`[${lvl.toUpperCase()}] ${message}`);
    }
  }

  return {
    info: (msg: string, meta?: unknown) => log('info', msg, meta),
    warn: (msg: string, meta?: unknown) => log('warn', msg, meta),
    error: (msg: string, meta?: unknown) => log('error', msg, meta),
  };
}
