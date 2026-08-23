import { ColorTheme } from '../types';

export interface ThemeColors {
  id: ColorTheme;
  name: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardActiveBg: string;
  cardActiveBorder: string;
  cardRevealedBg: string;
  cardRevealedBorder: string;
  text: string;
  heading: string;
  muted: string;
  accent: string;
  zoneBg: string;
  zoneBorder: string;
  zoneHoverBg: string;
  zoneText: string;
  badgeBg: string;
  badgeText: string;
  progressTrackBg: string;
  progressFillBg: string;
  resetBtnBg: string;
  resetBtnText: string;
  resetBtnHoverBg: string;
}

export const THEME_CONFIGS: Record<ColorTheme, ThemeColors> = {
  nordic: {
    id: 'nordic',
    name: 'Nórdico Clean',
    bg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    cardHoverBorder: '#3b82f6',
    cardActiveBg: '#eff6ff',
    cardActiveBorder: '#3b82f6',
    cardRevealedBg: '#f0fdf4',
    cardRevealedBorder: '#86efac',
    text: '#334155',
    heading: '#0f172a',
    muted: '#64748b',
    accent: '#2563eb',
    zoneBg: '#f1f5f9',
    zoneBorder: '#cbd5e1',
    zoneHoverBg: '#e2e8f0',
    zoneText: '#475569',
    badgeBg: '#eff6ff',
    badgeText: '#1d4ed8',
    progressTrackBg: '#e2e8f0',
    progressFillBg: '#2563eb',
    resetBtnBg: '#e2e8f0',
    resetBtnText: '#475569',
    resetBtnHoverBg: '#cbd5e1',
  },
  dark: {
    id: 'dark',
    name: 'Escuro Executivo',
    bg: '#0f172a',
    cardBg: '#1e293b',
    cardBorder: '#334155',
    cardHoverBorder: '#38bdf8',
    cardActiveBg: '#0c4a6e',
    cardActiveBorder: '#38bdf8',
    cardRevealedBg: '#064e3b',
    cardRevealedBorder: '#059669',
    text: '#cbd5e1',
    heading: '#f8fafc',
    muted: '#94a3b8',
    accent: '#38bdf8',
    zoneBg: '#1e293b',
    zoneBorder: '#475569',
    zoneHoverBg: '#334155',
    zoneText: '#94a3b8',
    badgeBg: '#0369a1',
    badgeText: '#e0f2fe',
    progressTrackBg: '#334155',
    progressFillBg: '#38bdf8',
    resetBtnBg: '#334155',
    resetBtnText: '#cbd5e1',
    resetBtnHoverBg: '#475569',
  },
  ocean: {
    id: 'ocean',
    name: 'Oceano Pacífico',
    bg: '#f0f9ff',
    cardBg: '#ffffff',
    cardBorder: '#bae6fd',
    cardHoverBorder: '#0284c7',
    cardActiveBg: '#e0f2fe',
    cardActiveBorder: '#0284c7',
    cardRevealedBg: '#ecfdf5',
    cardRevealedBorder: '#a7f3d0',
    text: '#334155',
    heading: '#0369a1',
    muted: '#0284c7',
    accent: '#0284c7',
    zoneBg: '#e0f2fe',
    zoneBorder: '#93c5fd',
    zoneHoverBg: '#bae6fd',
    zoneText: '#0369a1',
    badgeBg: '#e0f2fe',
    badgeText: '#0369a1',
    progressTrackBg: '#bae6fd',
    progressFillBg: '#0284c7',
    resetBtnBg: '#e0f2fe',
    resetBtnText: '#0369a1',
    resetBtnHoverBg: '#bae6fd',
  },
  sunset: {
    id: 'sunset',
    name: 'Pôr do Sol Warm',
    bg: '#fff7ed',
    cardBg: '#ffffff',
    cardBorder: '#fed7aa',
    cardHoverBorder: '#ea580c',
    cardActiveBg: '#ffedd5',
    cardActiveBorder: '#ea580c',
    cardRevealedBg: '#f0fdf4',
    cardRevealedBorder: '#bbf7d0',
    text: '#431407',
    heading: '#9a3412',
    muted: '#c2410c',
    accent: '#ea580c',
    zoneBg: '#ffedd5',
    zoneBorder: '#fdba74',
    zoneHoverBg: '#fed7aa',
    zoneText: '#9a3412',
    badgeBg: '#ffedd5',
    badgeText: '#9a3412',
    progressTrackBg: '#fed7aa',
    progressFillBg: '#ea580c',
    resetBtnBg: '#ffedd5',
    resetBtnText: '#9a3412',
    resetBtnHoverBg: '#fed7aa',
  },
  vibrant: {
    id: 'vibrant',
    name: 'Vibrante Lilás',
    bg: '#faf5ff',
    cardBg: '#ffffff',
    cardBorder: '#e9d5ff',
    cardHoverBorder: '#a855f7',
    cardActiveBg: '#f3e8ff',
    cardActiveBorder: '#a855f7',
    cardRevealedBg: '#ecfdf5',
    cardRevealedBorder: '#a7f3d0',
    text: '#3b0764',
    heading: '#6b21a8',
    muted: '#9333ea',
    accent: '#a855f7',
    zoneBg: '#f3e8ff',
    zoneBorder: '#d8b4fe',
    zoneHoverBg: '#e9d5ff',
    zoneText: '#6b21a8',
    badgeBg: '#f3e8ff',
    badgeText: '#6b21a8',
    progressTrackBg: '#e9d5ff',
    progressFillBg: '#a855f7',
    resetBtnBg: '#f3e8ff',
    resetBtnText: '#6b21a8',
    resetBtnHoverBg: '#e9d5ff',
  },
  mint: {
    id: 'mint',
    name: 'Menta Escolar',
    bg: '#f0fdf4',
    cardBg: '#ffffff',
    cardBorder: '#bbf7d0',
    cardHoverBorder: '#16a34a',
    cardActiveBg: '#dcfce7',
    cardActiveBorder: '#16a34a',
    cardRevealedBg: '#f0fdf4',
    cardRevealedBorder: '#86efac',
    text: '#14532d',
    heading: '#166534',
    muted: '#15803d',
    accent: '#16a34a',
    zoneBg: '#dcfce7',
    zoneBorder: '#86efac',
    zoneHoverBg: '#bbf7d0',
    zoneText: '#166534',
    badgeBg: '#dcfce7',
    badgeText: '#166534',
    progressTrackBg: '#bbf7d0',
    progressFillBg: '#16a34a',
    resetBtnBg: '#dcfce7',
    resetBtnText: '#166534',
    resetBtnHoverBg: '#bbf7d0',
  },
  pastel: {
    id: 'pastel',
    name: 'Pastel Suave',
    bg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    cardHoverBorder: '#38bdf8',
    cardActiveBg: '#f0f9ff',
    cardActiveBorder: '#38bdf8',
    cardRevealedBg: '#f0fdf4',
    cardRevealedBorder: '#86efac',
    text: '#334155',
    heading: '#0f172a',
    muted: '#64748b',
    accent: '#0284c7',
    zoneBg: '#f8fafc',
    zoneBorder: '#e2e8f0',
    zoneHoverBg: '#f1f5f9',
    zoneText: '#475569',
    badgeBg: '#f0f9ff',
    badgeText: '#0284c7',
    progressTrackBg: '#e2e8f0',
    progressFillBg: '#0284c7',
    resetBtnBg: '#f1f5f9',
    resetBtnText: '#475569',
    resetBtnHoverBg: '#e2e8f0',
  },
};

export function getTheme(themeId?: string): ThemeColors {
  if (themeId && themeId in THEME_CONFIGS) {
    return THEME_CONFIGS[themeId as ColorTheme];
  }
  return THEME_CONFIGS.nordic;
}

export function getHexLuminance(hexColor?: string): number {
  if (!hexColor) return 0.2;
  let clean = hexColor.trim();
  if (!clean.startsWith('#')) return 0.2;
  clean = clean.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (clean.length !== 6) return 0.2;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return 0.2;

  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function getContrastTextColor(hexColor?: string): string {
  const luminance = getHexLuminance(hexColor);
  return luminance > 0.42 ? '#0f172a' : '#ffffff';
}

export function getContrastMutedColor(hexColor?: string): string {
  const luminance = getHexLuminance(hexColor);
  return luminance > 0.42 ? '#475569' : 'rgba(255, 255, 255, 0.85)';
}

export function getUniformCardsTextColor(
  items: { color?: string }[],
  fallbackAccent = '#3b82f6'
): string {
  if (!items || items.length === 0) return '#ffffff';
  let darkTextCount = 0;
  let lightTextCount = 0;
  let totalLuminance = 0;

  for (const item of items) {
    const col = item.color || fallbackAccent;
    const lum = getHexLuminance(col);
    totalLuminance += lum;
    if (lum > 0.42) {
      darkTextCount++;
    } else {
      lightTextCount++;
    }
  }

  const avgLum = totalLuminance / items.length;
  // Se a maioria dos cartões for clara/pastel e a luminância média for alta, todos os cards usam fonte escura
  if (darkTextCount > lightTextCount && avgLum > 0.48) {
    return '#0f172a';
  }
  // Caso contrário, todos os cards usam fonte branca nítida
  return '#ffffff';
}

export function adjustHexBrightness(hexColor?: string, percent = 0): string {
  if (!hexColor) return '#3b82f6';
  let clean = hexColor.trim();
  if (!clean.startsWith('#')) return hexColor;
  clean = clean.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (clean.length !== 6) return hexColor;
  let r = parseInt(clean.substring(0, 2), 16);
  let g = parseInt(clean.substring(2, 4), 16);
  let b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hexColor;

  if (percent > 0) {
    r = Math.round(r + (255 - r) * (percent / 100));
    g = Math.round(g + (255 - g) * (percent / 100));
    b = Math.round(b + (255 - b) * (percent / 100));
  } else if (percent < 0) {
    const factor = (100 + percent) / 100;
    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);
  }

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getAccentTone(
  baseColor?: string,
  state: 'initial' | 'active' | 'revealed' = 'initial'
): string {
  const color = baseColor || '#3b82f6';
  const lum = getHexLuminance(color);
  const isVeryDark = lum < 0.12;

  if (state === 'initial') {
    // Tom inicial (antes de clicar): Tom vibrante e original
    return color;
  } else if (state === 'active') {
    // Ao clicar / Selecionado no momento: Tom com realce nítido
    return adjustHexBrightness(color, isVeryDark ? 20 : -10);
  } else {
    // Depois de clicar / Revelado: Tom distintamente mais escuro/fechado para indicar conclusão
    return adjustHexBrightness(color, isVeryDark ? 28 : -26);
  }
}

export function getThemeCss(
  appId: string,
  themeId: string,
  customClickedColor?: string,
  customClickedTextColor?: string
): string {
  const theme = getTheme(themeId);
  const revealedBg = customClickedColor || theme.cardRevealedBg;
  const revealedBorder = adjustHexBrightness(revealedBg, -18);
  const activeBg = adjustHexBrightness(revealedBg, 6);
  const activeBorder = adjustHexBrightness(revealedBg, -24);

  const revealedText = customClickedTextColor || getContrastTextColor(revealedBg);
  const revealedMuted = customClickedTextColor
    ? (getHexLuminance(revealedBg) > 0.42 ? '#475569' : 'rgba(255, 255, 255, 0.85)')
    : getContrastMutedColor(revealedBg);

  const activeText = customClickedTextColor || getContrastTextColor(activeBg);
  const activeMuted = customClickedTextColor
    ? (getHexLuminance(activeBg) > 0.42 ? '#475569' : 'rgba(255, 255, 255, 0.85)')
    : getContrastMutedColor(activeBg);

  return `
#${appId} {
  --edu-bg: ${theme.bg};
  --edu-card-bg: ${theme.cardBg};
  --edu-card-border: ${theme.cardBorder};
  --edu-card-hover-border: ${theme.cardHoverBorder};
  --edu-text: ${theme.text};
  --edu-heading: ${theme.heading};
  --edu-muted: ${theme.muted};
  --edu-accent: ${theme.accent};
  --edu-zone-bg: ${theme.zoneBg};
  --edu-zone-border: ${theme.zoneBorder};
  --edu-zone-hover: ${theme.zoneHoverBg};
  --edu-zone-text: ${theme.zoneText};
  --edu-badge-bg: ${theme.badgeBg};
  --edu-badge-text: ${theme.badgeText};
  --edu-card-active: ${activeBg};
  --edu-card-active-border: ${activeBorder};
  --edu-card-active-text: ${activeText};
  --edu-card-active-muted: ${activeMuted};
  --edu-card-revealed: ${revealedBg};
  --edu-card-revealed-border: ${revealedBorder};
  --edu-card-revealed-text: ${revealedText};
  --edu-card-revealed-muted: ${revealedMuted};
  --edu-progress-track: ${theme.progressTrackBg};
  --edu-progress-fill: ${theme.progressFillBg};
  --edu-reset-btn-bg: ${theme.resetBtnBg};
  --edu-reset-btn-text: ${theme.resetBtnText};
  --edu-reset-btn-hover-bg: ${theme.resetBtnHoverBg};
}
`;
}
