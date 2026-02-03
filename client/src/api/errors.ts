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

export class ValidationError {
  static getFieldErrors = (errors: ValidationDetail[]): string => {
    const fieldErrors = errors.reduce<Record<string, string[]>>((acc, error) => {
      const field = error.loc[error.loc.length - 1];
      acc[field] = [...(acc[field] || []), error.msg];
      return acc;
    }, {});

    return Object.entries(fieldErrors)
      .map(([field, messages]) => {
        const messageList = messages.map(msg => `  • ${msg}`).join('\n');
        return `${field}:\n${messageList}`;
      })
      .join('\n\n');
  }
}
