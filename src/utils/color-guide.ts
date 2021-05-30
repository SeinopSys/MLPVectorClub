import {
  Appearance,
  FullGuideSortField,
  GuideName,
  Nullable,
  Numeric,
  Optional,
  PreviewAppearance,
  SlimGuideTag,
  TagType,
} from 'src/types';
import { colorGuide } from 'src/strings';
import { RgbColors } from 'src/types/sprite-generator';
import { pad } from 'lodash';

const guideNameMap: Record<GuideName, string> = {
  pony: 'Friendship is Magic',
  pl: 'Pony Life',
  eqg: 'Equestria Girls',
};

export const isGuideName = (name: unknown): name is GuideName => typeof name === 'string' && name in guideNameMap;

export const resolveGuideName = (guide?: string | string[]): Optional<GuideName> => {
  if (isGuideName(guide)) {
    return guide as GuideName;
  }
};

export const getGuideLabel = (guide: string | null): string => {
  if (isGuideName(guide)) {
    return guideNameMap[guide];
  }
  return colorGuide.unknownGuide;
};

export const getGuideTitle = (
  guide: Nullable<string> = null,
  page: Nullable<Numeric> = null,
  q = '',
): string => {
  const guideName = getGuideLabel(guide);
  if (page === null) {
    return `${guideName} Color Guide`;
  }

  const withPage = `Page ${page} - ${guideName} Color Guide`;

  return q !== '' ? `${q} - ${withPage}` : withPage;
};

export const getAppearanceTitle = (
  guide: Nullable<string> = null,
  appearance: Pick<PreviewAppearance, 'label'> | null = null,
): string => (!appearance ? getGuideTitle(guide) : `${appearance.label} - ${getGuideTitle(guide)}`);

export interface ScaleResizeResult {
  scale: number;
  width: number;
  height: number;
}

export function scaleResize(w: number, h: number, property: 'scale' | 'width' | 'height', desiredValue: number): ScaleResizeResult {
  let div: number;
  switch (property) {
    case 'scale':
      return {
        scale: desiredValue,
        height: Math.round(h * desiredValue),
        width: Math.round(w * desiredValue),
      };
    case 'height':
      div = desiredValue / h;
      return {
        height: desiredValue,
        width: Math.round(w * div),
        scale: div,
      };
    case 'width':
      div = desiredValue / w;
      return {
        height: Math.round(h * div),
        width: desiredValue,
        scale: div,
      };
    default:
      throw new Error('Invalid arguments passed to scaleResize');
  }
}

export const fullListSortOptionsMap: Record<FullGuideSortField, string> = {
  label: 'alphabetically',
  added: 'by date added',
  relevance: 'by relevance',
};

export const isValidFullListSortOption = (sort: unknown): sort is FullGuideSortField =>
  typeof sort === 'string' && sort in fullListSortOptionsMap;

export const getFullGuideTitle = (
  guide: Nullable<string> = null,
): string => {
  const guideName = getGuideLabel(guide);
  return `Full List - ${guideName} Color Guide`;
};

const fullGuideNameMap: Record<GuideName, string> = {
  eqg: 'EQG Character',
  pl: 'Pony Life Character',
  pony: 'FiM Pony',
};

export const getFullGuideHeading = (
  guide: Nullable<string> = null,
): string => {
  const subject = isGuideName(guide) ? fullGuideNameMap[guide] : 'Character';

  return `Complete ${subject} List`;
};

const TAG_SORT_ORDER: Record<TagType, number> = {
  app: 1,
  cat: 2,
  char: 3,
  gen: 4,
  spec: 5,
  warn: 6,
};

export const sortTagsByType = <T extends SlimGuideTag>(tagA: T, tagB: T): number => {
  const orderA = tagA.type ? TAG_SORT_ORDER[tagA.type] : Infinity;
  const orderB = tagB.type ? TAG_SORT_ORDER[tagB.type] : Infinity;
  return orderA > orderB ? 1 : (orderA < orderB ? -1 : 0);
};

export const getGuideChangesHeading = (
  guide: Nullable<string> = null,
): string => {
  const guideName = getGuideLabel(guide);
  return `Major ${guideName} Color Changes`;
};

interface CutieMarkMappingColor {
  groupLabel: string;
  colorLabel: string;
  hex: string;
}

export interface CutieMarkColorMapping {
  'Coat Outline': string,
  'Coat Shadow Outline': string,
  'Coat Fill': string,
  'Coat Shadow Fill': string,
  'Mane & Tail Outline': string,
  'Mane & Tail Fill': string,
}

export const getColorMapping = (
  colorGroups: Appearance['colorGroups'],
  defaultColorMapping: CutieMarkColorMapping,
): CutieMarkColorMapping => {
  const $colors: CutieMarkMappingColor[] = colorGroups.reduce((colors, cg) => {
    cg.colors.forEach(c => {
      colors.push({ groupLabel: cg.label, colorLabel: c.label, hex: c.hex });
    });
    return colors;
  }, [] as CutieMarkMappingColor[]);

  const colorMapping: Partial<CutieMarkColorMapping> = {};
  $colors.forEach($row => {
    let groupLabel: string = $row.groupLabel.replace(/^(Costume|Dress)$/, 'Coat');
    groupLabel = groupLabel.replace(/^(Coat|Mane & Tail) \([^)]+\)$/, '$1');
    const isEye = $row.groupLabel === 'Iris';
    const eyeRegex = !isEye ? '|Gradient(?:\\s(?:Light|(?:\\d+\\s)?(?:Top|Botom)))?\\s' : '';
    const colorLabel = $row.colorLabel.replace(
      new RegExp(`^(?:(?:(?:Purple|Yellow|Red)\\s)?(?:Main|First|Normal${eyeRegex}))?(.+?)(?:\\s\\d+)?(?:/.*)?$`),
      '$1',
    );
    const normalizedLabel = `${groupLabel} ${colorLabel}`;
    if (normalizedLabel in defaultColorMapping && !(normalizedLabel in colorMapping)) {
      colorMapping[normalizedLabel as keyof CutieMarkColorMapping] = $row.hex;
    }
  });
  if (!('Coat Shadow Outline' in colorMapping) && 'Coat Outline' in colorMapping) {
    colorMapping['Coat Shadow Outline'] = colorMapping['Coat Outline'];
  }
  if (!('Coat Shadow Fill' in colorMapping) && 'Coat Fill' in colorMapping) {
    colorMapping['Coat Shadow Fill'] = colorMapping['Coat Fill'];
  }

  return {
    ...defaultColorMapping,
    ...colorMapping,
  };
};

/**
 * Converts a set of rgb values to a single number for any purpose
 * @param r 0-255
 * @param g 0-255
 * @param b 0-255
 */
// eslint-disable-next-line no-bitwise
export const convertRgbToNumber = (r: number, g: number, b: number): number => ((r << 16) + (g << 8) + b);

export const stringifyRgbNumber = (hexNumber: number): string => `#${pad(hexNumber.toString(16).toUpperCase(), 6, '0')}`;

export const stringifyRgbKey = (map: Record<number, RgbColors> | null, key: number): string => {
  let hexNumber = key;
  if (typeof map === 'object' && map !== null && key in map) {
    const rgb = map[key];
    hexNumber = convertRgbToNumber(rgb.red, rgb.green, rgb.blue);
  }
  return `#${stringifyRgbNumber(hexNumber)}`;
};

// language=JSRegexp
export const validHexColorPattern = '^#?([a-fA-F\\d]{3}|[a-fA-F\\d]{6})$';
