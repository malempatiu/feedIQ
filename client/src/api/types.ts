export interface ApiError {
  message: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}