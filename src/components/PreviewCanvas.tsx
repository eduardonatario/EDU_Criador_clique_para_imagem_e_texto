import React, { useState, useRef, useEffect } from 'react';
import { ActivityItem, ActivitySettings } from '../types';
import {
  RefreshCw,
  Volume2,
  VolumeX,
  Play,
  Square
} from 'lucide-react';
import { getTheme, getUniformCardsTextColor, getContrastTextColor, getAccentTone, adjustHexBrightness } from '../utils/themeConfig';
import { formatEmbedVideoUrl } from './ItemEditor';

interface PreviewCanvasProps {
  settings: ActivitySettings;
  items: ActivityItem[];
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  settings,
  items,
}) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [isDropzoneHovered, setIsDropzoneHovered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const theme = getTheme(settings.theme);
  const activeItem = items.find((i) => i.id === activeItemId);
  const uniformCardTextColor = getUniformCardsTextColor(items, theme.accent);

  const stopAllAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const playItemNarration = (item: ActivityItem) => {
    stopAllAudio();

    if (item.audioUrl && item.audioUrl.trim()) {
      try {
        const audio = new Audio(item.audioUrl.trim());
        currentAudioRef.current = audio;
        setIsPlayingAudio(true);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          console.warn('Audio playback failed for item:', item.id);
          setIsPlayingAudio(false);
        };
        audio.play().catch((err) => {
          console.warn('Playback error:', err);
          setIsPlayingAudio(false);
        });
      } catch (e) {
        console.warn(e);
        setIsPlayingAudio(false);
      }
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const textToSpeak = `${item.title}. ${item.subtitle ? item.subtitle + '. ' : ''}${item.details || item.imageCaption || ''}`;
      if (!textToSpeak.trim()) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = settings.narrationLanguage || 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectItem = (id: string) => {
    setActiveItemId(id);
    setRevealedIds((prev) => new Set(prev).add(id));

    const selected = items.find((i) => i.id === id);
    if (selected && settings.enableNarration && settings.narrationTrigger !== 'manual') {
      playItemNarration(selected);
    } else {
      stopAllAudio();
    }
  };

  const handleReset = () => {
    stopAllAudio();
    setActiveItemId(null);
    setRevealedIds(new Set());
  };

  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  return (
    <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col gap-4">
      {/* Top Preview Controls */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-800">Visualização em Tempo Real</span>
        </div>
      </div>

      {/* Simulator Frame */}
      <div className="w-full overflow-x-auto py-2 flex justify-center">
        <div
          className="w-full max-w-[960px] transition-all duration-300 rounded-2xl shadow-sm p-5 sm:p-6 border text-slate-800"
          style={{
            borderRadius: `${settings.borderRadius}px`,
            backgroundColor: theme.bg,
            borderColor: theme.cardBorder,
            color: theme.text,
          }}
        >
          {/* Header */}
          {(settings.title?.trim() || settings.subtitle?.trim()) && (
            <div className="text-center mb-6">
              {settings.title?.trim() && (
                <h2
                  className="text-xl font-bold tracking-tight"
                  style={{ color: theme.heading }}
                >
                  {settings.title}
                </h2>
              )}
              {settings.subtitle?.trim() && (
                <p
                  className="text-xs mt-1"
                  style={{ color: theme.muted }}
                >
                  {settings.subtitle}
                </p>
              )}
            </div>
          )}

          {/* Interactive Layout Container based on settings.layoutMode */}
          <div
            className={
              settings.layoutMode === 'inspector'
                ? 'grid grid-cols-1 md:grid-cols-12 gap-5'
                : 'flex flex-col gap-5'
            }
          >
            {/* Cards Pool Column / Top Section */}
            <div
              className={
                settings.layoutMode === 'inspector'
                  ? 'md:col-span-5 space-y-3'
                  : 'w-full space-y-3'
              }
            >
              {/* Items Container with Layout Specific Classes */}
              <div
                className={
                  settings.layoutMode === 'inspector'
                    ? 'flex flex-col gap-2.5 w-full'
                    : items.length === 1
                    ? 'grid grid-cols-1 gap-3'
                    : items.length === 2
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
                    : items.length === 3
                    ? 'grid grid-cols-1 sm:grid-cols-3 gap-3'
                    : items.length === 4
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'
                    : items.length === 5
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'
                    : items.length === 6
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'
                    : items.length === 7
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
                    : items.length === 8
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'
                    : items.length === 9
                    ? 'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3'
                    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
                }
              >
                {items.map((item, index) => {
                  const isRevealed = revealedIds.has(item.id);
                  const isActive = activeItemId === item.id;
                  const showCircle = settings.showAccentCircle === true;
                  const useAccentBg = settings.useAccentAsBackground === true;
                  const baseAccentColor = item.color || theme.accent || '#3b82f6';
                  
                  // Compute distinct tones for initial (before click), active (clicked/current), and revealed (after click)
                  const cardState = isActive ? 'active' : isRevealed ? 'revealed' : 'initial';
                  const effectiveAccentBg = useAccentBg ? getAccentTone(baseAccentColor, cardState) : baseAccentColor;
                  const contrastText = useAccentBg ? uniformCardTextColor : theme.heading;

                  // Custom Click / Revealed color options - direct user color application
                  const customClickedBg = settings.clickedCardColor || theme.cardRevealedBg || '#e2e8f0';
                  const customClickedBorder = adjustHexBrightness(customClickedBg, -18);
                  const customClickedContrast = settings.clickedCardTextColor || getContrastTextColor(customClickedBg);

                  // Colors when not using accent background
                  const isClickedState = isActive || isRevealed;
                  const normalCardBg = isClickedState ? customClickedBg : theme.cardBg;
                  const normalCardBorder = isActive
                    ? (theme.accent || '#3b82f6')
                    : isRevealed
                    ? customClickedBorder
                    : theme.cardBorder;

                  const normalHeadingColor = isClickedState
                    ? customClickedContrast
                    : theme.heading;
                  const normalMutedColor = isClickedState
                    ? (customClickedContrast === '#ffffff' ? 'rgba(255, 255, 255, 0.85)' : '#475569')
                    : theme.muted;

                  const isDarkRevealed = customClickedContrast === '#ffffff';
                  const normalBadgeBg = isClickedState
                    ? (isDarkRevealed ? 'rgba(255, 255, 255, 0.25)' : theme.badgeBg)
                    : theme.badgeBg;
                  const normalBadgeText = isClickedState
                    ? (isDarkRevealed ? '#ffffff' : theme.badgeText)
                    : theme.badgeText;

                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => setDraggedItemId(item.id)}
                      onDragEnd={() => setDraggedItemId(null)}
                      onClick={() => handleSelectItem(item.id)}
                      className={`border rounded-xl cursor-grab active:cursor-grabbing transition-all select-none flex items-center justify-between gap-2.5 px-3.5 py-2.5 h-[60px] min-h-[60px] max-h-[60px] w-full box-border shadow-xs ${
                        useAccentBg
                          ? isActive
                            ? 'ring-2 ring-offset-2 ring-blue-500 shadow-md'
                            : isRevealed
                            ? 'shadow-xs opacity-90'
                            : 'hover:shadow-md'
                          : isActive
                          ? 'ring-2 ring-offset-1 ring-blue-500 shadow-sm'
                          : isRevealed
                          ? 'shadow-xs'
                          : 'hover:shadow-md'
                      }`}
                      style={{
                        borderRadius: `${Math.max(6, settings.borderRadius - 4)}px`,
                        backgroundColor: useAccentBg ? effectiveAccentBg : normalCardBg,
                        borderColor: useAccentBg ? adjustHexBrightness(effectiveAccentBg, -10) : normalCardBorder,
                        color: useAccentBg ? contrastText : theme.text,
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {showCircle && (
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: useAccentBg
                                ? contrastText === '#ffffff'
                                  ? 'rgba(255, 255, 255, 0.9)'
                                  : 'rgba(0, 0, 0, 0.65)'
                                : baseAccentColor,
                            }}
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-xs font-bold truncate leading-tight"
                            style={{
                              color: useAccentBg ? contrastText : normalHeadingColor,
                            }}
                          >
                            {item.title}
                          </p>
                          {item.subtitle ? (
                            <p
                              className="text-[11px] truncate leading-tight mt-0.5"
                              style={{
                                color: useAccentBg
                                  ? contrastText === '#ffffff'
                                    ? 'rgba(255, 255, 255, 0.85)'
                                    : 'rgba(15, 23, 42, 0.75)'
                                  : normalMutedColor,
                              }}
                            >
                              {item.subtitle}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      {item.badge && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: useAccentBg
                              ? contrastText === '#ffffff'
                                ? 'rgba(255, 255, 255, 0.22)'
                                : 'rgba(0, 0, 0, 0.1)'
                              : normalBadgeBg,
                            color: useAccentBg ? contrastText : normalBadgeText,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dropzone / Inspector Column */}
            <div
              className={
                settings.layoutMode === 'inspector'
                  ? 'md:col-span-7 flex flex-col justify-between'
                  : 'w-full flex flex-col justify-between'
              }
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDropzoneHovered(true);
                }}
                onDragLeave={() => setIsDropzoneHovered(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDropzoneHovered(false);
                  if (draggedItemId) {
                    handleSelectItem(draggedItemId);
                  }
                }}
                className={`min-h-[260px] ${
                  activeItem &&
                  ((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' && activeItem.imageUrl ||
                   (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'video-only' && activeItem.videoUrl)
                    ? 'p-0 overflow-hidden border-0'
                    : 'p-5 border border-solid'
                } transition-colors flex flex-col items-center justify-center text-center ${
                  isDropzoneHovered
                    ? 'shadow-inner'
                    : ''
                }`}
                style={{
                  borderRadius: `${settings.borderRadius}px`,
                  backgroundColor:
                    activeItem &&
                    (((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' && activeItem.imageUrl) ||
                     ((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'video-only' && activeItem.videoUrl))
                      ? 'transparent'
                      : isDropzoneHovered
                      ? theme.zoneHoverBg
                      : theme.zoneBg,
                  borderColor:
                    activeItem &&
                    (((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' && activeItem.imageUrl) ||
                     ((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'video-only' && activeItem.videoUrl))
                      ? 'transparent'
                      : isDropzoneHovered
                      ? theme.accent
                      : theme.zoneBorder,
                  borderWidth:
                    activeItem &&
                    (((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' && activeItem.imageUrl) ||
                     ((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'video-only' && activeItem.videoUrl))
                      ? 0
                      : undefined,
                  borderStyle:
                    activeItem &&
                    (((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' && activeItem.imageUrl) ||
                     ((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'video-only' && activeItem.videoUrl))
                      ? 'none'
                      : 'solid',
                  color: theme.zoneText,
                }}
              >
                {activeItem ? (
                  (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' ? (
                    <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center animate-fadeIn">
                      {activeItem.imageUrl ? (
                        <img
                          src={activeItem.imageUrl}
                          alt={activeItem.title}
                          className="w-full h-full min-h-[260px] max-h-[500px] object-cover block m-0 p-0 border-0"
                          style={{
                            borderRadius: `${settings.borderRadius}px`,
                          }}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div
                          className="text-center p-6 font-medium text-xs"
                          style={{ color: theme.muted }}
                        >
                          Insira a URL da imagem no editor deste item para revelá-la aqui.
                        </div>
                      )}
                    </div>
                  ) : (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'video-only' ? (
                    <div className="w-full h-full min-h-[260px] sm:min-h-[300px] flex flex-col items-center justify-center animate-fadeIn overflow-hidden">
                      {activeItem.videoUrl ? (
                        <iframe
                          src={formatEmbedVideoUrl(activeItem.videoUrl, activeItem.videoAutoplay)}
                          title={activeItem.title}
                          className="w-full h-full min-h-[260px] sm:min-h-[320px] aspect-video border-0 block"
                          style={{
                            borderRadius: `${settings.borderRadius}px`,
                            width: '100%',
                            minHeight: '260px',
                          }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <div
                          className="text-center p-6 font-medium text-xs"
                          style={{ color: theme.muted }}
                        >
                          Insira a URL do vídeo ou iframe no editor deste item para exibi-lo aqui.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full text-left space-y-3 animate-fadeIn">
                      <div
                        className="border-b pb-3 flex items-start justify-between gap-3"
                        style={{ borderColor: theme.zoneBorder }}
                      >
                        <div>
                          <h3
                            className="text-base font-bold"
                            style={{ color: theme.heading }}
                          >
                            {activeItem.title}
                          </h3>
                          {activeItem.subtitle && (
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: theme.muted }}
                            >
                              {activeItem.subtitle}
                            </p>
                          )}
                        </div>

                        {((settings.enableNarration && activeItem.showNarrationButton !== false) || Boolean(activeItem.audioUrl)) && (() => {
                          const isEnglish = settings.narrationLanguage === 'en-US';
                          const listenText = isEnglish ? 'Listen' : 'Ouvir';
                          const stopText = isEnglish ? 'Stop' : 'Parar';

                          return (
                            <button
                              type="button"
                              onClick={() => {
                                if (isPlayingAudio) {
                                  stopAllAudio();
                                } else {
                                  playItemNarration(activeItem);
                                }
                              }}
                              className="px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-semibold transition cursor-pointer flex-shrink-0 shadow-2xs hover:opacity-90"
                              style={{
                                backgroundColor: isPlayingAudio ? theme.badgeBg : theme.cardBg,
                                borderColor: isPlayingAudio ? theme.accent : theme.cardBorder,
                                color: theme.accent,
                              }}
                              title={isPlayingAudio ? stopText : listenText}
                            >
                              {isPlayingAudio ? (
                                <>
                                  <Square className="w-3.5 h-3.5 fill-current" />
                                  <span className="text-xs font-medium">{stopText}</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span className="text-xs font-medium">{listenText}</span>
                                </>
                              )}
                            </button>
                          );
                        })()}
                      </div>

                      {/* Conteúdo Revelado (Imagem + Legenda, Texto ou Ambos) */}
                      <div className="space-y-3 pt-1">
                        {((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image' ||
                          (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'both') &&
                          activeItem.imageUrl && (
                            <figure
                              className="my-2 p-0 rounded-xl overflow-hidden bg-transparent border-0"
                            >
                              <img
                                src={activeItem.imageUrl}
                                alt={activeItem.imageCaption || activeItem.title}
                                className="w-full max-h-[380px] object-cover rounded-xl block"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              {activeItem.imageCaption && (
                                <figcaption
                                  className="text-[11px] text-center font-medium italic mt-2"
                                  style={{ color: theme.muted }}
                                >
                                  {activeItem.imageCaption}
                                </figcaption>
                              )}
                            </figure>
                          )}

                        {((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'text' ||
                          (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'both') &&
                          activeItem.details && (
                            <div
                              className="text-xs leading-relaxed whitespace-pre-line font-sans"
                              style={{ color: theme.text }}
                            >
                              {activeItem.details}
                            </div>
                          )}
                      </div>
                    </div>
                  )
                ) : (
                  <div className="space-y-2">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border"
                      style={{
                        backgroundColor: theme.badgeBg,
                        borderColor: theme.cardBorder,
                        color: theme.accent,
                      }}
                    >
                    </div>
                    {settings.categoryTitle?.trim() && (
                      <p
                        className="text-sm font-bold"
                        style={{ color: theme.heading }}
                      >
                        {settings.categoryTitle}
                      </p>
                    )}
                    <p
                      className="text-xs max-w-xs mx-auto"
                      style={{ color: theme.muted }}
                    >
                      Clique em um item da lista para revelar suas informações completas.
                    </p>
                  </div>
                )}
              </div>

              {/* Completion Message */}
              {revealedIds.size === items.length && items.length > 0 && settings.completionMessage?.trim() && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold text-center animate-bounceIn">
                  {settings.completionMessage}
                </div>
              )}

              {/* Reset button */}
              {settings.showResetBtn && (() => {
                const isEnglish = Boolean(settings.enableNarration && settings.narrationLanguage === 'en-US');
                const resetBtnText = isEnglish ? 'Restart Activity' : 'Reiniciar Atividade';

                return (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition"
                      style={{
                        backgroundColor: theme.resetBtnBg,
                        color: theme.resetBtnText,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = theme.resetBtnHoverBg;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = theme.resetBtnBg;
                      }}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{resetBtnText}</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
