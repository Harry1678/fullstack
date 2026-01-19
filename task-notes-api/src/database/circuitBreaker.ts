let dbDownUntil = 0;

export function isDbAvailable(): boolean {
  return Date.now() > dbDownUntil;
}

export function markDbDown(): void {

  dbDownUntil = Date.now() + 30_000;
}
