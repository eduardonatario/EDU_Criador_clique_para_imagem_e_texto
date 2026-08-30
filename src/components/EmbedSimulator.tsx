import React from 'react';
import { ActivityItem, ActivitySettings } from '../types';
import { generateEmbeddedHtml } from '../utils/htmlGenerator';
import {
  Layout,
  Download,
  Copy,
  Check,
  ArrowLeft,
} from 'lucide-react';

interface EmbedSimulatorProps {
  settings: ActivitySettings;
  items: ActivityItem[];
  onClose: () => void;
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  isCopied: boolean;
}

export const EmbedSimulator: React.FC<EmbedSimulatorProps> = ({
  settings,
  items,
  onClose,
  onCopyHtml,
  onDownloadHtml,
  isCopied,
}) => {
  const fullIframeHtml = generateEmbeddedHtml(settings, items, 'iframe_wrapper');

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col overflow-y-auto">
      {/* Top Bar identical to settings */}
      <header className="bg-slate-100 border-b border-slate-200 sticky top-0 z-30 text-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight text-slate-900">
                  Criador de Clique para Ver o Conteúdo
                </h1>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Criador de widget educacional multimídia
              </p>
            </div>
          </div>

          {/* Right Actions: 1) Voltar para configuração, 2) Copiar HTML, 3) Baixar HTML */}
          <div className="flex items-center gap-2">
            {/* 1. Voltar para configuração */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 shadow-xs transition cursor-pointer"
              title="Voltar para configuração"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-700" />
              <span>Voltar para configuração</span>
            </button>

            {/* 2. Copiar HTML */}
            <button
              type="button"
              onClick={onCopyHtml}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
              title="Copiar código HTML completo para a área de transferência"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-200 font-semibold">HTML Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-blue-100" />
                  <span>Copiar HTML</span>
                </>
              )}
            </button>

            {/* 3. Baixar HTML */}
            <button
              type="button"
              onClick={onDownloadHtml}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 transition cursor-pointer"
              title="Baixar arquivo HTML completo pronto para uso"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar HTML</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Preview Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-3 sm:p-6 overflow-hidden">
          <iframe
            title="Visualização da Atividade"
            srcDoc={fullIframeHtml}
            className="w-full min-h-[620px] h-full border-0 rounded-xl bg-transparent"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </main>
    </div>
  );
};
