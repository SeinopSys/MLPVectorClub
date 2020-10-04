import { UncontrolledTooltip } from 'reactstrap';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import React from 'react';
import { GetAboutConnectionResult } from 'src/types';
import {
  API_DOCS_URL,
  BACKEND_GITHUB_URL,
  BACKEND_PROJECT_NAME,
  GITHUB_URL,
  PROJECT_NAME,
} from 'src/config';
import { getBuildData, isClientSide, PATHS } from 'src/utils';
import TimeAgo from 'src/components/shared/TimeAgo';
import ContactLink from 'src/components/shared/ContactLink';
import ContactModal from 'src/components/ContactModal';
import ExternalLink from 'src/components/shared/ExternalLink';
import { connectionFetcher, useConnectionInfo } from 'src/hooks';
import Abbr from 'src/components/shared/Abbr';
import { common } from 'src/strings';

const buildData = isClientSide ? getBuildData() : null;

interface PropTypes {
  initialServerInfo?: GetAboutConnectionResult;
}

const Footer: React.FC<PropTypes> = ({ initialServerInfo }) => {
  const { serverInfo, loading, backendDown } = useConnectionInfo(initialServerInfo);

  let commitHash: React.ReactNode = null;
  let commitTime: React.ReactNode = null;
  if (buildData && typeof buildData !== 'string') {
    commitHash = (
      <>
        @
        <a
          href={`${GITHUB_URL}/commit/${buildData.commitId}`}
          id="visit-github-commit"
        >
          {buildData.commitId}
        </a>
        <UncontrolledTooltip target="visit-github-commit" placement="top" fade={false}>
          {common.footer.commitTitle}
        </UncontrolledTooltip>
      </>
    );
    commitTime = (
      <>
        {` ${common.footer.created} `}
        <TimeAgo date={buildData.commitTime} />
      </>
    );
  }
  let backendCommitHash: React.ReactNode = null;
  let backendCommitTime: React.ReactNode = null;
  if (!loading && !backendDown && serverInfo) {
    backendCommitHash = (
      <>
        @
        <a
          href={`${BACKEND_GITHUB_URL}/commit/${serverInfo.commitId}`}
          id="visit-backend-github-commit"
        >
          {serverInfo.commitId}
        </a>
        <UncontrolledTooltip target="visit-backend-github-commit" placement="top" fade={false}>
          {common.footer.commitTitle}
        </UncontrolledTooltip>
      </>
    );
    backendCommitTime = serverInfo.commitDate && (
      <>
        {` ${common.footer.created} `}
        <TimeAgo date={serverInfo.commitDate} />
      </>
    );
  }

  return (
    <>
      <footer id="footer">
        <span id="git-info">
          {`${common.footer.frontend}: `}
          <strong>
            <a href={GITHUB_URL} id="visit-github">
              {PROJECT_NAME}
            </a>
            <UncontrolledTooltip target="visit-github" placement="top" fade={false}>
              {common.footer.visitGithub}
            </UncontrolledTooltip>
            {commitHash}
          </strong>
          {commitTime}
          {` | ${common.footer.backend}: `}
          <strong>
            <a href={BACKEND_GITHUB_URL} id="visit-backend-github">
              {BACKEND_PROJECT_NAME}
            </a>
            <UncontrolledTooltip target="visit-backend-github" placement="top" fade={false}>
              {common.footer.visitGithub}
            </UncontrolledTooltip>
            {backendCommitHash}
          </strong>
          {backendCommitTime}
        </span>
        {` | `}
        <Link href={PATHS.PRIVACY_POLICY}>
          <a>{common.footer.privacyPolicy}</a>
        </Link>
        {` | `}
        <ContactLink>{common.footer.contactUs}</ContactLink>
        {` | `}
        <Abbr id="api-docs" title={common.footer.apiMeaning}>
          <ExternalLink id="api-docs" href={API_DOCS_URL}>
            {common.footer.api}
          </ExternalLink>
        </Abbr>
      </footer>
      <ContactModal />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const props: PropTypes = {
    initialServerInfo: await connectionFetcher(),
  };

  return { props };
};

export default Footer;
