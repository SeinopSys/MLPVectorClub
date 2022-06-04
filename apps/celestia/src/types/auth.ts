import { InlineIconProps } from 'src/types/component-props';
import { VFC } from 'react';

export enum AuthModalSide {
  SIGN_IN,
  REGISTER,
  PASSWORD_RESET,
}

export interface SocialProviderConfig {
  name: string;
  renderIcon: VFC<Omit<InlineIconProps, 'icon'>>;
}

export enum OAuthErrorTypes {
  AccessDenied = 'access_denied',
  UnknownError = 'unknown_error',
  ServerError = 'server_error',
}
