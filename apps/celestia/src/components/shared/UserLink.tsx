import Link from 'next/link';
import { ProfileLinkOptions } from 'src/utils';
import { getProfileLink } from 'src/utils/path-utils';
import { FC, PropsWithChildren } from 'react';

interface PropTypes extends ProfileLinkOptions, PropsWithChildren {
  text?: string;
  className?: string;
}

const UserLink: FC<PropTypes> = ({ children, className = 'user-link', ...rest }) => (
  <Link href={getProfileLink(rest)}>
    <a className={className}>{children || rest.name}</a>
  </Link>
);

export default UserLink;
