type ErrorResponse = {
    error: true;
    errors: Record<string, string[] | string>;
}

export type { ErrorResponse };