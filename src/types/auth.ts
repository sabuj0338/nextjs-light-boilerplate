export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}
