export function getDatabaseUrl(): string {
  switch (process.env.NODE_ENV) {
    case 'test':
      return process.env.DATABASE_URL_TEST!;
    case 'production':
      return process.env.DATABASE_URL_PROD!;
    default:
      return process.env.DATABASE_URL_DEV!;
  }
}
