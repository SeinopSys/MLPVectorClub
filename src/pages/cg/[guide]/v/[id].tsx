import { NextPage } from 'next';
import StandardHeading from 'src/components/shared/StandardHeading';
import { wrapper } from 'src/store';
import {
  assembleSeoUrl,
  getAppearanceTitle,
  getGuideLabel,
  handleDataFetchingError,
  notFound,
  resolveGuideName,
} from 'src/utils';
import {
  BreadcrumbEntry,
  DetailedAppearance,
  GetAppearancesIdResult,
  GuideName,
  Nullable,
  Optional,
} from 'src/types';
import { titleSetter } from 'src/utils/core';
import Content from 'src/components/shared/Content';
import { TitleFactory } from 'src/types/title';
import { PATHS } from 'src/paths';
import { colorGuide } from 'src/strings';
import { appearanceFetcher } from 'src/fetchers';
import { useAuth, useDetailedAppearance, useTitleSetter } from 'src/hooks';
import StatusAlert from 'src/components/shared/StatusAlert';
import SpriteImage from 'src/components/colorguide/SpriteImage';
import { GuideNotFound } from 'src/components/colorguide/GuideNotFound';
import { GuideLink } from 'src/components/colorguide/GuideLink';
import styles from 'modules/AppearancePage.module.scss';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { NextSeoProps } from 'next-seo/lib/types';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import { Alert, Button } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { ShareAppearanceButton } from 'src/components/colorguide/ShareAppearanceButton';
import AppearanceTags from 'src/components/colorguide/AppearanceTags';
import pluralize from 'pluralize';
import { CutieMarks } from 'src/components/colorguide/CutieMarks';
import { useDispatch } from 'react-redux';
import { processAppearanceNotes } from 'src/utils/html-parsers/appearance-notes-parser';
import { AppearanceNotesText } from 'src/components/colorguide/AppearanceNotesText';

interface PropTypes {
  guide: GuideName;
  id: number | null;
  initialData: {
    appearance: Nullable<DetailedAppearance>;
  };
}

const titleFactory: TitleFactory<Omit<PropTypes, 'id'>> = ({ guide, initialData }) => {
  const title = getAppearanceTitle(guide, initialData.appearance);
  const guideItem = guide !== null
    ? { label: getGuideLabel(guide), linkProps: { href: PATHS.GUIDE(guide) } }
    : { label: getGuideLabel(guide) };
  const breadcrumbs: BreadcrumbEntry[] = [
    { linkProps: { href: PATHS.GUIDE_INDEX }, label: colorGuide.index.breadcrumb },
    guideItem,
  ];
  if (initialData.appearance) {
    breadcrumbs.push({ label: initialData.appearance.label, active: true });
  } else {
    breadcrumbs.push({ label: 'Appearance', active: true });
  }
  return {
    title,
    breadcrumbs,
  };
};

const AppearancePage: NextPage<PropTypes> = ({ guide, id, initialData }) => {
  const { isStaff } = useAuth();
  const { appearance, status } = useDetailedAppearance({ id }, initialData.appearance || undefined);
  const dispatch = useDispatch();
  const titleData = useMemo(() => titleFactory({ initialData, guide }), [guide, initialData]);
  useTitleSetter(dispatch, titleData);

  const seoData = useMemo<NextSeoProps | null>(() => (appearance ? {
    description: `Show accurate colors for "${appearance.label}" from the MLP-VectorClub's Official Color Guide`,
    canonical: assembleSeoUrl(PATHS.APPEARANCE(appearance)),
    openGraph: appearance.sprite ? {
      images: [{
        width: 600,
        height: 600,
        url: appearance.sprite.path,
      }],
    } : undefined,
  } : null), [appearance]);
  const shortUrl = useMemo(() => appearance && assembleSeoUrl(PATHS.SHORT_APPEARANCE(appearance)), [appearance]);
  const notes = useMemo(() => (appearance && appearance.notes ? processAppearanceNotes(appearance.notes) : null), [appearance]);

  if (!appearance) {
    return <GuideNotFound heading="Unknown appearance" noun="appearance" />;
  }

  return (
    <Content>
      {seoData && <NextSeo {...seoData} />}
      {appearance.sprite && (
        <div className={styles.spriteImage}>
          <SpriteImage sprite={appearance.sprite} height={300} />
        </div>
      )}
      <StandardHeading heading={appearance.label} lead={<>from the <GuideLink name={appearance.guide} title /></>} />
      <ButtonCollection>
        <Button color="link" size="sm" disabled>
          <InlineIcon icon="image" first />
          View as PNG
        </Button>
        <Button color="primary" size="sm" disabled>
          <InlineIcon icon="paint-brush" first />
          Download swatch file
        </Button>
        {shortUrl && <ShareAppearanceButton shortUrl={shortUrl} />}
        {isStaff && (
          <>
            <Button color="ui" size="sm" disabled>
              <InlineIcon icon="pencil-alt" first />
              Edit metadata
            </Button>
            <Button color="danger" size="sm" disabled>
              <InlineIcon icon="trash" first />
              Delete appearance
            </Button>
          </>
        )}
      </ButtonCollection>

      <StatusAlert status={status} noun="appearance" />

      {appearance.tags && (
        <>
          <h2>
            <InlineIcon icon="tags" first size="xs" />
            Tags
          </h2>
          <AppearanceTags tags={appearance.tags} guide={appearance.guide} />
        </>
      )}
      <h2>
        <InlineIcon icon="video" first size="xs" />
        Featured in
      </h2>
      <Alert color="info" fade={false}>
        <InlineIcon icon="hard-hat" first />
        This feature is not available yet
      </Alert>
      {notes && (
        <>
          <h2>
            <InlineIcon icon="info" first size="xs" fixedWidth />
            Additional notes
          </h2>
          <div className={styles.notes}>
            <AppearanceNotesText>{notes}</AppearanceNotesText>
          </div>
        </>
      )}
      {appearance.cutieMarks.length > 0 && (
        <>
          <h2>{pluralize('Cutie mark', appearance.cutieMarks.length)}</h2>
          <p className={styles.aside}>
            These are just illustrations, the body shape & colors are <strong>not</strong> guaranteed to reflect the actual design.
          </p>
          <CutieMarks label={appearance.label} cutieMarks={appearance.cutieMarks} colorGroups={appearance.colorGroups} />
        </>
      )}
      {appearance.colorGroups && (
        <>
          <h2>{pluralize('Color group', appearance.colorGroups.length)}</h2>
          <Alert color="info" fade={false}>
            <InlineIcon icon="hard-hat" first />
            This feature is not available yet
          </Alert>
        </>
      )}
      <h2>{pluralize('Related appearances', appearance.colorGroups.length)}</h2>
      <Alert color="info" fade={false}>
        <InlineIcon icon="hard-hat" first />
        This feature is not available yet
      </Alert>
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store, req } = ctx;

  const guide = resolveGuideName(query.guide) || null;
  if (!guide) {
    return notFound(ctx);
  }

  let id: number | null = null;
  if (typeof query.id === 'string') {
    id = Number.parseInt(query.id.trim(), 10);
  }

  let appearance: Optional<GetAppearancesIdResult>;
  if (guide && id) {
    try {
      appearance = await appearanceFetcher({ id }, req)();
    } catch (e) {
      handleDataFetchingError(ctx, e);
    }
  }

  const props: PropTypes = {
    guide,
    id,
    initialData: {
      appearance: appearance || null,
    },
  };
  titleSetter(store, titleFactory(props));
  return { props };
});

export default AppearancePage;
