export function mapDbError(err: any) {
  switch (err.code) {
    case '23505':
      return {
        status: 409,
        message: 'Resource already exists',
      };

    case '23503':
      return {
        status: 400,
        message: 'Invalid reference to related resource',
      };

    case '23502':
      return {
        status: 400,
        message: 'Missing required field',
      };

    default:
      return {
        status: 500,
        message: 'Database error',
      };
  }
}
