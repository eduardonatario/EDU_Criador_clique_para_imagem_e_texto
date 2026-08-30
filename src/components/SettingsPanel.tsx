import React, { useState } from 'react';
import { ActivitySettings, LayoutMode } from '../types';
import {
  Volume2,
  VolumeX,
  Type,
  Layout,
  Sliders,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Columns,
  LayoutGrid,
  Circle,
  Paintbrush,
  CheckCheck,
  Eye,
  SunMedium,
  Moon,
  Languages,
  Headphones,
  Play,
  Square,
  Music,
  RefreshCw
} from 'lucide-react';
import { getHexLuminance, getContrastTextColor } from '../utils/themeConfig';

interface SettingsPanelProps {
  settings: ActivitySettings;
  onUpdateSettings: (settings: ActivitySettings) => void;
}

const CLICKED_COLOR_PRESETS = [
  { name: 'Cinza texto escuro', value: '#e2e8f0', border: '#cbd5e1' },
  { name: 'Azul claro texto escuro', value: '#eff6ff', border: '#93c5fd' },
  { name: 'Ambar suave texto escuro', value: '#fffbeb', border: '#fde68a' },
];

const LAYOUTS: {
  id: LayoutMode;
  name: string;
  badge: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  {
    id: 'inspector',
    name: 'Painel Lado a Lado',
    badge: 'Desktop / Tablet',
    description: 'Lista de cards na esquerda e painel de revelação na direita.',
    icon: Columns,
  },
  {
    id: 'cards',
    name: 'Grade de Cards',
    badge: 'Visão Geral',
    description: 'Cards organizados em grade responsiva com área de revelação abaixo.',
    icon: LayoutGrid,
  },
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const handleChange = (fields: Partial<ActivitySettings>) => {
    onUpdateSettings({ ...settings, ...fields });
  };

  const handleTestVoice = (lang: 'pt-BR' | 'en-US') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Síntese de voz não suportada neste navegador.');
      return;
    }
    window.speechSynthesis.cancel();
    if (isTestingVoice) {
      setIsTestingVoice(false);
      return;
    }

    const testText =
      lang === 'en-US'
        ? 'Hello! When you click a card, the system will read the title and details in English.'
        : 'Olá! Ao clicar em um card, o sistema lerá o título e as informações em português.';

    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.onend = () => setIsTestingVoice(false);
    utterance.onerror = () => setIsTestingVoice(false);

    setIsTestingVoice(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-5 text-xs">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span>Aparência e Configurações</span>
        </h2>
        <p className="text-xs text-slate-500">
          Personalize o tema visual, títulos e comportamento de embed
        </p>
      </div>

      {/* Title & Prompt Inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Título Principal da Atividade
          </label>
          <input
            type="text"
            value={settings.title}
            onChange={(e) => handleChange({ title: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
            placeholder="Ex: Sistemas do Corpo Humano"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Instrução para o Estudo / Subtítulo
          </label>
          <input
            type="text"
            value={settings.subtitle}
            onChange={(e) => handleChange({ subtitle: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            placeholder="Ex: Arraste os conceitos para o painel central..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Título da Zona de Revelação (Dropzone)
          </label>
          <input
            type="text"
            value={settings.categoryTitle}
            onChange={(e) => handleChange({ categoryTitle: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            placeholder="Ex: Solte ou clique em um card aqui"
          />
        </div>
      </div>

      {/* Layout Mode Selection */}
      <div className="border-t border-slate-100 pt-3">
        <label className="block text-[11px] font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5 text-blue-600" />
          <span>Modelo de Layout de Design</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LAYOUTS.map((layout) => {
            const isSelected = settings.layoutMode === layout.id;
            const IconComp = layout.icon;

            return (
              <button
                key={layout.id}
                type="button"
                onClick={() => handleChange({ layoutMode: layout.id })}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-[11px] ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                        {layout.name}
                      </h4>
                      <span className="inline-block text-[9px] font-semibold text-slate-400">
                        {layout.badge}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 leading-snug">
                  {layout.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cor do Card ao Clicar / Revelado */}
      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Cor do Card ao Clicar / Revelar</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-600 font-medium px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
              Fundo: {settings.clickedCardColor || '#e2e8f0'}
            </span>
            <span className="text-[10px] font-mono text-slate-600 font-medium px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
              Texto: {settings.clickedCardTextColor || (getHexLuminance(settings.clickedCardColor || '#e2e8f0') > 0.42 ? '#0f172a' : '#ffffff')}
            </span>
          </div>
        </div>

        {/* Chips de cores pré-definidas com amostra de texto e contraste */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mb-2.5">
          {CLICKED_COLOR_PRESETS.map((preset) => {
            const currentVal = (settings.clickedCardColor || '#e2e8f0').toLowerCase();
            const isSelected = currentVal === preset.value.toLowerCase();
            const presetLum = getHexLuminance(preset.value);
            const presetTextColor = presetLum > 0.42 ? '#0f172a' : '#ffffff';
            const isDark = presetLum <= 0.42;

            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => {
                  handleChange({
                    clickedCardColor: preset.value,
                    // Automatically assign high contrast text color for the preset
                    clickedCardTextColor: presetTextColor,
                  });
                }}
                className={`p-2 rounded-lg border text-left transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 font-semibold'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Mini card sample showing real background + text contrast */}
                <div
                  className="w-7 h-5 rounded flex items-center justify-center text-[9px] font-bold shadow-2xs flex-shrink-0 border"
                  style={{
                    backgroundColor: preset.value,
                    borderColor: preset.border,
                    color: presetTextColor,
                  }}
                >
                  Aa
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-slate-700 block truncate">
                    {preset.name}
                  </span>
                  <span className="text-[9px] text-slate-400 block">
                    {isDark ? 'Texto branco' : 'Texto escuro'}
                  </span>
                </div>
                {isSelected && (
                  <CheckCheck className="w-3.5 h-3.5 text-blue-600 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Seletor Customizado de Fundo e Texto */}
        <div className="space-y-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/60">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <input
                type="color"
                value={
                  settings.clickedCardColor && /^#([0-9A-Fa-f]{6})$/.test(settings.clickedCardColor)
                    ? settings.clickedCardColor
                    : '#e2e8f0'
                }
                onChange={(e) => {
                  const newBg = e.target.value;
                  const autoText = getHexLuminance(newBg) > 0.42 ? '#0f172a' : '#ffffff';
                  handleChange({
                    clickedCardColor: newBg,
                    clickedCardTextColor: autoText,
                  });
                }}
                className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white flex-shrink-0 shadow-2xs"
                title="Seletor de cor visual"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Cor de Fundo Personalizada
                </span>
                <span className="text-[9px] text-slate-400 block truncate">
                  {getHexLuminance(settings.clickedCardColor || '#e2e8f0') > 0.42
                    ? 'Fundo claro (texto escuro)'
                    : 'Fundo escuro (texto branco)'}
                </span>
              </div>
            </div>

            {/* Campo de Texto HEX Editável */}
            <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1 shadow-2xs">
              <span className="text-[10px] text-slate-400 font-mono font-bold">#</span>
              <input
                type="text"
                value={(settings.clickedCardColor || '#e2e8f0').replace('#', '')}
                onChange={(e) => {
                  const raw = e.target.value.trim().replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
                  const formattedHex = raw ? `#${raw}` : '';
                  if (raw.length === 6 || raw.length === 3) {
                    const autoText = getHexLuminance(formattedHex) > 0.42 ? '#0f172a' : '#ffffff';
                    handleChange({
                      clickedCardColor: formattedHex,
                      clickedCardTextColor: autoText,
                    });
                  } else {
                    handleChange({
                      clickedCardColor: formattedHex || '#e2e8f0',
                    });
                  }
                }}
                maxLength={6}
                placeholder="E2E8F0"
                className="w-16 text-[11px] font-mono text-slate-700 font-bold focus:outline-none uppercase bg-transparent"
                title="Digite o código HEX da cor"
              />
            </div>
          </div>

          {/* Opções de Cor do Texto para o Card Clicado */}
          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-slate-700 flex items-center gap-1">
              <Type className="w-3 h-3 text-slate-500" />
              <span>Cor do Texto no Card Clicado:</span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const autoColor = getHexLuminance(settings.clickedCardColor || '#e2e8f0') > 0.42 ? '#0f172a' : '#ffffff';
                  handleChange({ clickedCardTextColor: autoColor });
                }}
                className={`px-2 py-1 text-[10px] rounded border font-medium transition cursor-pointer ${
                  !settings.clickedCardTextColor ||
                  settings.clickedCardTextColor === (getHexLuminance(settings.clickedCardColor || '#e2e8f0') > 0.42 ? '#0f172a' : '#ffffff')
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
                title="Calcula automaticamente o melhor contraste"
              >
                Auto Contraste
              </button>

              <button
                type="button"
                onClick={() => handleChange({ clickedCardTextColor: '#ffffff' })}
                className={`px-2 py-1 text-[10px] rounded border font-medium transition flex items-center gap-1 cursor-pointer ${
                  settings.clickedCardTextColor === '#ffffff'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Moon className="w-2.5 h-2.5" />
                <span>Branco</span>
              </button>

              <button
                type="button"
                onClick={() => handleChange({ clickedCardTextColor: '#0f172a' })}
                className={`px-2 py-1 text-[10px] rounded border font-medium transition flex items-center gap-1 cursor-pointer ${
                  settings.clickedCardTextColor === '#0f172a'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <SunMedium className="w-2.5 h-2.5" />
                <span>Escuro</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Toggles */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50/60 cursor-pointer">
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-blue-600" />
            <div>
              <p className="font-semibold text-slate-800">Exibir bullet point com cor de destaque</p>
              <p className="text-[10px] text-slate-500">
                Mostra o bullet point colorido indicador ao lado do título de cada card
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={Boolean(settings.showAccentCircle)}
            onChange={(e) =>
              handleChange({ showAccentCircle: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50/60 cursor-pointer">
          <div className="flex items-center gap-2">
            <Paintbrush className="w-4 h-4 text-blue-600" />
            <div>
              <p className="font-semibold text-slate-800">Cor de Destaque como Fundo do Card</p>
              <p className="text-[10px] text-slate-500">
                Aplica a cor de destaque como preenchimento do card com tons sutilmente diferenciados antes e depois de clicar
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.useAccentAsBackground === true}
            onChange={(e) =>
              handleChange({ useAccentAsBackground: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50/60 cursor-pointer">
          <div className="flex items-center gap-2">
            {settings.enableSound ? (
              <Volume2 className="w-4 h-4 text-blue-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
            <div>
              <p className="font-semibold text-slate-800">Efeitos de Áudio Sintetizados na interface</p>
              <p className="text-[10px] text-slate-500">
                Sons suaves de clique ao interagir com os cards via Web Audio API nativa
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.enableSound}
            onChange={(e) => handleChange({ enableSound: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50/60 cursor-pointer">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <div>
              <p className="font-semibold text-slate-800">
                Exibir Botão '{Boolean(settings.enableNarration && settings.narrationLanguage === 'en-US') ? 'Restart Activity' : 'Reiniciar Atividade'}'
              </p>
              <p className="text-[10px] text-slate-500">
                Permite ao estudante limpar as seleções e recomeçar a exploração
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.showResetBtn !== false}
            onChange={(e) => handleChange({ showResetBtn: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
        </label>

        {/* Leitura em Voz Alta e Áudio MP3 */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/40">
          <label className="flex items-center justify-between p-2.5 hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-2">
              <Headphones className={`w-4 h-4 ${settings.enableNarration ? 'text-blue-600' : 'text-slate-400'}`} />
              <div>
                <p className="font-semibold text-slate-800">Leitura em Voz Alta ao Clicar no Card</p>
                <p className="text-[10px] text-slate-500">
                  Lê o título e o conteúdo em voz alta ou reproduz áudio MP3 ao selecionar o card
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={Boolean(settings.enableNarration)}
              onChange={(e) => {
                const checked = e.target.checked;
                handleChange({
                  enableNarration: checked,
                  narrationTrigger: settings.narrationTrigger || 'manual',
                });
              }}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
          </label>

          {settings.enableNarration && (
            <div className="p-3 border-t border-slate-200/80 bg-white space-y-3">
              {/* Idioma da Síntese de Voz */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-blue-600" />
                  <span>Idioma da Síntese de Voz (Leitor)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleChange({
                        narrationLanguage: 'pt-BR',
                        narrationTrigger: settings.narrationTrigger || 'manual',
                      })
                    }
                    className={`py-2 px-3 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${
                      (settings.narrationLanguage || 'pt-BR') === 'pt-BR'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🇧🇷</span>
                      <span className="text-xs">Português (BR)</span>
                    </div>
                    {(settings.narrationLanguage || 'pt-BR') === 'pt-BR' && (
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleChange({
                        narrationLanguage: 'en-US',
                        narrationTrigger: settings.narrationTrigger || 'manual',
                      })
                    }
                    className={`py-2 px-3 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${
                      settings.narrationLanguage === 'en-US'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🇺🇸</span>
                      <span className="text-xs">English (US)</span>
                    </div>
                    {settings.narrationLanguage === 'en-US' && (
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Modo de Acionamento da Leitura */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Modo de Acionamento da Leitura</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange({ narrationTrigger: 'auto' })}
                    className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                      settings.narrationTrigger === 'auto'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Leitura Automática</span>
                      </div>
                      {settings.narrationTrigger === 'auto' && (
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Lê ou reproduz áudio automaticamente assim que o estudante clica no card.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange({ narrationTrigger: 'manual' })}
                    className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                      (settings.narrationTrigger || 'manual') === 'manual'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Play className="w-3.5 h-3.5 text-blue-600" />
                        <span>Botão '{settings.narrationLanguage === 'en-US' ? 'Listen' : 'Ouvir'}'</span>
                      </div>
                      {(settings.narrationTrigger || 'manual') === 'manual' && (
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Revela o conteúdo em silêncio e insere um botão de play para ouvir sob demanda.
                    </p>
                  </button>
                </div>
              </div>

              {/* Botão de Teste da Voz */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => handleTestVoice(settings.narrationLanguage || 'pt-BR')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    isTestingVoice
                      ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {isTestingVoice ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                      <span>Parar Demonstração</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-blue-600" />
                      <span>Testar Voz do Navegador</span>
                    </>
                  )}
                </button>

                <span className="text-[10px] text-slate-400">
                  Usa Web SpeechSynthesis
                </span>
              </div>

              {/* Informação sobre MP3 */}
              <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 flex items-start gap-2">
                <Music className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Suporte a Áudio em MP3 por Card:</span>
                  <span>
                    Na aba <strong>"1. Cards e Conteúdo"</strong>, você pode colar uma URL de arquivo <code>.mp3</code> em cada item. Se o card tiver um MP3 cadastrado, ele terá prioridade total sobre a voz sintética.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Completion message */}
      <div className="border-t border-slate-100 pt-3">
        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
          Mensagem de Conclusão / Feedback
        </label>
        <input
          type="text"
          value={settings.completionMessage}
          onChange={(e) => handleChange({ completionMessage: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          placeholder="Ex: Parabéns! Você explorou todas as informações!"
        />
      </div>
    </div>
  );
};
