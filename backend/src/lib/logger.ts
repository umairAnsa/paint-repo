type Level = 'info' | 'warn' | 'error' | 'debug';

const COLORS: Record<Level, string> = {
  info:  '\x1b[36m',
  warn:  '\x1b[33m',
  error: '\x1b[31m',
  debug: '\x1b[35m',
};
const RESET = '\x1b[0m';

function log(level: Level, message: string, meta?: unknown): void {
  const ts = new Date().toISOString();
  const color = COLORS[level];
  const metaStr = meta !== undefined ? ' ' + JSON.stringify(meta) : '';
  // eslint-disable-next-line no-console
  console.log(`${color}[${ts}] [${level.toUpperCase()}]${RESET} ${message}${metaStr}`);
}

export const logger = {
  info:  (msg: string, meta?: unknown) => log('info',  msg, meta),
  warn:  (msg: string, meta?: unknown) => log('warn',  msg, meta),
  error: (msg: string, meta?: unknown) => log('error', msg, meta),
  debug: (msg: string, meta?: unknown) => log('debug', msg, meta),
};
