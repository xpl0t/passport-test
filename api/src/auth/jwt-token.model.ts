/**
 * JWT token data.
 */
export interface JwtToken {
  // JwtToken.sub = User.id
  sub: number;
  username: string;
}