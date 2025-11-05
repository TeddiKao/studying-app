type ErrorResponse = {
    success: false;
    errors: Record<string, string[]>;
}

type SuccessResponse = {
    success: true;
    data?: Record<string, unknown>;
}

export type { ErrorResponse, SuccessResponse };