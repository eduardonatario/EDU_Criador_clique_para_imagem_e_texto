import React, { useState, useRef } from 'react';
import { ActivityItem, ActivitySettings, RevealContentType } from '../types';
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Palette,
  FileText,
  Image as ImageIcon,
  Layers,
  Link,
  Info,
  Volume2,
  Play,
  Square,
  Music,
  Headphones,
  Video
} from 'lucide-react';

interface ItemEditorProps {
  items: ActivityItem[];
  onUpdateItems: (items: ActivityItem[]) => void;
  settings?: ActivitySettings;
}

// Extrai URL segura e compatível para iframe embed de YouTube, Vimeo ou tags <iframe>
export function formatEmbedVideoUrl(rawUrl: string, autoplay?: boolean): string {
  if (!rawUrl) return '';
  let trimmed = rawUrl.trim();

  // Caso o usuário tenha colado a tag completa <iframe src="..."></iframe>
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return formatEmbedVideoUrl(iframeMatch[1], autoplay);
  }

  // YouTube URLs (watch, youtu.be, shorts, embed)
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    let embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
    if (autoplay) {
      embedUrl += '?autoplay=1';
    }
    return embedUrl;
  }

  // Vimeo URLs
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    let embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    if (autoplay) {
      embedUrl += '?autoplay=1';
    }
    return embedUrl;
  }

  // Outras URLs de embed
  if (autoplay) {
    if (!trimmed.includes('autoplay=')) {
      trimmed += (trimmed.includes('?') ? '&' : '?') + 'autoplay=1';
    }
  } else {
    trimmed = trimmed.replace(/([?&])autoplay=1(&|$)/, '$1').replace(/[?&]$/, '');
  }

  return trimmed;
}

const COLOR_OPTIONS = [
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Roxo', value: '#8b5cf6' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Laranja', value: '#f97316' },
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Ciano', value: '#06b6d4' },
  { name: 'Âmbar', value: '#f59e0b' },
];

export const ItemEditor: React.FC<ItemEditorProps> = ({
  items,
  onUpdateItems,
  settings,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    items[0]?.id || null
  );
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingAudioId(null);
  };

  const handleTestItemAudio = (item: ActivityItem) => {
    if (playingAudioId === item.id) {
      stopAudio();
      return;
    }

    stopAudio();

    if (item.audioUrl && item.audioUrl.trim()) {
      try {
        const audio = new Audio(item.audioUrl.trim());
        currentAudioRef.current = audio;
        setPlayingAudioId(item.id);
        audio.onended = () => setPlayingAudioId(null);
        audio.onerror = () => {
          alert('Não foi possível carregar o arquivo de áudio. Verifique a URL do MP3.');
          setPlayingAudioId(null);
        };
        audio.play().catch(() => setPlayingAudioId(null));
      } catch (err) {
        console.error(err);
        setPlayingAudioId(null);
      }
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const textToSpeak = `${item.title}. ${item.subtitle ? item.subtitle + '. ' : ''}${item.details || item.imageCaption || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = settings?.narrationLanguage || 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setPlayingAudioId(null);
      utterance.onerror = () => setPlayingAudioId(null);
      setPlayingAudioId(item.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddItem = () => {
    const newItem: ActivityItem = {
      id: 'item-' + Date.now(),
      title: 'Novo Conceito ' + (items.length + 1),
      subtitle: '',
      badge: '',
      icon: 'star',
      color: COLOR_OPTIONS[items.length % COLOR_OPTIONS.length].value,
      details:
        'Escreva aqui a informação detalhada que será revelada quando o aluno arrastar este card.',
    };

    const nextItems = [...items, newItem];
    onUpdateItems(nextItems);
    setExpandedId(newItem.id);
  };

  const handleRemoveItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (items.length <= 1) {
      alert('A atividade precisa de pelo menos 1 card.');
      return;
    }
    const nextItems = items.filter((i) => i.id !== id);
    onUpdateItems(nextItems);
    if (expandedId === id) {
      setExpandedId(nextItems[0]?.id || null);
    }
  };

  const handleUpdateItem = (id: string, fields: Partial<ActivityItem>) => {
    const nextItems = items.map((item) =>
      item.id === id ? { ...item, ...fields } : item
    );
    onUpdateItems(nextItems);
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    onUpdateItems(newItems);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span>Cards & Conteúdos</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              {items.length} {items.length === 1 ? 'card' : 'cards'}
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Cadastre os conceitos que o estudante irá arrastar para visualizar
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Card</span>
        </button>
      </div>

      {/* Item List */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`border rounded-xl transition ${
                isExpanded
                  ? 'border-blue-500/50 ring-2 ring-blue-500/10 bg-slate-50/50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Header bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-3 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-slate-400 cursor-grab">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color || '#3b82f6' }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {item.title || 'Sem título'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.subtitle || 'Clique para editar detalhes'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={(e) => handleMoveItem(index, 'up', e)}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={(e) => handleMoveItem(index, 'down', e)}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveItem(item.id, e)}
                    className="p-1 text-red-400 hover:text-red-600 transition"
                    title="Excluir card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Form panel */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-200/80 space-y-4 bg-white rounded-b-xl text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Título do Card
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleUpdateItem(item.id, { title: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                        placeholder="Ex: Sistema Respiratório"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Subtítulo / Dica curta
                      </label>
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) =>
                          handleUpdateItem(item.id, {
                            subtitle: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                        placeholder="Ex: Pulmões e Vias Aéreas"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Cor de Destaque
                    </label>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() =>
                            handleUpdateItem(item.id, { color: c.value })
                          }
                          className={`w-6 h-6 rounded-full transition transform ${
                            item.color === c.value
                              ? 'scale-110 ring-2 ring-offset-1 ring-blue-500'
                              : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tipo de Informação Revelada */}
                  <div className="border-t border-slate-100 pt-3">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-2">
                      Tipo de Informação Revelada
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {[
                        { id: 'text', label: 'Texto Detalhado', icon: FileText },
                        { id: 'image-only', label: 'Apenas Imagem', icon: ImageIcon },
                        { id: 'video-only', label: 'Vídeo (Iframe)', icon: Video },
                        { id: 'image', label: 'Imagem + Legenda', icon: ImageIcon },
                        { id: 'both', label: 'Texto + Imagem', icon: Layers },
                      ].map((type) => {
                        const currentType = item.contentType || (item.imageUrl ? 'image' : 'text');
                        const isSelected = currentType === type.id;
                        const IconComponent = type.icon;

                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                              handleUpdateItem(item.id, {
                                contentType: type.id as RevealContentType,
                              })
                            }
                            className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 text-blue-900 font-bold'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span className="text-[10px] leading-tight">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Campos condicionais baseados no tipo de conteúdo */}
                  {/* Se for VÍDEO (IFRAME) */}
                  {(item.contentType || (item.imageUrl ? 'image' : 'text')) === 'video-only' && (
                    <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-blue-600" />
                            URL do Vídeo ou Código &lt;iframe&gt;
                          </span>
                          <span className="text-[10px] text-slate-400">YouTube, Vimeo ou Iframe Embed</span>
                        </label>
                        <input
                          type="text"
                          value={item.videoUrl || ''}
                          onChange={(e) =>
                            handleUpdateItem(item.id, { videoUrl: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono"
                          placeholder="https://www.youtube.com/watch?v=... ou https://www.youtube.com/embed/..."
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500">Exemplo rápido:</span>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateItem(item.id, {
                                videoUrl: 'https://www.youtube.com/watch?v=libKVRa01L8',
                              })
                            }
                            className="text-[10px] bg-white border border-slate-200 text-blue-600 px-2 py-0.5 rounded-md hover:border-blue-400 transition"
                          >
                            + Usar Vídeo Exemplo (YouTube)
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-500">
                          Ocupa 100% da área de exibição
                        </span>
                      </div>

                      {/* Configuração de Reprodução do Vídeo (Autoplay vs Play Manual) */}
                      <div className="border-t border-slate-200/80 pt-2.5 space-y-2">
                        <label className="block text-[11px] font-semibold text-slate-700">
                          Comportamento de Reprodução
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateItem(item.id, { videoAutoplay: false })}
                            className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                              !item.videoAutoplay
                                ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 text-blue-950 font-semibold'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <Play className={`w-4 h-4 mt-0.5 flex-shrink-0 ${!item.videoAutoplay ? 'text-blue-600' : 'text-slate-400'}`} />
                            <div>
                              <p className="text-xs font-semibold">Aguardar Play manual</p>
                              <p className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5">
                                O estudante clica no player para iniciar o vídeo quando desejar
                              </p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateItem(item.id, { videoAutoplay: true })}
                            className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                              item.videoAutoplay
                                ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 text-blue-950 font-semibold'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <Play className={`w-4 h-4 mt-0.5 flex-shrink-0 fill-current ${item.videoAutoplay ? 'text-blue-600' : 'text-slate-400'}`} />
                            <div>
                              <p className="text-xs font-semibold">Iniciar Automaticamente (Autoplay)</p>
                              <p className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5">
                                O vídeo começa a tocar assim que o card é revelado/arrastado
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {((item.contentType || (item.imageUrl ? 'image' : 'text')) === 'image-only' ||
                    (item.contentType || (item.imageUrl ? 'image' : 'text')) === 'image' ||
                    (item.contentType || (item.imageUrl ? 'image' : 'text')) === 'both') && (
                    <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Link className="w-3.5 h-3.5 text-blue-600" />
                            URL da Imagem
                          </span>
                          <span className="text-[10px] text-slate-400">Suporta Unsplash, Wikimedia, etc.</span>
                        </label>
                        <input
                          type="url"
                          value={item.imageUrl || ''}
                          onChange={(e) =>
                            handleUpdateItem(item.id, { imageUrl: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                          placeholder="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600"
                        />
                      </div>

                      {((item.contentType || (item.imageUrl ? 'image' : 'text')) === 'image' ||
                        (item.contentType || (item.imageUrl ? 'image' : 'text')) === 'both') && (
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Legenda da Imagem
                          </label>
                          <input
                            type="text"
                            value={item.imageCaption || ''}
                            onChange={(e) =>
                              handleUpdateItem(item.id, { imageCaption: e.target.value })
                            }
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                            placeholder="Ex: Diagrama ilustrativo da circulação sanguínea."
                          />
                        </div>
                      )}

                      {/* Exemplo rápido de imagem */}
                      {!item.imageUrl && (
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[10px] text-slate-500">Exemplo rápido:</span>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateItem(item.id, {
                                imageUrl:
                                  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
                                imageCaption: 'Exemplo de ilustração científica em alta resolução.',
                              })
                            }
                            className="text-[10px] bg-white border border-slate-200 text-blue-600 px-2 py-0.5 rounded-md hover:border-blue-400 transition"
                          >
                            + Usar Imagem Exemplo
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {((item.contentType || (item.imageUrl ? 'image' : 'text')) === 'text' ||
                    (item.contentType || (item.imageUrl ? 'image' : 'text')) === 'both') && (
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          Informação Revelada (Texto Detalhado)
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Exibido ao clicar ou arrastar o card
                        </span>
                      </label>
                      <textarea
                        rows={4}
                        value={item.details}
                        onChange={(e) =>
                          handleUpdateItem(item.id, { details: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
                        placeholder="Escreva a explicação completa e didática para este conceito..."
                      />
                    </div>
                  )}

                  {/* Campo de Áudio MP3 / Narração */}
                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-blue-600" />
                        <span>Áudio em MP3 (Opcional)</span>
                      </label>
                      <span className="text-[10px] text-slate-400">
                        {settings?.enableNarration ? 'Narração ativa nas configurações' : 'Ative nas configurações para tocar ao clicar'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="url"
                          value={item.audioUrl || ''}
                          onChange={(e) =>
                            handleUpdateItem(item.id, { audioUrl: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                          placeholder="https://exemplo.com/audio-explicativo.mp3"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTestItemAudio(item)}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition flex-shrink-0 cursor-pointer ${
                          playingAudioId === item.id
                            ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                        title={
                          item.audioUrl
                            ? 'Ouvir arquivo MP3'
                            : `Ouvir sintetizador de voz (${settings?.narrationLanguage === 'en-US' ? 'Inglês' : 'Português'})`
                        }
                      >
                        {playingAudioId === item.id ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                            <span>Parar</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 text-blue-600" />
                            <span>{item.audioUrl ? 'Testar MP3' : 'Ouvir Voz'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-tight">
                      {item.audioUrl ? (
                        <span className="text-emerald-700 font-medium">✓ Arquivo MP3 personalizado configurado para este card.</span>
                      ) : (
                        <span>
                          Se vazio e a leitura estiver ativa nas configurações, o sistema lerá o texto via síntese de voz em{' '}
                          <strong>{settings?.narrationLanguage === 'en-US' ? 'Inglês' : 'Português'}</strong>.
                        </span>
                      )}
                    </p>

                    {settings?.enableNarration && (
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                        <span className="text-[11px] text-slate-700 font-medium">Exibir botão de leitura neste card</span>
                        <input
                          type="checkbox"
                          checked={item.showNarrationButton !== false}
                          onChange={(e) => handleUpdateItem(item.id, { showNarrationButton: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
