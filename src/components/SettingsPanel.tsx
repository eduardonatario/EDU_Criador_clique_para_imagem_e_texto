import React from 'react';
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
  MousePointer,
  Columns,
  LayoutGrid,
  Check,
  Circle,
  Paintbrush,
  CheckCheck
} from 'lucide-react';

interface SettingsPanelProps {
  settings: ActivitySettings;
  onUpdateSettings: (settings: ActivitySettings) => void;
}

const CLICKED_COLOR_PRESETS = [
  { name: 'Verde Claro (Padrão)', value: '#f0fdf4', border: '#86efac' },
  { name: 'Azul Claro', value: '#eff6ff', border: '#93c5fd' },
  { name: 'Menta Fresca', value: '#ecfdf5', border: '#6ee7b7' },
  { name: 'Lilás Suave', value: '#faf5ff', border: '#d8b4fe' },
  { name: 'Âmbar Suave', value: '#fffbeb', border: '#fde68a' },
  { name: 'Pêssego Warm', value: '#fff7ed', border: '#fed7aa' },
  { name: 'Rosa Suave', value: '#fff1f2', border: '#fecdd3' },
  { name: 'Ciano Claro', value: '#ecfeff', border: '#a5f3fc' },
  { name: 'Cinza Neutro', value: '#f1f5f9', border: '#cbd5e1' },
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
  const handleChange = (fields: Partial<ActivitySettings>) => {
    onUpdateSettings({ ...settings, ...fields });
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
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Cor do Card ao Clicar / Revelar</span>
          </label>
          <span className="text-[10px] font-mono text-slate-500 font-medium px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
            {settings.clickedCardColor || '#f0fdf4'}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 mb-2.5">
          Escolha a tonalidade de preenchimento que o card adquire quando o aluno clica ou revela a informação (padrão: verde claro).
        </p>

        {/* Chips de cores pré-definidas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2.5">
          {CLICKED_COLOR_PRESETS.map((preset) => {
            const currentVal = (settings.clickedCardColor || '#f0fdf4').toLowerCase();
            const isSelected = currentVal === preset.value.toLowerCase();
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => handleChange({ clickedCardColor: preset.value })}
                className={`p-2 rounded-lg border text-left transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 font-semibold'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-md border shadow-2xs flex-shrink-0"
                  style={{ backgroundColor: preset.value, borderColor: preset.border }}
                />
                <span className="text-[11px] text-slate-700 truncate">
                  {preset.name}
                </span>
                {isSelected && (
                  <CheckCheck className="w-3 h-3 text-blue-600 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Seletor Customizado */}
        <div className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.clickedCardColor || '#f0fdf4'}
              onChange={(e) => handleChange({ clickedCardColor: e.target.value })}
              className="w-6 h-6 rounded cursor-pointer border border-slate-300 p-0 bg-transparent"
              title="Seletor de cor personalizada"
            />
            <span className="text-[11px] font-medium text-slate-700">
              Personalizar Cor Exata
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            Clique na paleta para qualquer tom HEX
          </span>
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
            <MousePointer className="w-4 h-4 text-slate-500" />
            <div>
              <p className="font-semibold text-slate-800">Permitir Clique para Revelar</p>
              <p className="text-[10px] text-slate-500">
                Além de arrastar, o aluno pode simplesmente clicar no card (recomendado para celulares)
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.allowClickToReveal}
            onChange={(e) =>
              handleChange({ allowClickToReveal: e.target.checked })
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
              <p className="font-semibold text-slate-800">Efeitos de Áudio Sintetizados</p>
              <p className="text-[10px] text-slate-500">
                Sons suaves de 'pop' e vitória usando Web Audio API nativa
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
