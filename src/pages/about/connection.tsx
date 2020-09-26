import Head from 'next/head';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'src/i18n';
import { GetAboutConnectionResult, Nullable, WithI18nNamespaces } from 'src/types';
import { connectionFetcher, useConnectionInfo } from 'src/hooks';
import StandardHeading from 'src/components/shared/StandardHeading';
import Content from 'src/components/shared/Content';
import InlineIcon from 'src/components/shared/InlineIcon';
import Abbr from 'src/components/shared/Abbr';

interface PropTypes extends WithI18nNamespaces {
  connectingAddress: Nullable<string>;
  forwardedFor: Nullable<string | string[]>;
  initialServerInfo?: GetAboutConnectionResult;
}

export const ConnectionPage: React.FC<PropTypes> = ({ connectingAddress, forwardedFor, initialServerInfo }) => {
  const { t } = useTranslation('connection');
  const { serverInfo, fetching, backendDown, makeStale } = useConnectionInfo(initialServerInfo);
  return (
    <Content>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <StandardHeading heading={t(`heading`)} />

      <h3>{t('common:footer.frontend')} (<Abbr title={t('ssrMeaning')}>{t('ssr')}</Abbr>)</h3>
      <p><strong>{t('connectingAddress')}:</strong> <code>{JSON.stringify(connectingAddress)}</code></p>
      <p><strong>{t('forwardedFor')}:</strong> <code>{JSON.stringify(forwardedFor)}</code></p>

      <h3>
        {t('common:footer.backend')} (<Abbr title={t('common:footer.apiMeaning')}>{t('common:footer.api')}</Abbr>)
        {backendDown && (
          <InlineIcon color="danger" icon="server" />
        )}
        {fetching && (
          <InlineIcon loading last />
        )}
      </h3>
      <p><strong>{t('commitId')}:</strong> <code>{fetching ? null : JSON.stringify(serverInfo?.commitId)}</code></p>
      <p><strong>{t('commitTime')}:</strong> <code>{fetching ? null : JSON.stringify(serverInfo?.commitTime)}</code></p>
      <p><strong>{t('connectingAddress')}:</strong> <code>{fetching ? null : JSON.stringify(serverInfo?.ip)}</code></p>
      <p><strong>{t('forwardedFor')}:</strong> <code>{fetching ? null : JSON.stringify(serverInfo?.proxiedIps)}</code></p>

      <Button onClick={makeStale} disabled={fetching}>
        <InlineIcon icon="sync" first loading={fetching} />
        {t('updateBackend')}
      </Button>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const props: PropTypes = {
    connectingAddress: ctx.req.connection.remoteAddress || null,
    forwardedFor: null,
    initialServerInfo: await connectionFetcher(),
  };

  const connAddr = ctx.req.connection.address();
  if (connAddr) {
    props.connectingAddress = typeof connAddr === 'string' ? connAddr : connAddr.address;
  }

  const forwardedHeader = ctx.req.headers['x-forwarded-for'];
  if (forwardedHeader) {
    props.forwardedFor = forwardedHeader;
  }

  return { props };
};

ConnectionPage.defaultProps = {
  i18nNamespaces: ['common', 'connection'],
};

export default ConnectionPage;
