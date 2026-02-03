import { ApiError, ValidationError, type ValidationDetail } from "./errors";
import type { ApiResponse } from "./types";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      "Authorization": ''
    }

    const token = localStorage.getItem('currentUser');

    if (url.includes('auth/user/me') && !token) {
      return {data: null} as ApiResponse<T>
    }

    if (!url.includes('login') && !url.includes('register')) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('currentUser')}`
    }

    const config: RequestInit = {
      ...options,
     headers
    };

    const response = await fetch(url, config);

    if (response.status === 204) {
      return {} as ApiResponse<T>;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Pydantic validation error from FastAPI
      if (response.status === 422 && Array.isArray(data?.detail)) {
        throw new ApiError(ValidationError.getFieldErrors(data.detail as ValidationDetail[]), response.status)
      }

      // Other server errors - detail is usually a string
      throw new ApiError(
        data?.detail ?? "Something went wrong",
        response.status
      );
    }

    return {
      data,
      error: null
    };
  }

  async get<T>(endpoint: string, headers?: HeadersInit) {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  async post<T>(endpoint: string, data?: unknown, headers?: HeadersInit) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });
  }

  async put<T>(endpoint: string, data?: unknown, headers?: HeadersInit) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers,
    });
  }

  async patch<T>(endpoint: string, data?: unknown, headers?: HeadersInit) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers,
    });
  }

  async delete<T>(endpoint: string, headers?: HeadersInit) {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }
}

const client = new ApiClient("http://localhost:8000/api/v1/");

export { client };