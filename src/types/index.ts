export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  errors?: Record<string, any> | null | undefined;
}