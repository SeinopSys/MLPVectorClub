import React, { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from '../../i18n';
import Content from '../../components/shared/Content';
import { coreActions } from '../../store/slices';
import { wrapper } from '../../store';
import {
  fixPath,
  getProfileTitle,
  mapRoleLabel,
  PATHS,
  setResponseStatus,
} from '../../utils';
import StandardHeading from '../../components/shared/StandardHeading';
import AvatarWrap from '../../components/shared/AvatarWrap';
import { useAuth, userFetcher, useUser } from '../../hooks';
import { GetUsersIdResult, Nullable, Optional, PublicUser } from '../../types';

interface PropTypes {
  initialUser: Nullable<PublicUser>;
}

const ProfilePage: React.FC<PropTypes> = ({ initialUser }) => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { user } = useUser(query, initialUser || undefined);
  const { user: authUser } = useAuth();

  useEffect(() => {
    dispatch(coreActions.setTitle(getProfileTitle(user, authUser.id)));
  }, [authUser, user]);

  return (
    <Content>
      {!user && <StandardHeading heading={t('notFound')} lead={t('checkYourSpelling')} />}
      {user && (
        <>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <AvatarWrap {...user} size={75} className="flex-grow-0" />
          </div>
          <StandardHeading heading={user.name} lead={mapRoleLabel(t, user.role)} />
        </>
      )}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store } = ctx;

  let id: Optional<string>;
  let username: Optional<string>;
  if (typeof query.user === 'string') {
    const matchCurrent = /^(\d+)(?:-.*)?$/.exec(query.user);
    if (matchCurrent) {
      [, id] = matchCurrent;
    } else {
      const matchDa = /^@([A-Za-z\d-]{1,20})$/.exec(query.user);
      if (matchDa) {
        [, username] = matchDa;
      }
    }
  }

  let initialUser: Optional<GetUsersIdResult>;
  if (id || username) {
    try {
      initialUser = await userFetcher({ username, id })();
    } catch (e) {
      if (e.response) {
        const { response } = e as AxiosError;
        const status = response?.status;
        if (status) {
          setResponseStatus(ctx, status);
        }
        if (status !== 404) {
          console.error(e.response);
        }
      } else {
        console.error(e);
      }
    }
  }

  if (initialUser) {
    const expectedPath = PATHS.USER_LONG(initialUser);
    if (fixPath(ctx, expectedPath)) {
      return;
    }
  }

  store.dispatch(coreActions.setTitle(getProfileTitle(initialUser)));
  return {
    props: {
      namespacesRequired: ['profile'],
      initialUser: initialUser || null,
    },
  };
});

export default ProfilePage;
