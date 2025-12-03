"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api";

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = data?.error || {
      code: "UNKNOWN_ERROR",
      message: data?.message || "An error occurred",
    };
    throw new Error(error.message || "Request failed");
  }

  return data;
}

async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const { headers = {}, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // Important for cookies
  });

  if (response.status === 401) {
    // Token expired, could trigger refresh here
    throw new Error("Authentication required");
  }

  return response;
}

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetchWithAuth(endpoint, { method: "GET" });
    return handleResponse<T>(response);
  },

  post: async <T>(endpoint: string, body?: unknown): Promise<T> => {
    const response = await fetchWithAuth(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  put: async <T>(endpoint: string, body?: unknown): Promise<T> => {
    const response = await fetchWithAuth(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(endpoint: string, body?: unknown): Promise<T> => {
    const response = await fetchWithAuth(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetchWithAuth(endpoint, { method: "DELETE" });
    return handleResponse<T>(response);
  },
};


