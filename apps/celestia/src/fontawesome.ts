import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faDeviantart, faDiscord, faTelegram, faTwitter, faVk, faWhatsapp, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowCircleLeft,
  faArrowDown,
  faArrowUp,
  faBars,
  faCaretDown,
  faCheck,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircleNotch,
  faClipboard,
  faClock,
  faClone,
  faDownload,
  faEllipsisH,
  faEnvelope,
  faExclamationTriangle,
  faExternalLinkAlt,
  faEye,
  faEyeDropper,
  faEyeSlash,
  faFolder,
  faGlobe,
  faGlobeAmericas,
  faHardHat,
  faHome,
  faImage,
  faInfo,
  faPaintBrush,
  faPalette,
  faPencilAlt,
  faPlus,
  faSearch,
  faShare,
  faSignInAlt,
  faSignOutAlt,
  faSort,
  faStickyNote,
  faSync,
  faTag,
  faTags,
  faThumbtack,
  faTimes,
  faTrash,
  faUser,
  faUserPlus,
  faUsers,
  faVideo,
  IconPack,
} from '@fortawesome/free-solid-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since it's being imported
config.autoAddCss = false;

const brandIcons: (IconDefinition | IconPack)[] = [faDeviantart, faDiscord, faTelegram, faTwitter, faVk, faWhatsapp];

// List of used icons - amend if new icons are needed
library.add(
  ...brandIcons,
  faEye,
  faTag,
  faInfo,
  faBars,
  faSync,
  faHome,
  faPlus,
  faSort,
  faInfo,
  faUser,
  faTags,
  faClone,
  faCheck,
  faClock,
  faGlobe,
  faTimes,
  faUsers,
  faTrash,
  faImage,
  faShare,
  faVideo,
  faFolder,
  faSearch,
  faPalette,
  faHardHat,
  faArrowUp,
  faEnvelope,
  faEyeSlash,
  faUserPlus,
  faDownload,
  faPencilAlt,
  faArrowDown,
  faSignInAlt,
  faEllipsisH,
  faChevronUp,
  faCaretDown,
  faClipboard,
  faThumbtack,
  faPaintBrush,
  faStickyNote,
  faEyeDropper,
  faSignOutAlt,
  faChevronLeft,
  faChevronDown,
  faCircleNotch,
  faCheckCircle,
  faChevronRight,
  faGlobeAmericas,
  faExternalLinkAlt,
  faArrowCircleLeft,
  faExclamationTriangle
);
