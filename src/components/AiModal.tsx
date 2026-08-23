import React, { useState } from 'react';
import { ActivityItem, ActivitySettings } from '../types';
import { Sparkles, X, Loader2, BookOpen, Lightbulb } from 'lucide-react';

interface AiModalProps {
  onApplyGeneratedData: (
    title: string,
    subtitle: string,
    categoryTitle: string,
    items: ActivityItem[]
  ) => void;
  onClose: () => void;
}

const SAMPLE_PROMPTS = [
  'Estados Físicos da Matéria (Sólido, Líquido, Gasoso, Plasma)',
  'Funções da Linguagem na Comunicação',
  'Fases do Ciclo da Água na Natureza',
  'Principais Climas do Brasil e Características',
  'Tipos de Inteligência Artificial e Aplicações',
];

export const AiModal: React.FC<AiModalProps> = ({
  onApplyGeneratedData,
  onClose,
}) => {
  const [topic, setTopic] = useState('');
  const [itemCount, setItemCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          itemCount,
          language: 'pt',
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(
          resData.error || 'Falha ao gerar o conteúdo com a IA.'
        );
      }

      const { title, subtitle, categoryName, items } = resData.data;

      const formattedItems: ActivityItem[] = (items || []).map(
        (it: any, idx: number) => ({
          id: 'ai-item-' + Date.now() + '-' + idx,
          title: it.title || `Item ${idx + 1}`,
          subtitle: it.subtitle || '',
          badge: it.badge || `Conceito ${idx + 1}`,
          icon: it.icon || 'star',
          color: it.color || '#3b82f6',
          details: it.details || '',
        })
      );

      onApplyGeneratedData(
        title || topic,
        subtitle || 'Arraste os cards para o painel de revelação',
        categoryName || 'Detalhes do Tópico',
        formattedItems
      );

      onClose();
    } catch (err: any) {
      console.error('Erro na geração com IA:', err);
      setError(
        err.message || 'Ocorreu um erro ao conectar com o serviço de IA.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl text-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Gerar Atividade com IA (Gemini)
              </h2>
              <p className="text-xs text-slate-400">
                Digite um tema e criaremos os cards e explicações automaticamente
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

        {/* Form */}
        <form onSubmit={handleGenerate} className="p-6 space-y-5 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Qual é o tema da aula ou assunto pedagógico?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Camadas do Planeta Terra, Regras de Crase, Tipos de Energia..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

          {/* Quick suggestions */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
              <span>Sugestões rápidas de temas:</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setTopic(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition text-left border border-slate-700/60"
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Number of items */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Quantidade de Cards para a Atividade:
            </label>
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setItemCount(num)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                    itemCount === num
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  disabled={loading}
                >
                  {num} Cards
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-yellow-300" />
                <span>Criando atividade pedagógica...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Gerar Conteúdo com Gemini AI</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
