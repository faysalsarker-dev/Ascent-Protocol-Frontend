import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCookie } from '@/src/services/auth/tokenHandlers';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET is not set");

export function verifyAccessToken(token: string): JwtPayload | string {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Access token expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid access token");
    }
    throw error;
  }
}

export const getUser = async () => {
  const accessToken = await getCookie('accessToken'); 

  if (!accessToken) {
    return null;
  }

  try {
    return verifyAccessToken(accessToken);
  } catch (err) {
    console.error(err);
    return null;
  }
};
