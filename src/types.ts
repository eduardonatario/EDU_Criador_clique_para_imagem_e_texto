export type RevealContentType = 'text' | 'image-only' | 'video-only' | 'image' | 'both';

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  color: string;
  details: string;
  contentType?: RevealContentType;
  imageUrl?: string;
  imageCaption?: string;
  videoUrl?: string; // URL do vídeo ou embed iframe
  videoAutoplay?: boolean; // Iniciar vídeo automaticamente (autoplay) ou aguardar play manual
  audioUrl?: string; // URL do áudio em MP3
  showNarrationButton?: boolean; // Exibir botão de leitura/narração neste card (padrão true quando narração ativada)
  categoryId?: string;
}

export interface ActivityCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export type LayoutMode = 'inspector' | 'cards' | 'steps' | 'split';

export type ColorTheme =
  | 'nordic'
  | 'dark'
  | 'vibrant'
  | 'pastel'
  | 'ocean'
  | 'mint'
  | 'sunset';

export type NarrationLanguage = 'pt-BR' | 'en-US';
export type NarrationTrigger = 'auto' | 'manual';

export interface ActivitySettings {
  title: string;
  subtitle: string;
  categoryTitle: string;
  layoutMode: LayoutMode;
  theme: ColorTheme;
  borderRadius: number; // in px: 0, 8, 16, 24
  fontScale: 'sm' | 'md' | 'lg';
  showAccentCircle?: boolean;
  useAccentAsBackground?: boolean;
  clickedCardColor?: string;
  clickedCardTextColor?: string;
  enableSound: boolean;
  enableConfetti: boolean;
  showResetBtn: boolean;
  allowClickToReveal?: boolean;
  enableNarration?: boolean; // Padrão: false (desabilitado inicialmente)
  narrationLanguage?: NarrationLanguage; // 'pt-BR' | 'en-US', padrão 'pt-BR'
  narrationTrigger?: NarrationTrigger; // 'auto' (ao clicar no card) ou 'manual' (apenas botão 'ouvir conteúdo')
  completionMessage: string;
  customCss: string;
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  settings: Partial<ActivitySettings>;
  categories?: ActivityCategory[];
  items: ActivityItem[];
}
