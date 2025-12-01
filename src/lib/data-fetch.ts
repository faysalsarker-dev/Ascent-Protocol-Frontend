import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api";
const MAX_AUTH_RETRY = 1;

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

type TokenEnvelope = {
  tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
  data?: {
    tokens?: {
      accessToken?: string;
      refreshToken?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  };
  accessToken?: string;
  refreshToken?: string;
};

const extractTokens = (payload: TokenEnvelope | null | undefined) => {
  if (!payload) return { accessToken: undefined, refreshToken: undefined };

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

const normalizeHeaders = (headers?: HeadersInit): Record<string, string> => {
  if (!headers) return {};
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return { ...headers };
};

const attachAuthHeader = async (headers?: HeadersInit) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const normalized = normalizeHeaders(headers);

  if (accessToken && !normalized.Authorization) {
    normalized.Authorization = `Bearer ${accessToken}`;
  }

  return normalized;
};

const refreshTokens = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return false;
  }

  const response = await fetch(`${BACKEND_API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return false;
  }

  const { accessToken, refreshToken: newRefreshToken } = extractTokens(result);

  if (accessToken) {
    cookieStore.set("accessToken", accessToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: 60 * 60,
    });
  }

  if (newRefreshToken) {
    cookieStore.set("refreshToken", newRefreshToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return true;
};

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit,
  attempt = 0,
): Promise<Response> => {
  const { headers, ...restOptions } = options;

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {

    headers: await attachAuthHeader(headers),
    ...restOptions,
  });

  if (response.status === 401 && attempt < MAX_AUTH_RETRY) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      return serverFetchHelper(endpoint, options, attempt + 1);
    }
  }

  return response;
};

export const dataFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};