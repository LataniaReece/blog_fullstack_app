export const extractErrorMessage = (
  error: unknown,
  defaultMessage: string = "An unexpected error occurred"
): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "object" && error !== null) {
    const err = error as { data?: { message?: string }; message?: string };
    if (err.data && typeof err.data === "object") {
      return err.data.message || defaultMessage;
    } else if (typeof err.message === "string") {
      return err.message;
    }
  }
  return defaultMessage;
};
