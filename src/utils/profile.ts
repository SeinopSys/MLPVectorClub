import { Nullable, Numeric, PublicUser, Translatable } from 'src/types';

export const getProfileTitle = (
  user: Nullable<PublicUser> = null,
  authUserId: Nullable<number> = null,
): Translatable => {
  if (user) {
    if (authUserId === user.id) {
      return ['common:titles.yourProfile'];
    }
    if (user.name) {
      return ['common:titles.profileByName', { replace: { name: user.name } }];
    }
  }
  return ['common:titles.profile'];
};

export type ProfileLinkOptions = {
  id: Nullable<Numeric>;
  name?: Nullable<string>;
};
