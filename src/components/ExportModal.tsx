import React, { useState } from 'react';
import { ActivityItem, ActivitySettings } from '../types';
import { generateEmbeddedHtml } from '../utils/htmlGenerator';
import {
  X,
  Copy,
  Check,
  Download,
  Code2,
  Globe,
  HelpCircle,
  Sparkles,
  Layers,
  FileCode,
  Layout
} from 'lucide-react';

interface ExportModalProps {
  settings: ActivitySettings;
  items: ActivityItem[];
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  settings,
  items,
  onClose,
}) => {
  const [exportMode, setExportMode] = useState<
    'iframe' | 'inline' | 'standalone'
  >('iframe');
  const [copied, setCopied] = useState(false);
  const [activeTabGuide, setActiveTabGuide] = useState<
    'moodle' | 'sites' | 'notion' | 'wordpress'
  >('moodle');

  const standaloneHtml = generateEmbeddedHtml(settings, items, 'standalone');
  const iframeWrapperHtml = generateEmbeddedHtml(
    settings,
    items,
    'iframe_wrapper'
  );

  // Generate responsive iframe snippet
  const iframeSnippet = `<!-- INÍCIO DO COMPONENTE INTERATIVO ARRASTAR PARA MAIS -->
<div style="width: 100%; max-width: 960px; margin: 0 auto; overflow: hidden; border-radius: ${
    settings.borderRadius
  }px;">
  <iframe 
    id="edu-drag-iframe-${Math.random().toString(36).substring(2, 7)}"
    srcdoc="${escapeAttr(iframeWrapperHtml)}"
    style="width: 100%; height: 580px; border: none; overflow: hidden; display: block;"
    title="${settings.title}"
    loading="lazy"
    allow="autoplay"
  ></iframe>
</div>
<script>
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'edu-iframe-resize') {
      var iframes = document.querySelectorAll('iframe');
      iframes.forEach(function(f) {
        if (f.srcdoc && f.srcdoc.indexOf(e.data.id) !== -1) {
          f.style.height = (e.data.height + 20) + 'px';
        }
      });
    }
  });
</script>
<!-- FIM DO COMPONENTE INTERATIVO -->`;

  const codeToCopy =
    exportMode === 'iframe'
      ? iframeSnippet
      : exportMode === 'inline'
      ? standaloneHtml
      : iframeWrapperHtml;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([iframeWrapperHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atividade-${settings.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Exportar Código HTML para Embed
              </h2>
              <p className="text-xs text-slate-400">
                Gera código 100% autônomo, responsivo e imune a conflitos de CSS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs">
          {/* Format Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setExportMode('iframe')}
              className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 ${
                exportMode === 'iframe'
                  ? 'border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500'
                  : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-xs">Iframe Responsivo</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Recomendado para Moodle, Google Sites, Notion e Canva. Zero
                conflito de CSS.
              </span>
            </button>

            <button
              type="button"
              onClick={() => setExportMode('inline')}
              className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 ${
                exportMode === 'inline'
                  ? 'border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500'
                  : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-xs">HTML Inline (Rótulo)</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Para cole direto em editores HTML de Moodle, WordPress e blogs.
              </span>
            </button>

            <button
              type="button"
              onClick={() => setExportMode('standalone')}
              className={`p-3 rounded-xl border text-left transition flex flex-col gap-1 ${
                exportMode === 'standalone'
                  ? 'border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500'
                  : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-xs">Baixar Arquivo .HTML</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Arquivo completo para hospedar no seu servidor ou abrir no
                navegador.
              </span>
            </button>
          </div>

          {/* Code Viewer Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-xs flex items-center gap-2">
                <span>Código Gerado</span>
                <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">
                  {exportMode === 'iframe'
                    ? 'Iframe + Auto-Resize'
                    : exportMode === 'inline'
                    ? 'Scoped HTML'
                    : 'Standalone File'}
                </span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition font-medium text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar .html</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg transition font-semibold text-xs shadow-md shadow-blue-600/20"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-60 leading-relaxed">
              <pre>{codeToCopy}</pre>
            </div>
          </div>

          {/* Integration Instructions */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
              <h3 className="font-bold text-white flex items-center gap-2 text-xs">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                <span>Como incorporar em sua plataforma LMS / Site:</span>
              </h3>

              <div className="flex gap-1">
                {(['moodle', 'sites', 'notion', 'wordpress'] as const).map(
                  (platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => setActiveTabGuide(platform)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                        activeTabGuide === platform
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-slate-200 bg-slate-800'
                      }`}
                    >
                      {platform === 'sites' ? 'Google Sites' : platform}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Platform Guides */}
            <div className="text-slate-300 space-y-2 leading-relaxed">
              {activeTabGuide === 'moodle' && (
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  <li>No seu curso do <strong>Moodle</strong>, ative o modo de edição.</li>
                  <li>Adicione uma atividade ou recurso do tipo <strong>Rótulo (Label)</strong> ou <strong>Página</strong>.</li>
                  <li>No editor de texto, clique no ícone de <strong>HTML (&lt;&gt;)</strong> ou "Ver código-fonte".</li>
                  <li>Cole o código copiado acima e clique em <strong>Salvar e voltar ao curso</strong>.</li>
                </ol>
              )}

              {activeTabGuide === 'sites' && (
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  <li>No <strong>Google Sites</strong>, vá no painel lateral em <strong>Inserir &gt; Incorporar (&lt;/&gt;)</strong>.</li>
                  <li>Escolha a aba <strong>Incorporar código</strong>.</li>
                  <li>Cole o código copiado acima e clique em <strong>Avançar &gt; Inserir</strong>.</li>
                  <li>Ajuste a largura na página conforme desejado.</li>
                </ol>
              )}

              {activeTabGuide === 'notion' && (
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  <li>Baixe o arquivo <strong>.html</strong> acima usando o botão "Baixar .html".</li>
                  <li>Hospede o arquivo em qualquer servidor público ou carregue no Notion usando o bloco <strong>/embed</strong>.</li>
                </ol>
              )}

              {activeTabGuide === 'wordpress' && (
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  <li>No editor Gutenberg do <strong>WordPress</strong>, adicione um bloco <strong>HTML Personalizado</strong>.</li>
                  <li>Cole o código gerado acima e clique em "Visualizar" para testar.</li>
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function escapeAttr(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
