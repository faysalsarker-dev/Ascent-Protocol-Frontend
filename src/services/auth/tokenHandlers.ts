"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string, options: Partial<ResponseCookie>) => {
    const cookieStore = await cookies();
    cookieStore.set(key, value, options);
}

export const getCookie = async (key: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value || null;
}
 
export const deleteCookie = async (key: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}



type IToken = {
  accessToken?: string;
  refreshToken?: string;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  data?: {
    accessToken?: string;
    refreshToken?: string;
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
  };
};


export const extractTokens = async(payload: IToken) => {
  if (!payload) {
    return { accessToken: undefined, refreshToken: undefined };
  }

  if (payload.tokens) {
    return {
      accessToken: payload.tokens.accessToken,
      refreshToken: payload.tokens.refreshToken,
    };
  }

  if (payload.data?.tokens) {
    return {
      accessToken: payload.data.tokens.accessToken,
      refreshToken: payload.data.tokens.refreshToken,
    };
  }

  return {
    accessToken: payload.accessToken ?? payload.data?.accessToken,
    refreshToken: payload.refreshToken ?? payload.data?.refreshToken,
  };
};

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const persistTokens = async (accessToken?: string, refreshToken?: string) => {
  if (accessToken) {
    await setCookie("accessToken", accessToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: 60 * 60,
    });
  }

  if (refreshToken) {
    await setCookie("refreshToken", refreshToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 30,
    });
  }
};