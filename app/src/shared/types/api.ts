type ErrorResponse = {
    success: false;
    errors: Record<string, string[] | string>;
}

export type { ErrorResponse };