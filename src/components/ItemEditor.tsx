import React, { useState } from 'react';
import { ActivityItem, RevealContentType } from '../types';
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
  Info
} from 'lucide-react';

interface ItemEditorProps {
  items: ActivityItem[];
  onUpdateItems: (items: ActivityItem[]) => void;
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
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    items[0]?.id || null
  );

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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'text', label: 'Texto Detalhado', icon: FileText },
                        { id: 'image-only', label: 'Apenas Imagem', icon: ImageIcon },
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
                          Exibido ao arrastar o card
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
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
