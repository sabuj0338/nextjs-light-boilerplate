import type { ApiResponse } from "@/types";
import { AxiosError } from "axios";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface HandleFormResponseProps<T extends Record<string, any>> {
  res: ApiResponse | undefined;
  form: UseFormReturn<T>;
  onSuccess?: (res: ApiResponse) => Promise<void> | void;
  onError?: (res: ApiResponse | null | undefined) => Promise<void> | void;
}

export const handleFormResponse = async <T extends Record<string, any>>({
  res,
  form,
  onSuccess,
  onError,
}: HandleFormResponseProps<T>) => {
  if (res?.success) {
    toast.success(res?.message || "Operation successful");
    if (onSuccess) {
      await onSuccess(res);
    }
  } else {
    toast.error(res?.message || "Operation failed");
    if (res?.errors) {
      const setServerErrors = (errors: any, path = "") => {
        Object.keys(errors).forEach((key) => {
          const fullPath = path ? `${path}.${key}` : key;
          const error = errors[key];

          if (typeof error === "string") {
            form.setError(fullPath as any, {
              type: "server",
              message: error,
            });
          } else if (typeof error === "object" && error !== null) {
            setServerErrors(error, fullPath);
          }
        });
      };

      setServerErrors(res.errors);
    }
    if (onError) {
      await onError(res);
    }
  }
};

interface HandleFormSubmitProps<T extends Record<string, any>> {
  apiCall: () => Promise<ApiResponse | undefined>;
  form: UseFormReturn<T>;
  onSuccess?: (res: ApiResponse) => Promise<void> | void;
  onError?: (res: ApiResponse | null | undefined) => Promise<void> | void;
}

/**
 * Wrapper function for form submissions that handles API calls with automatic error handling.
 */
export const handleFormSubmit = async <T extends Record<string, any>>({
  apiCall,
  form,
  onSuccess,
  onError,
}: HandleFormSubmitProps<T>) => {
  try {
    const res = await apiCall();
    await handleFormResponse({ res, form, onSuccess, onError });
  } catch (error) {
    if (error instanceof AxiosError) {
      const res = error.response?.data;
      await handleFormResponse({ res, form, onSuccess, onError });
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};

interface CreateFormSubmitHandlerProps<TFormData extends Record<string, any>> {
  form: UseFormReturn<TFormData>;
  onSuccess?: (res: ApiResponse) => Promise<void> | void;
  onError?: (res: ApiResponse | null | undefined) => Promise<void> | void;
}

/**
 * Creates a form submit handler that wraps the entire onSubmit function with automatic error handling.
 */
export const createFormSubmitHandler = <TFormData extends Record<string, any>>({
  form,
  onSuccess,
  onError,
}: CreateFormSubmitHandlerProps<TFormData>) => {
  return (apiCall: (data: TFormData) => Promise<ApiResponse | undefined>) => {
    return async (data: TFormData) => {
      await handleFormSubmit({
        apiCall: () => apiCall(data),
        form,
        onSuccess,
        onError,
      });
    };
  };
};