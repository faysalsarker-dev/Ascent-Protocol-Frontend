"use server"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getCookie ,deleteCookie} from '@/src/services/auth/tokenHandlers';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET is not set");

export async function verifyAccessToken(token: string): Promise<JwtPayload | string | null> {
  try {
   const decoded = jwt.verify(token, ACCESS_SECRET!) as JwtPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
      await deleteCookie("accessToken");
      return null; 
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
