import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ItemEditor } from './components/ItemEditor';
import { SettingsPanel } from './components/SettingsPanel';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ExportModal } from './components/ExportModal';
import { AiModal } from './components/AiModal';
import { EmbedSimulator } from './components/EmbedSimulator';
import { PRESET_TEMPLATES } from './utils/presets';
import { generateEmbeddedHtml } from './utils/htmlGenerator';
import { ActivityItem, ActivitySettings, PresetTemplate } from './types';
import {
  Layers,
  Sliders,
} from 'lucide-react';

export default function App() {
  const defaultPreset = PRESET_TEMPLATES[0];

  const [settings, setSettings] = useState<ActivitySettings>({
    title: defaultPreset.settings.title || 'Sistemas do Corpo Humano',
    subtitle:
      defaultPreset.settings.subtitle ||
      'Clique ou arraste os os itens para o painel central para ter a explicação ou a imagem.',
    categoryTitle: defaultPreset.settings.categoryTitle || 'Anatomia Humana',
    layoutMode: defaultPreset.settings.layoutMode || 'inspector',
    theme: 'nordic',
    borderRadius: defaultPreset.settings.borderRadius || 16,
    fontScale: defaultPreset.settings.fontScale || 'md',
    showAccentCircle: false,
    useAccentAsBackground: false,
    clickedCardColor: '#f0fdf4',
    enableSound: true,
    enableConfetti: true,
    showResetBtn: true,
    allowClickToReveal: true,
    completionMessage: defaultPreset.settings.completionMessage || '',
    customCss: '',
  });

  const [items, setItems] = useState<ActivityItem[]>(defaultPreset.items);
  const [activeTab, setActiveTab] = useState<'cards' | 'settings'>('cards');

  // Modals & copy state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEmbedSimulatorOpen, setIsEmbedSimulatorOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyHtml = () => {
    const html = generateEmbeddedHtml(settings, items, 'standalone');
    navigator.clipboard.writeText(html);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadHtml = () => {
    const html = generateEmbeddedHtml(settings, items, 'iframe_wrapper');
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanTitle = settings.title
      ? settings.title.toLowerCase().replace(/[^a-z0-9]/gi, '-')
      : 'arrastar-para-mais';
    a.download = `atividade-${cleanTitle}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectPreset = (preset: PresetTemplate) => {
    setSettings((prev) => ({
      ...prev,
      ...preset.settings,
    }));
    setItems(preset.items);
  };

  const handleApplyAiData = (
    title: string,
    subtitle: string,
    categoryTitle: string,
    generatedItems: ActivityItem[]
  ) => {
    setSettings((prev) => ({
      ...prev,
      title,
      subtitle,
      categoryTitle,
    }));
    setItems(generatedItems);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        onOpenEmbedSimulator={() => setIsEmbedSimulatorOpen(true)}
        onCopyHtml={handleCopyHtml}
        onDownloadHtml={handleDownloadHtml}
        isCopied={isCopied}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Authoring Panel */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tab selector */}
            <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('cards')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  activeTab === 'cards'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>1. Cards e Conteúdo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>2. Design e Opções</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'cards' ? (
              <ItemEditor items={items} onUpdateItems={setItems} />
            ) : (
              <SettingsPanel
                settings={settings}
                onUpdateSettings={setSettings}
              />
            )}
          </div>

          {/* Right Live Interactive Canvas */}
          <div className="lg:col-span-7">
            <PreviewCanvas settings={settings} items={items} />
          </div>
        </div>
      </main>

      {/* Modals */}
      {isExportModalOpen && (
        <ExportModal
          settings={settings}
          items={items}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      {isAiModalOpen && (
        <AiModal
          onApplyGeneratedData={handleApplyAiData}
          onClose={() => setIsAiModalOpen(false)}
        />
      )}

      {isEmbedSimulatorOpen && (
        <EmbedSimulator
          settings={settings}
          items={items}
          onClose={() => setIsEmbedSimulatorOpen(false)}
          onCopyHtml={handleCopyHtml}
          onDownloadHtml={handleDownloadHtml}
          isCopied={isCopied}
        />
      )}
    </div>
  );
}
