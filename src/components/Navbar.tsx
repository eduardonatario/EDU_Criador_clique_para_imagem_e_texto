import React from 'react';
import {
  Layout,
  Download,
  Copy,
  Check,
  Play
} from 'lucide-react';

interface NavbarProps {
  onOpenEmbedSimulator: () => void;
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  isCopied: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEmbedSimulator,
  onCopyHtml,
  onDownloadHtml,
  isCopied,
}) => {
  return (
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

        {/* Right Actions: 1) Preview, 2) Copiar HTML, 3) Baixar HTML */}
        <div className="flex items-center gap-2">
          {/* 1. Preview */}
          <button
            type="button"
            onClick={onOpenEmbedSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
            title="Visualizar a atividade em tela cheia e simular embed em LMS"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white" />
            <span>Preview</span>
          </button>

          {/* 2. Copiar HTML */}
          <button
            type="button"
            onClick={onCopyHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
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
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 transition"
            title="Baixar arquivo HTML completo pronto para uso"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar HTML</span>
          </button>
        </div>
      </div>
    </header>
  );
};

