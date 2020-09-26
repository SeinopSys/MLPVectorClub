import React from 'react';
import Link from 'next/link';
import { CLUB_URL, GITHUB_URL } from 'src/config';
import { Trans, useTranslation } from 'src/i18n';
import { coreActions } from 'src/store/slices';
import { AppPageContext, wrapper } from 'src/store';
import { PATHS } from 'src/utils';
import Content from 'src/components/shared/Content';
import ExternalLink from 'src/components/shared/ExternalLink';
import DeviantLink from 'src/components/shared/DeviantLink';
import FavMe from 'src/components/shared/FavMe';
import StandardHeading from 'src/components/shared/StandardHeading';
import { WithI18nNamespaces } from 'src/types';

export const getStaticProps = wrapper.getServerSideProps(async ctx => {
  const { store } = ctx as typeof ctx & AppPageContext;
  store.dispatch(coreActions.setTitle('about'));
  return {
    props: {},
  };
});

const AboutPage: React.FC<WithI18nNamespaces> = () => {
  const { t } = useTranslation('about');
  return (
    <Content>
      <img src="/img/logo.svg" alt="MLP Vector Club Website Logo" id="about-logo" />
      <StandardHeading
        heading={(
          <Trans t={t} i18nKey="website">
            <ExternalLink href={CLUB_URL}>0</ExternalLink>
            1
          </Trans>
        )}
        lead={t('tagline')}
      />
      <section className="what-s-this-site-">
        <h2 id="what-s-this-site-">
          {t('whatsThisSite.title')}
        </h2>
        <p>{t('whatsThisSite.p1')}</p>
        <p>{t('whatsThisSite.p2')}</p>
      </section>
      <section className="attributions">
        <h2>{t('attributions.title')}</h2>
        <p>
          <Trans t={t} i18nKey="attributions.github">
            0<a href={`${GITHUB_URL}#attributions`}>1</a>2
          </Trans>
        </p>
        <p>
          <Link href={PATHS.BLENDING}>
            <a>{t('attributions.blendingCalc.0')}</a>
          </Link>
          {t('attributions.blendingCalc.1')}
          <ExternalLink href="https://github.com/dasprid">
            {t('attributions.blendingCalc.2')}
          </ExternalLink>
          <br />

          <strong>{`${t('attributions.headingFont')}: `}</strong>
          <ExternalLink href="http://www.mattyhex.net/CMR/">Celestia Medium Redux</ExternalLink>
          <br />

          <strong>{t('attributions.daLogo')}</strong>
          {' © '}
          <ExternalLink href="https://www.deviantart.com/">DeviantArt</ExternalLink>
          <br />

          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Adobe_Illustrator_CC_icon.svg">
            <strong>{t('attributions.aiLogo')}</strong>
          </ExternalLink>
          {' © Adobe Systems Inc.'}
          <br />

          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Inkscape_Logo.svg">
            <strong>{t('attributions.inkscapeLogo')}</strong>
          </ExternalLink>
          {` © ${t('attributions.inkscapeTeam')}`}
          <br />

          <ExternalLink href="https://www.deviantart.com/flutterguy317/art/Ponyscape-PNG-354658716">
            <strong>{t('attributions.ponyscapeLogo')}</strong>
          </ExternalLink>
          {' © '}
          <DeviantLink username="flutterguy317" />
          <br />

          <Trans t={t} i18nKey="attributions.appLogo">
            <strong>0</strong>
            1
            <a href="https://www.deviantart.com/pirill-poveniy/art/Collab-Christmas-Vector-of-the-MLP-VC-Mascot-503196118">2</a>
            3
            <DeviantLink username="Pirill-Poveniy" />
            5
            <DeviantLink username="thediscorded" />
            7
            <DeviantLink username="masemj" />
            9
            <DeviantLink username="Ambassad0r" />
            11
            <a href="https://www.deviantart.com/ambassad0r/art/Penny-Curve-MLP-VectorClub-Mascot-2-0-568079382">12</a>
            13
            {/* TODO See if i18n will pass children with <14 /> */}
            <DeviantLink username="Ambassad0r" />
            15
          </Trans>
          <br />

          <Trans t={t} i18nKey="attributions.guideLogos.about">
            <strong>0</strong>
            1
          </Trans>
          <ul>
            <li>
              <Trans
                t={t}
                i18nKey="attributions.guideLogos.item"
                values={{ guideName: t('color-guide:guideName.pony'), artist: 'Drakizora' }}
              >
                <a href="http://fav.me/db60g3n">0</a>
                1
                <a href="https://www.deviantart.com/drakizora">2</a>
              </Trans>
            </li>
            <li>
              <Trans
                t={t}
                i18nKey="attributions.guideLogos.item"
                values={{ guideName: t('color-guide:guideName.eqg'), artist: 'Charleston-and-itchy' }}
              >
                <a href="http://fav.me/d6923sw">0</a>
                1
                <a href="https://www.deviantart.com/charleston-and-itchy">2</a>
              </Trans>
            </li>
            <li>
              <Trans
                t={t}
                i18nKey="attributions.guideLogos.item"
                values={{ guideName: t('color-guide:guideName.pl'), artist: 'illumnious' }}
              >
                <a href="http://fav.me/ddztpnc">0</a>
                1
                <a href="https://www.deviantart.com/illumnious">2</a>
              </Trans>
            </li>
          </ul>

          <Trans t={t} i18nKey="attributions.extLink">
            <strong>0</strong>
            1
            <ExternalLink href="https://commons.wikimedia.org/wiki/File:Icon_External_Link.svg">2</ExternalLink>
          </Trans>
          <br />

          <Trans t={t} i18nKey="attributions.loadingIcons">
            <strong>0</strong>
            1
            <ExternalLink href="https://loading.io/">2</ExternalLink>
            3
          </Trans>
          <br />

          {t('attributions.browserLogos.about.0')}
          <strong>{t('attributions.browserLogos.about.1')}</strong>
          {t('attributions.browserLogos.about.2')}
          <Link href="/browser">
            <a>{t('attributions.browserLogos.about.3')}</a>
          </Link>
          {t('attributions.browserLogos.about.4')}
        </p>
        <ul>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.edge">
              <FavMe id="d9rtlbv" />
              1
              <DeviantLink username="masemj" />
              3
              <FavMe id="d8uhefy" />
              5
              <DeviantLink username="furrgroup" />
              7
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.firefox">
              <FavMe id="d4b6f4v" />
              1
              <DeviantLink username="NoReasonToHope" />
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.chrome">
              <FavMe id="d523s3y" />
              1
              <DeviantLink username="he4rtofcourage" />
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.ie">
              <FavMe id="d52fp08" />
              1
              <DeviantLink username="McSadat" />
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.opera">
              <FavMe id="dacngnh" />
              1
              <DeviantLink username="masemj" />
              3
              <FavMe id="d52qnaw" />
              5
              <DeviantLink username="ParallaxMLP" />
              7
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.safari">
              <FavMe id="dadu3l9" />
              1
              <DeviantLink username="masemj" />
              3
              <FavMe id="d530knp" />
              5
              <DeviantLink username="ParallaxMLP" />
              7
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.vivaldi">
              0
              <ExternalLink href="https://vivaldi.com/press/">1</ExternalLink>
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.etc">
              0
              <ExternalLink href="https://github.com/alrra/browser-logos/">1</ExternalLink>
            </Trans>
          </li>
        </ul>
        <p>
          <Trans t={t} i18nKey="attributions.synopsis">
            <strong>0</strong>
            1
            <ExternalLink href="https://www.themoviedb.org/documentation/api">2</ExternalLink>
            3
            {{ msg: t('common:tmdb_disclaimer') }}
          </Trans>
          <br />

          <Trans t={t} i18nKey="attributions.developer">
            <strong>0</strong>
            1
            <ExternalLink href="https://github.com/SeinopSys">2</ExternalLink>
          </Trans>
        </p>
      </section>
      <section id="supported-providers">
        <h2>{t('providers.title')}</h2>
        <div>
          <p>{t('providers.p1')}</p>
          <ul>
            <li><a href="https://sta.sh/">Sta.sh</a>*</li>
            <li><a href="https://deviantart.com/">DeviantArt</a>*</li>
            <li><a href="https://imgur.com/">Imgur</a></li>
            <li><a href="https://derpibooru.org/">Derpibooru</a></li>
            <li><a href="https://app.prntscr.com/">LightShot</a></li>
          </ul>
          <p>{`* ${t('providers.asterisk')}`}</p>
        </div>
      </section>
      <section>
        <h2>{t('atSign.title')}</h2>
        <div>
          <p>
            <Trans t={t} i18nKey="atSign.p1">
              0
              <ExternalLink href={GITHUB_URL}>1</ExternalLink>
              2
            </Trans>
          </p>
        </div>
      </section>
    </Content>
  );
};

AboutPage.defaultProps = {
  i18nNamespaces: ['about', 'color-guide'],
};

export default AboutPage;
