import { ActivityItem, ActivitySettings } from '../types';
import { getThemeCss } from './themeConfig';

export function generateEmbeddedHtml(
  settings: ActivitySettings,
  items: ActivityItem[],
  mode: 'standalone' | 'iframe_wrapper' | 'inline_label' = 'standalone'
): string {
  const appId = 'edu-drag-' + Math.random().toString(36).substring(2, 9);

  // Color theme palettes
  const themeStyles = getThemeCss(
    appId,
    settings.theme,
    settings.clickedCardColor,
    settings.clickedCardTextColor
  );

  const itemsJson = JSON.stringify(items);
  const settingsJson = JSON.stringify(settings);

  // Standard inline CSS block scoped to #appId
  const cssStyles = `
/* --- SCOPED CSS FOR MAXIMUM EMBED COMPATIBILITY --- */
${themeStyles}

#${appId} {
  all: initial;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
  box-sizing: border-box !important;
  display: block !important;
  width: 100% !important;
  max-width: 960px !important;
  margin: 0 auto !important;
  padding: 20px !important;
  color: var(--edu-text, #1e293b) !important;
  background-color: var(--edu-bg, #f8fafc) !important;
  border-radius: ${settings.borderRadius}px !important;
  line-height: 1.5 !important;
  text-align: left !important;
  -webkit-font-smoothing: antialiased !important;
  position: relative !important;
  overflow: hidden !important;
}

#${appId} *, #${appId} *::before, #${appId} *::after {
  box-sizing: border-box !important;
}

#${appId} .edu-header {
  margin-bottom: 20px !important;
  text-align: center !important;
}

#${appId} .edu-title {
  font-size: ${settings.fontScale === 'sm' ? '1.25rem' : settings.fontScale === 'lg' ? '1.75rem' : '1.5rem'} !important;
  font-weight: 700 !important;
  margin: 0 0 6px 0 !important;
  color: var(--edu-heading, #0f172a) !important;
}

#${appId} .edu-subtitle {
  font-size: 0.95rem !important;
  color: var(--edu-muted, #64748b) !important;
  margin: 0 !important;
}

${getLayoutCss(appId, settings.layoutMode, items.length)}

#${appId} .edu-card {
  background: var(--edu-card-bg, #ffffff) !important;
  border: 1.5px solid var(--edu-card-border, #e2e8f0) !important;
  border-radius: ${Math.max(6, settings.borderRadius - 4)}px !important;
  padding: 10px 14px !important;
  height: 60px !important;
  min-height: 60px !important;
  max-height: 60px !important;
  box-sizing: border-box !important;
  cursor: grab !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  touch-action: none !important;
  transition: box-shadow 0.15s ease, border-color 0.15s ease, opacity 0.15s ease, background-color 0.15s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04) !important;
  position: relative !important;
}

#${appId} .edu-card:hover {
  border-color: var(--edu-accent, #3b82f6) !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.12) !important;
}

#${appId} .edu-card.is-dragging {
  opacity: 0.6 !important;
  cursor: grabbing !important;
}

#${appId} .edu-card.is-active {
  border-color: var(--edu-card-active-border, #3b82f6) !important;
  background-color: var(--edu-card-active, var(--edu-card-revealed, #e2e8f0)) !important;
  color: var(--edu-card-active-text, #0f172a) !important;
  box-shadow: 0 0 0 2px var(--edu-accent, #3b82f6) !important;
}

#${appId} .edu-card.is-active .edu-card-title {
  color: var(--edu-card-active-text, #0f172a) !important;
}

#${appId} .edu-card.is-active .edu-card-subtitle {
  color: var(--edu-card-active-muted, #475569) !important;
}

#${appId} .edu-card.is-revealed {
  border-color: var(--edu-card-revealed-border, #cbd5e1) !important;
  background-color: var(--edu-card-revealed, #e2e8f0) !important;
  color: var(--edu-card-revealed-text, #0f172a) !important;
}

#${appId} .edu-card.is-revealed .edu-card-title {
  color: var(--edu-card-revealed-text, #0f172a) !important;
}

#${appId} .edu-card.is-revealed .edu-card-subtitle {
  color: var(--edu-card-revealed-muted, #475569) !important;
}

#${appId} .edu-card.has-accent-bg {
  border-color: transparent !important;
}

#${appId} .edu-card.has-accent-bg.is-active {
  box-shadow: 0 0 0 3px var(--edu-accent, #3b82f6), 0 2px 8px rgba(0,0,0,0.12) !important;
}

#${appId} .edu-card.has-accent-bg.is-revealed {
  opacity: 0.95 !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08) !important;
}

#${appId} .edu-card-left {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  min-width: 0 !important;
}

#${appId} .edu-card-dot {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  flex-shrink: 0 !important;
}

#${appId} .edu-card-title {
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  color: inherit;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

#${appId} .edu-card-badge {
  font-size: 0.72rem !important;
  font-weight: 600 !important;
  padding: 2px 8px !important;
  border-radius: 9999px !important;
  background: var(--edu-badge-bg, #e0f2fe) !important;
  color: var(--edu-badge-text, #0369a1) !important;
  flex-shrink: 0 !important;
}

#${appId} .edu-dropzone {
  background: var(--edu-zone-bg, #f1f5f9) !important;
  border: 1.5px solid var(--edu-zone-border, #cbd5e1) !important;
  border-radius: ${settings.borderRadius}px !important;
  padding: 24px !important;
  min-height: 280px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  transition: all 0.2s ease !important;
  position: relative !important;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03) !important;
}

#${appId} .edu-dropzone.is-media-only,
#${appId} .edu-dropzone.is-image-only {
  border: none !important;
  border-width: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: transparent !important;
  box-shadow: none !important;
}

#${appId} .edu-dropzone.is-media-only img,
#${appId} .edu-dropzone.is-image-only img {
  width: 100% !important;
  height: 100% !important;
  min-height: 280px !important;
  max-height: 520px !important;
  object-fit: cover !important;
  border-radius: ${settings.borderRadius}px !important;
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
  display: block !important;
}

#${appId} .edu-dropzone.is-media-only iframe {
  width: 100% !important;
  height: 100% !important;
  min-height: 280px !important;
  aspect-ratio: 16 / 9 !important;
  border-radius: ${settings.borderRadius}px !important;
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
  display: block !important;
}

#${appId} .edu-dropzone.is-hovered {
  border-color: var(--edu-accent, #3b82f6) !important;
  background-color: var(--edu-zone-hover, #eff6ff) !important;
}

#${appId} .edu-dropzone-empty {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 12px !important;
  color: var(--edu-muted, #64748b) !important;
}

#${appId} .edu-drag-icon {
  width: 48px !important;
  height: 48px !important;
  color: var(--edu-accent, #3b82f6) !important;
  opacity: 0.8 !important;
}

#${appId} .edu-inspector-panel {
  width: 100% !important;
  text-align: left !important;
  animation: eduFadeIn 0.25s ease-out !important;
}

#${appId} .edu-inspector-header {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 12px !important;
  padding-bottom: 12px !important;
  border-bottom: 1px solid var(--edu-card-border, #e2e8f0) !important;
  margin-bottom: 16px !important;
}

#${appId} .edu-inspector-title {
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: var(--edu-heading, #0f172a) !important;
  margin: 0 0 4px 0 !important;
}

#${appId} .edu-inspector-sub {
  font-size: 0.9rem !important;
  color: var(--edu-muted, #64748b) !important;
  margin: 0 !important;
}

#${appId} .edu-inspector-body {
  font-size: 0.95rem !important;
  color: var(--edu-text, #334155) !important;
  line-height: 1.6 !important;
  white-space: pre-line !important;
}

#${appId} .edu-inspector-img-wrap {
  margin: 8px 0 16px 0 !important;
  background: var(--edu-card-bg, #ffffff) !important;
  padding: 10px !important;
  border-radius: 12px !important;
  border: 1px solid var(--edu-card-border, #e2e8f0) !important;
  text-align: center !important;
}

#${appId} .edu-inspector-img {
  max-width: 100% !important;
  max-height: 280px !important;
  object-fit: cover !important;
  border-radius: 8px !important;
  display: block !important;
  margin: 0 auto !important;
}

#${appId} .edu-inspector-caption {
  font-size: 0.85rem !important;
  color: var(--edu-muted, #64748b) !important;
  font-style: italic !important;
  margin-top: 8px !important;
}

#${appId} .edu-actions {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-top: 16px !important;
  gap: 12px !important;
}

#${appId} .edu-btn-reset {
  background: transparent !important;
  border: 1px solid var(--edu-card-border, #cbd5e1) !important;
  color: var(--edu-muted, #475569) !important;
  padding: 6px 14px !important;
  border-radius: 6px !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
}

#${appId} .edu-btn-reset:hover {
  background: var(--edu-card-bg, #ffffff) !important;
  color: var(--edu-heading, #0f172a) !important;
  border-color: var(--edu-accent, #3b82f6) !important;
}

#${appId} .edu-audio-btn {
  background: var(--edu-card-bg, #ffffff) !important;
  border: 1px solid var(--edu-card-border, #cbd5e1) !important;
  color: var(--edu-accent, #3b82f6) !important;
  padding: 5px 9px !important;
  border-radius: 6px !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  transition: all 0.15s ease !important;
  flex-shrink: 0 !important;
}

#${appId} .edu-audio-btn:hover {
  background: var(--edu-badge-bg, #e0f2fe) !important;
  border-color: var(--edu-accent, #3b82f6) !important;
}

#${appId} .edu-completion-banner {
  background: #ecfdf5 !important;
  border: 1px solid #a7f3d0 !important;
  color: #065f46 !important;
  padding: 12px 16px !important;
  border-radius: 8px !important;
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  text-align: center !important;
  margin-top: 16px !important;
  animation: eduBounceIn 0.4s ease-out !important;
}

@keyframes eduFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes eduBounceIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
${settings.customCss || ''}
`;

  // Dynamic JS logic with Pointer Events and AudioContext synth
  const jsScript = `
(function() {
  var appId = "${appId}";
  var items = ${itemsJson};
  var settings = ${settingsJson};
  var revealedIds = new Set();
  var activeItemId = null;
  var currentAudio = null;
  var container = document.getElementById(appId);
  if (!container) return;

  function formatEmbedVideoUrl(rawUrl) {
    if (!rawUrl) return '';
    var trimmed = rawUrl.trim();
    var iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (iframeMatch && iframeMatch[1]) {
      return formatEmbedVideoUrl(iframeMatch[1]);
    }
    var ytMatch = trimmed.match(/(?:youtube\\.com\\/(?:watch\\?v=|shorts\\/|embed\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return 'https://www.youtube.com/embed/' + ytMatch[1];
    }
    var vimeoMatch = trimmed.match(/vimeo\\.com\\/(?:video\\/)?([0-9]+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return 'https://player.vimeo.com/video/' + vimeoMatch[1];
    }
    return trimmed;
  }

  var isNarrating = false;
  var isEnglish = (settings.narrationLanguage === 'en-US');
  var listenText = isEnglish ? 'Listen' : 'Ouvir';
  var stopText = isEnglish ? 'Stop' : 'Parar';

  function stopNarration() {
    isNarrating = false;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    updateAudioBtnUi();
  }

  function updateAudioBtnUi() {
    var btn = container.querySelector('.edu-audio-btn');
    if (!btn) return;
    if (isNarrating) {
      btn.innerHTML = '<svg style="width:12px;height:12px;" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg><span>' + escapeHtml(stopText) + '</span>';
      btn.setAttribute('title', stopText);
      btn.style.borderColor = 'var(--edu-accent, #3b82f6)';
      btn.style.backgroundColor = 'var(--edu-badge-bg, #e0f2fe)';
    } else {
      btn.innerHTML = '<svg style="width:12px;height:12px;" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>' + escapeHtml(listenText) + '</span>';
      btn.setAttribute('title', listenText);
      btn.style.borderColor = 'var(--edu-card-border, #cbd5e1)';
      btn.style.backgroundColor = 'var(--edu-card-bg, #ffffff)';
    }
  }

  function playNarration(item) {
    stopNarration();
    if (!item) return;

    isNarrating = true;
    updateAudioBtnUi();

    if (item.audioUrl && item.audioUrl.trim()) {
      try {
        currentAudio = new Audio(item.audioUrl.trim());
        currentAudio.onended = function() {
          isNarrating = false;
          updateAudioBtnUi();
        };
        currentAudio.onerror = function() {
          isNarrating = false;
          updateAudioBtnUi();
        };
        currentAudio.play().catch(function(err) {
          console.warn('Audio play failed:', err);
          isNarrating = false;
          updateAudioBtnUi();
        });
      } catch(err) {
        console.warn(err);
        isNarrating = false;
        updateAudioBtnUi();
      }
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      var textToSpeak = item.title + '. ' + (item.subtitle ? item.subtitle + '. ' : '') + (item.details || item.imageCaption || '');
      if (textToSpeak.trim()) {
        var utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = settings.narrationLanguage || 'pt-BR';
        utterance.rate = 1.0;
        utterance.onend = function() {
          isNarrating = false;
          updateAudioBtnUi();
        };
        utterance.onerror = function() {
          isNarrating = false;
          updateAudioBtnUi();
        };
        window.speechSynthesis.speak(utterance);
      } else {
        isNarrating = false;
        updateAudioBtnUi();
      }
    }
  }

  // Sound Synth via Web Audio API (Zero external MP3 dependencies)
  function playSynthSound(type) {
    if (!settings.enableSound) return;
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'drop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'complete') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch(e){}
  }

  function getHexLuminance(hexColor) {
    if (!hexColor) return 0.2;
    var clean = String(hexColor).trim();
    if (clean.charAt(0) !== '#') return 0.2;
    clean = clean.substring(1);
    if (clean.length === 3) clean = clean[0]+clean[0]+clean[1]+clean[1]+clean[2]+clean[2];
    if (clean.length !== 6) return 0.2;
    var r = parseInt(clean.substring(0, 2), 16) || 0;
    var g = parseInt(clean.substring(2, 4), 16) || 0;
    var b = parseInt(clean.substring(4, 6), 16) || 0;
    var sR = r / 255, sG = g / 255, sB = b / 255;
    var R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
    var G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
    var B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  function getUniformCardsTextColor(itemList, fallbackAccent) {
    if (!itemList || itemList.length === 0) return '#ffffff';
    var darkTextCount = 0;
    var lightTextCount = 0;
    var totalLum = 0;
    itemList.forEach(function(it) {
      var col = it.color || fallbackAccent || '#3b82f6';
      var lum = getHexLuminance(col);
      totalLum += lum;
      if (lum > 0.42) {
        darkTextCount++;
      } else {
        lightTextCount++;
      }
    });
    var avgLum = totalLum / itemList.length;
    if (darkTextCount > lightTextCount && avgLum > 0.48) {
      return '#0f172a';
    }
    return '#ffffff';
  }

  function adjustBrightness(hexColor, percent) {
    if (!hexColor) return '#3b82f6';
    var clean = String(hexColor).trim().replace('#', '');
    if (clean.length === 3) clean = clean[0]+clean[0]+clean[1]+clean[1]+clean[2]+clean[2];
    if (clean.length !== 6) return hexColor;
    var r = parseInt(clean.substring(0, 2), 16) || 0;
    var g = parseInt(clean.substring(2, 4), 16) || 0;
    var b = parseInt(clean.substring(4, 6), 16) || 0;

    if (percent > 0) {
      r = Math.round(r + (255 - r) * (percent / 100));
      g = Math.round(g + (255 - g) * (percent / 100));
      b = Math.round(b + (255 - b) * (percent / 100));
    } else if (percent < 0) {
      var factor = (100 + percent) / 100;
      r = Math.round(r * factor);
      g = Math.round(g * factor);
      b = Math.round(b * factor);
    }
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    var toHex = function(n) { var s = n.toString(16); return s.length === 1 ? '0' + s : s; };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  function getAccentTone(baseColor, state) {
    var color = baseColor || '#3b82f6';
    var lum = getHexLuminance(color);
    var isVeryDark = lum < 0.12;

    if (state === 'initial') {
      return color;
    } else if (state === 'active') {
      return adjustBrightness(color, isVeryDark ? 20 : -10);
    } else {
      return adjustBrightness(color, isVeryDark ? 28 : -26);
    }
  }

  // Render elements
  function render() {
    var poolEl = container.querySelector('.edu-items-list');
    var dropzoneEl = container.querySelector('.edu-dropzone');
    var completionWrap = container.querySelector('.edu-completion-wrap');

    if (!poolEl || !dropzoneEl) return;

    var showDot = settings.showAccentCircle === true;
    var useAccentBg = settings.useAccentAsBackground === true;
    var uniformCardTextColor = getUniformCardsTextColor(items, '#3b82f6');
    var customClickedBg = settings.clickedCardColor || '#e2e8f0';
    var customClickedContrast = settings.clickedCardTextColor || (getHexLuminance(customClickedBg) > 0.42 ? '#0f172a' : '#ffffff');
    var isDarkClicked = customClickedContrast === '#ffffff';

    // Render cards pool
    poolEl.innerHTML = '';
    items.forEach(function(item) {
      var isItemRevealed = revealedIds.has(item.id);
      var isItemActive = activeItemId === item.id;
      var cardState = isItemActive ? 'active' : (isItemRevealed ? 'revealed' : 'initial');

      var card = document.createElement('div');
      card.className = 'edu-card' + 
        (isItemRevealed ? ' is-revealed' : '') + 
        (isItemActive ? ' is-active' : '');
      card.setAttribute('data-id', item.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Card: ' + item.title + '. Arraste ou clique para ver informações.');

      var baseItemColor = item.color || '#3b82f6';
      var effectiveItemColor = useAccentBg ? getAccentTone(baseItemColor, cardState) : baseItemColor;
      var contrastColor = useAccentBg ? uniformCardTextColor : null;

      if (useAccentBg) {
        card.classList.add('has-accent-bg');
        card.style.setProperty('background-color', effectiveItemColor, 'important');
        card.style.setProperty('border-color', adjustBrightness(effectiveItemColor, -10), 'important');
        card.style.setProperty('color', contrastColor, 'important');
      } else if (isItemActive || isItemRevealed) {
        card.style.setProperty('background-color', customClickedBg, 'important');
        card.style.setProperty('border-color', isItemActive ? 'var(--edu-accent, #3b82f6)' : adjustBrightness(customClickedBg, -18), 'important');
      }

      var dotHtml = showDot ? 
        '<div class="edu-card-dot" style="background-color:' + (useAccentBg ? (contrastColor === '#ffffff' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.65)') : baseItemColor) + ' !important"></div>' 
        : '';

      var badgeBgStyle = useAccentBg
        ? (contrastColor === '#ffffff' ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.1)')
        : ((isItemActive || isItemRevealed) ? (isDarkClicked ? 'rgba(255,255,255,0.25)' : 'var(--edu-badge-bg, #e0f2fe)') : 'var(--edu-badge-bg, #e0f2fe)');
      var badgeTextStyle = useAccentBg
        ? contrastColor
        : ((isItemActive || isItemRevealed) ? (isDarkClicked ? '#ffffff' : 'var(--edu-badge-text, #0369a1)') : 'var(--edu-badge-text, #0369a1)');

      var badgeStyle = ' style="background-color:' + badgeBgStyle + ' !important; color:' + badgeTextStyle + ' !important;"';

      var subtitleColor = useAccentBg
        ? (contrastColor === '#ffffff' ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.75)')
        : ((isItemActive || isItemRevealed) ? (isDarkClicked ? 'rgba(255,255,255,0.85)' : 'var(--edu-card-revealed-muted, #475569)') : 'var(--edu-muted, #64748b)');

      var titleColor = useAccentBg
        ? contrastColor
        : ((isItemActive || isItemRevealed) ? customClickedContrast : 'var(--edu-heading, #0f172a)');

      var subtitleHtml = item.subtitle ? 
        '<div class="edu-card-subtitle" style="font-size:0.75rem; color:' + subtitleColor + ' !important;">' + escapeHtml(item.subtitle) + '</div>' : '';

      card.innerHTML = 
        '<div class="edu-card-left">' +
          dotHtml +
          '<div class="edu-card-text">' +
            '<div class="edu-card-title" style="color:' + titleColor + ' !important;">' + escapeHtml(item.title) + '</div>' +
            subtitleHtml +
          '</div>' +
        '</div>' +
        (item.badge ? '<span class="edu-card-badge"' + badgeStyle + '>' + escapeHtml(item.badge) + '</span>' : '');

      // Bind click and keyboard selection (always enabled for both mobile touch and desktop click)
      card.addEventListener('click', function() {
        selectItem(item.id);
      });
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectItem(item.id);
        }
      });

      // Bind Drag & Pointer Events
      setupCardPointerEvents(card, item.id);

      poolEl.appendChild(card);
    });

    // Render Inspector / Dropzone
    var activeItem = items.find(function(i) { return i.id === activeItemId; });
    if (activeItem) {
      var cType = activeItem.contentType || (activeItem.imageUrl ? 'image' : 'text');

      if (cType === 'image-only') {
        if (activeItem.imageUrl) {
          dropzoneEl.classList.add('is-image-only');
          dropzoneEl.classList.add('is-media-only');
          dropzoneEl.innerHTML = 
            '<img src="' + escapeHtml(activeItem.imageUrl) + '" alt="' + escapeHtml(activeItem.title) + '" />';
        } else {
          dropzoneEl.classList.remove('is-image-only');
          dropzoneEl.classList.remove('is-media-only');
          dropzoneEl.innerHTML = 
            '<div class="edu-inspector-panel" style="text-align:center; padding:20px; color:var(--edu-muted); font-size:0.85rem;">' +
              'Insira a URL da imagem no editor deste item.' +
            '</div>';
        }
      } else if (cType === 'video-only') {
        if (activeItem.videoUrl) {
          dropzoneEl.classList.add('is-media-only');
          dropzoneEl.classList.remove('is-image-only');
          var embedSrc = formatEmbedVideoUrl(activeItem.videoUrl);
          dropzoneEl.innerHTML = 
            '<iframe src="' + escapeHtml(embedSrc) + '" title="' + escapeHtml(activeItem.title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
        } else {
          dropzoneEl.classList.remove('is-image-only');
          dropzoneEl.classList.remove('is-media-only');
          dropzoneEl.innerHTML = 
            '<div class="edu-inspector-panel" style="text-align:center; padding:20px; color:var(--edu-muted); font-size:0.85rem;">' +
              'Insira a URL do vídeo ou código iframe no editor deste item.' +
            '</div>';
        }
      } else {
        dropzoneEl.classList.remove('is-image-only');
        dropzoneEl.classList.remove('is-media-only');
        var bodyHtml = '';

        if ((cType === 'image' || cType === 'both') && activeItem.imageUrl) {
          bodyHtml += '<div class="edu-inspector-img-wrap" style="background:transparent !important; border:none !important; padding:0 !important; margin:0 0 16px 0 !important;">' +
            '<img src="' + escapeHtml(activeItem.imageUrl) + '" alt="' + escapeHtml(activeItem.imageCaption || activeItem.title) + '" class="edu-inspector-img" style="border-radius:12px !important; width:100% !important; max-height:380px !important; object-fit:cover !important;" />' +
            (activeItem.imageCaption ? '<div class="edu-inspector-caption">' + escapeHtml(activeItem.imageCaption) + '</div>' : '') +
          '</div>';
        }

        if ((cType === 'text' || cType === 'both') && activeItem.details) {
          bodyHtml += '<div class="edu-inspector-body">' + escapeHtml(activeItem.details) + '</div>';
        }

        var audioBtnHtml = ((settings.enableNarration && activeItem.showNarrationButton !== false) || activeItem.audioUrl) ?
          '<button type="button" class="edu-audio-btn" aria-label="' + (isNarrating ? escapeHtml(stopText) : escapeHtml(listenText)) + '" title="' + (isNarrating ? escapeHtml(stopText) : escapeHtml(listenText)) + '">' +
            (isNarrating ?
              '<svg style="width:12px;height:12px;" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg><span>' + escapeHtml(stopText) + '</span>' :
              '<svg style="width:12px;height:12px;" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>' + escapeHtml(listenText) + '</span>'
            ) +
          '</button>' : '';

        dropzoneEl.innerHTML = 
          '<div class="edu-inspector-panel">' +
            '<div class="edu-inspector-header">' +
              '<div>' +
                '<h3 class="edu-inspector-title">' + escapeHtml(activeItem.title) + '</h3>' +
                (activeItem.subtitle ? '<p class="edu-inspector-sub">' + escapeHtml(activeItem.subtitle) + '</p>' : '') +
              '</div>' +
              '<div style="display:flex; align-items:center; gap:8px;">' +
                audioBtnHtml +
                (activeItem.badge ? '<span class="edu-card-badge" style="font-size:0.8rem; padding:4px 10px;">' + escapeHtml(activeItem.badge) + '</span>' : '') +
              '</div>' +
            '</div>' +
            bodyHtml +
          '</div>';

        var audioBtn = dropzoneEl.querySelector('.edu-audio-btn');
        if (audioBtn) {
          audioBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isNarrating) {
              stopNarration();
            } else {
              playNarration(activeItem);
            }
          });
        }
      }
    } else {
      dropzoneEl.classList.remove('is-image-only');
      var categoryTitleHtml = (settings.categoryTitle && settings.categoryTitle.trim()) ?
        '<div style="font-weight: 600; font-size: 1rem; color: var(--edu-heading);">' + escapeHtml(settings.categoryTitle) + '</div>' : '';
      dropzoneEl.innerHTML = 
        '<div class="edu-dropzone-empty">' +
          '<svg class="edu-drag-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>' +
          '</svg>' +
          categoryTitleHtml +
          '<div style="font-size: 0.85rem;">Clique em um item da lista para revelar suas informações completas.</div>' +
        '</div>';
    }

    // Show completion banner
    if (completionWrap) {
      if (revealedIds.size === items.length && items.length > 0 && settings.completionMessage && settings.completionMessage.trim()) {
        completionWrap.innerHTML = 
          '<div class="edu-completion-banner">' + escapeHtml(settings.completionMessage) + '</div>';
      } else {
        completionWrap.innerHTML = '';
      }
    }

    // Send height message for iframe autoresize
    notifyParentIframeHeight();
  }

  function selectItem(itemId) {
    var isNew = !revealedIds.has(itemId);
    activeItemId = itemId;
    revealedIds.add(itemId);
    playSynthSound('drop');
    if (revealedIds.size === items.length && isNew) {
      setTimeout(function() { playSynthSound('complete'); }, 200);
    }
    var foundItem = items.find(function(it) { return it.id === itemId; });
    if (foundItem && settings.enableNarration && settings.narrationTrigger !== 'manual') {
      playNarration(foundItem);
    } else {
      stopNarration();
    }
    render();
  }

  // Pointer Events Unified Drag Engine
  var dragGhost = null;
  var currentPointerId = null;

  function setupCardPointerEvents(card, itemId) {
    card.addEventListener('pointerdown', function(e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      currentPointerId = e.pointerId;
      card.classList.add('is-dragging');
      
      var dropzone = container.querySelector('.edu-dropzone');

      function onPointerMove(me) {
        if (!dropzone) return;
        var rect = dropzone.getBoundingClientRect();
        if (me.clientX >= rect.left && me.clientX <= rect.right &&
            me.clientY >= rect.top && me.clientY <= rect.bottom) {
          dropzone.classList.add('is-hovered');
        } else {
          dropzone.classList.remove('is-hovered');
        }
      }

      function onPointerUp(ue) {
        card.classList.remove('is-dragging');
        if (dropzone) dropzone.classList.remove('is-hovered');
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        if (dropzone) {
          var rect = dropzone.getBoundingClientRect();
          if (ue.clientX >= rect.left && ue.clientX <= rect.right &&
              ue.clientY >= rect.top && ue.clientY <= rect.bottom) {
            selectItem(itemId);
          }
        }
      }

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Auto Iframe Height PostMessage
  function notifyParentIframeHeight() {
    try {
      if (window.parent && window.parent !== window) {
        var h = container.scrollHeight + 32;
        window.parent.postMessage({ type: 'edu-iframe-resize', height: h, id: appId }, '*');
      }
    } catch(e){}
  }

  // Reset handler
  var resetBtn = container.querySelector('.edu-btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      stopNarration();
      revealedIds.clear();
      activeItemId = null;
      render();
    });
  }

  // Initial render
  render();

  // ResizeObserver for auto-embed responsiveness
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(function() {
      notifyParentIframeHeight();
    }).observe(container);
  }
})();
`;

  const hasTitle = Boolean(settings.title && settings.title.trim());
  const hasSubtitle = Boolean(settings.subtitle && settings.subtitle.trim());
  const isEnglishNarration = Boolean(settings.enableNarration && settings.narrationLanguage === 'en-US');
  const resetBtnText = isEnglishNarration ? 'Restart Activity' : 'Reiniciar Atividade';

  // HTML Markup Structure
  const htmlBody = `
<div id="${appId}" class="edu-drag-activity">
  ${(hasTitle || hasSubtitle) ? `
  <div class="edu-header">
    ${hasTitle ? `<h2 class="edu-title">${escapeHtml(settings.title)}</h2>` : ''}
    ${hasSubtitle ? `<p class="edu-subtitle">${escapeHtml(settings.subtitle)}</p>` : ''}
  </div>` : ''}

  <div class="edu-grid">
    <div class="edu-pool-container">
      <div class="edu-items-list"></div>
    </div>

    <div>
      <div class="edu-dropzone"></div>
      <div class="edu-completion-wrap"></div>
      ${
        settings.showResetBtn
          ? `<div class="edu-actions"><button class="edu-btn-reset" type="button">🔄 ${escapeHtml(resetBtnText)}</button></div>`
          : ''
      }
    </div>
  </div>
</div>
`;

  if (mode === 'iframe_wrapper') {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(settings.title)}</title>
  <style>
    body { margin: 0; padding: 10px; background: transparent; font-family: system-ui, sans-serif; }
    ${cssStyles}
  </style>
</head>
<body>
  ${htmlBody}
  <script>
    ${jsScript}
  </script>
</body>
</html>`;
  }

  // Standalone/Inline Embed Output
  return `<style>\n${cssStyles}\n</style>\n${htmlBody}\n<script>\n${jsScript}\n</script>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getLayoutCss(appId: string, layoutMode: string, itemsCount: number = 4): string {
  const commonHeader = `
#${appId} .edu-pool-container {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  height: 100% !important;
}

#${appId} .edu-pool-header {
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  color: var(--edu-muted, #64748b) !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
`;

  if (layoutMode === 'cards') {
    let gridCols = 'repeat(auto-fit, minmax(200px, 1fr))';
    if (itemsCount === 1) gridCols = '1fr';
    else if (itemsCount === 2) gridCols = 'repeat(2, 1fr)';
    else if (itemsCount === 3) gridCols = 'repeat(3, 1fr)';
    else if (itemsCount === 4) gridCols = 'repeat(4, 1fr)';
    else if (itemsCount === 5) gridCols = 'repeat(5, 1fr)';
    else if (itemsCount === 6) gridCols = 'repeat(3, 1fr)';
    else if (itemsCount === 7) gridCols = 'repeat(4, 1fr)';
    else if (itemsCount === 8) gridCols = 'repeat(4, 1fr)';
    else if (itemsCount === 9) gridCols = 'repeat(3, 1fr)';

    return `${commonHeader}
#${appId} .edu-grid {
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
}

#${appId} .edu-items-list {
  display: grid !important;
  grid-template-columns: ${gridCols} !important;
  gap: 12px !important;
  width: 100% !important;
  align-items: stretch !important;
}

#${appId} .edu-card {
  height: 100% !important;
  min-height: 56px !important;
  box-sizing: border-box !important;
}

@media (max-width: 900px) {
  #${appId} .edu-items-list {
    grid-template-columns: ${
      itemsCount === 1
        ? '1fr'
        : itemsCount === 2
        ? 'repeat(2, 1fr)'
        : itemsCount === 3
        ? 'repeat(3, 1fr)'
        : itemsCount % 2 === 0
        ? 'repeat(2, 1fr)'
        : 'repeat(auto-fit, minmax(160px, 1fr))'
    } !important;
  }
}

@media (max-width: 520px) {
  #${appId} .edu-items-list {
    grid-template-columns: ${itemsCount <= 2 ? `repeat(${itemsCount}, 1fr)` : '1fr'} !important;
  }
}
`;
  }

  // Inspector layout (default)
  return `${commonHeader}
#${appId} .edu-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 20px !important;
  align-items: stretch !important;
}

@media (min-width: 768px) {
  #${appId} .edu-grid {
    grid-template-columns: 320px 1fr !important;
  }
}

#${appId} .edu-items-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
  width: 100% !important;
}

#${appId} .edu-card {
  height: 60px !important;
  min-height: 60px !important;
  max-height: 60px !important;
  box-sizing: border-box !important;
}
`;
}
