import React, { useState } from 'react';
import { ActivityItem, ActivitySettings } from '../types';
import {
  RefreshCw,
  MoveRight
} from 'lucide-react';
import { getTheme, getUniformCardsTextColor, getContrastTextColor, getAccentTone, adjustHexBrightness } from '../utils/themeConfig';

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

  const theme = getTheme(settings.theme);
  const activeItem = items.find((i) => i.id === activeItemId);
  const uniformCardTextColor = getUniformCardsTextColor(items, theme.accent);

  const handleSelectItem = (id: string) => {
    setActiveItemId(id);
    setRevealedIds((prev) => new Set(prev).add(id));
  };

  const handleReset = () => {
    setActiveItemId(null);
    setRevealedIds(new Set());
  };

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
                    ? 'flex flex-col gap-2.5 h-full justify-between'
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
                  const isInspector = settings.layoutMode === 'inspector';

                  // Custom Click / Revealed color options
                  const customClickedBg = settings.clickedCardColor || theme.cardRevealedBg || '#f0fdf4';
                  const customClickedBorder = adjustHexBrightness(customClickedBg, -18);
                  const customClickedContrast = settings.clickedCardTextColor || getContrastTextColor(customClickedBg);
                  const customActiveBg = adjustHexBrightness(customClickedBg, 4);
                  const customActiveBorder = adjustHexBrightness(customClickedBg, -24);

                  // Colors when not using accent background
                  const normalCardBg = isActive
                    ? customActiveBg
                    : isRevealed
                    ? customClickedBg
                    : theme.cardBg;
                  const normalCardBorder = isActive
                    ? customActiveBorder
                    : isRevealed
                    ? customClickedBorder
                    : theme.cardBorder;

                  const normalHeadingColor = (isActive || isRevealed)
                    ? customClickedContrast
                    : theme.heading;
                  const normalMutedColor = (isActive || isRevealed)
                    ? (customClickedContrast === '#ffffff' ? 'rgba(255, 255, 255, 0.85)' : '#475569')
                    : theme.muted;

                  const isDarkRevealed = customClickedContrast === '#ffffff';
                  const normalBadgeBg = (isActive || isRevealed)
                    ? (isDarkRevealed ? 'rgba(255, 255, 255, 0.25)' : theme.badgeBg)
                    : theme.badgeBg;
                  const normalBadgeText = (isActive || isRevealed)
                    ? (isDarkRevealed ? '#ffffff' : theme.badgeText)
                    : theme.badgeText;

                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => setDraggedItemId(item.id)}
                      onDragEnd={() => setDraggedItemId(null)}
                      onClick={() => {
                        if (settings.allowClickToReveal) {
                          handleSelectItem(item.id);
                        }
                      }}
                      className={`border rounded-xl cursor-grab active:cursor-grabbing transition-colors select-none flex items-center justify-between gap-2 shadow-xs ${
                        isInspector
                          ? items.length === 1
                            ? 'p-4 min-h-[96px] flex-1'
                            : items.length === 2
                            ? 'p-3.5 min-h-[76px] flex-1'
                            : items.length === 3
                            ? 'p-3 min-h-[64px] flex-1'
                            : items.length === 4
                            ? 'p-3 min-h-[56px] flex-1'
                            : 'p-2.5 min-h-[48px] flex-1'
                          : 'p-3 min-h-[56px] h-full w-full'
                      } ${
                        useAccentBg
                          ? isActive
                            ? 'ring-2 ring-offset-2 ring-blue-500 shadow-md'
                            : isRevealed
                            ? 'shadow-xs opacity-90'
                            : 'hover:shadow-md'
                          : isActive
                          ? 'ring-2 ring-offset-1 ring-blue-500/40 shadow-sm'
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
                      <div className="flex items-center gap-2.5 min-w-0">
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
                        <div className="min-w-0">
                          <p
                            className="text-xs font-bold truncate"
                            style={{
                              color: useAccentBg ? contrastText : normalHeadingColor,
                            }}
                          >
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p
                              className="text-[11px] truncate"
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
                          )}
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
                              : theme.badgeBg,
                            color: useAccentBg ? contrastText : theme.badgeText,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div
                className="w-full h-1.5 rounded-full overflow-hidden mt-3"
                style={{ backgroundColor: theme.progressTrackBg }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    backgroundColor: theme.progressFillBg,
                    width: `${
                      items.length > 0
                        ? (revealedIds.size / items.length) * 100
                        : 0
                    }%`,
                  }}
                />
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
                  (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' &&
                  activeItem.imageUrl
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
                    (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' &&
                    activeItem.imageUrl
                      ? 'transparent'
                      : isDropzoneHovered
                      ? theme.zoneHoverBg
                      : theme.zoneBg,
                  borderColor:
                    activeItem &&
                    (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' &&
                    activeItem.imageUrl
                      ? 'transparent'
                      : isDropzoneHovered
                      ? theme.accent
                      : theme.zoneBorder,
                  borderWidth:
                    activeItem &&
                    (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' &&
                    activeItem.imageUrl
                      ? 0
                      : undefined,
                  borderStyle:
                    activeItem &&
                    (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image-only' &&
                    activeItem.imageUrl
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
                  ) : (
                    <div className="w-full text-left space-y-3 animate-fadeIn">
                      <div
                        className="border-b pb-3"
                        style={{ borderColor: theme.zoneBorder }}
                      >
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

                      {/* Conteúdo Revelado (Imagem + Legenda, Texto ou Ambos) */}
                      <div className="space-y-3 pt-1">
                        {((activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'image' ||
                          (activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text')) === 'both') &&
                          activeItem.imageUrl && (
                            <figure
                              className="my-2 p-2 rounded-xl border shadow-xs"
                              style={{
                                backgroundColor: theme.cardBg,
                                borderColor: theme.cardBorder,
                              }}
                            >
                              <img
                                src={activeItem.imageUrl}
                                alt={activeItem.imageCaption || activeItem.title}
                                className="w-full max-h-[360px] object-cover rounded-lg"
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
                      <MoveRight className="w-6 h-6 animate-pulse" />
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
              {settings.showResetBtn && (
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
                    <span>Reiniciar Atividade</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
