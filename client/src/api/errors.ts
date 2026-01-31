export type ValidationDetail = {
  loc: string[];
  msg: string;
  type: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  errors: ValidationDetail[];

  constructor(errors: ValidationDetail[]) {
    super("Validation failed", 422);
    this.name = "ValidationError";
    this.errors = errors;
  }

  getFieldErrors(): Record<string, string[]> {
    return this.errors.reduce<Record<string, string[]>>((acc, error) => {
      const field = error.loc[error.loc.length - 1];
      acc[field] = [...(acc[field] || []), error.msg];
      return acc;
    }, {});
  }
}
