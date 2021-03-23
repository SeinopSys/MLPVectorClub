import Link from 'next/link';
import { ProfileLinkOptions } from 'src/utils';
import { getProfileLink } from 'src/utils/path-utils';
import { VFC } from 'react';

interface PropTypes extends ProfileLinkOptions {
  text?: string;
  userLinkClass?: string;
}

const UserLink: VFC<PropTypes> = ({ text, userLinkClass = 'user-link', ...rest }) => (
  <Link href={getProfileLink(rest)}>
    <a className={userLinkClass}>{text || rest.name}</a>
  </Link>
);

export default UserLink;
