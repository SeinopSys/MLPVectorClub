/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * DO NOT EDIT THIS FILE DIRECTLY! - GENERATE IT USING yarn run api:types INSTEAD
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface ErrorResponse {
  /**
   * An error message describing what caused the request to fail
   */
  message: string;
}

export type ValidationErrorResponse = {
  /**
   * A map containing error messages for each field that did not pass validation
   */
  errors: {
    [k: string]: string[];
  };
} & ErrorResponse;

export interface Token {
  id: number;
  /**
   * Name of the token, either generated (from OS and browser version) or user-supplied if renamed
   */
  name: string;
  lastUsedAt: string;
  createdAt: string;
}

/**
 * Represents an publicly accessible representation of a user
 */
export interface PublicUser {
  id: number;
  displayName: string;
  /**
   * The publicly visible role for the user
   */
  role: Role;
  avatarUrl: string;
  avatarProvider: AvatarProvider;
  /**
   * Hashed version of the e-mail address used in case there is no available avatarUrl to allow loading the Gravatar fallback
   */
  emailHash?: string;
}

export type User = PublicUser & {
  name: string;
  email: string;
  /**
   * The database-level role for the user
   */
  role: DatabaseRole;
};

/**
 * List of supported avatar providers
 */
export type AvatarProvider = "gravatar";

/**
 * List of roles values that can be stored by the backend
 */
export type DatabaseRole = "user" | "member" | "assistant" | "staff" | "admin" | "developer";

/**
 * List of roles values that can be publicly displayed
 */
export type Role = "user" | "member" | "assistant" | "staff" | "admin";

/**
 * List of supported application-wide settings
 */
export type AppSettings = "dev_role_label";

export type PostUsersLoginRequest = LoginRequest
export type PostUsersRequest = RegistrationRequest
export interface GetSanctumCsrfCookieRequest {
}
export interface GetUsersMeRequest {
}
export interface GetUsersUsernameRequest {
  username: string
}
export interface PostUsersLogoutRequest {
}
export interface GetUsersTokensRequest {
}
export interface DeleteUsersTokensIdRequest {
  id: number
}
export interface PostUsersLoginResult {
  token?: string;
}

export type PostUsersLogin204 = any
export interface PostUsersResult {
  token?: string;
}

export type PostUsers204 = any
export type GetSanctumCsrfCookieResult = any
export type GetUsersMeResult = User;

export type GetUsersUsernameResult = PublicUser;

export type PostUsersLogoutResult = any
export interface GetUsersTokensResult {
  /**
   * ID of the token used to make this request. Will be null if the request is authenticated through CookieAuth
   */
  currentTokenId: number;
  /**
   * A list of tokens that belong to the user
   */
  tokens: Token[];
}

export type DeleteUsersTokensIdResult = any