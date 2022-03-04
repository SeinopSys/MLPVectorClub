import { SOCIAL_PROVIDERS } from 'src/fancy-config';
import { SocialProvider } from 'src/types';

export const getOAuthProvider = (provider: unknown): string =>
  typeof provider === 'string' && provider in SOCIAL_PROVIDERS ? SOCIAL_PROVIDERS[provider as SocialProvider].name : '';
