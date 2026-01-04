export type AuthJwtPayload = {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
};
