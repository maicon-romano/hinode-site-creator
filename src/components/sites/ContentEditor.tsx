
import React from 'react';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Upload } from 'lucide-react';

interface ContentEditorProps {
  sectionType: string;
  sectionData: any;
  onContentChange: (field: string, value: any) => void;
  onImageUpload: (field: string, file: File) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  sectionType,
  sectionData,
  onContentChange,
  onImageUpload
}) => {
  const handleFileUpload = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(field, file);
    }
  };

  const addCard = () => {
    const currentCards = sectionData.cards || [];
    const newCard = {
      titulo: `Novo Item ${currentCards.length + 1}`,
      descricao: 'Descrição do item',
      icone: '⭐',
      imagem: '',
      link: '#'
    };
    onContentChange('cards', [...currentCards, newCard]);
  };

  const updateCard = (index: number, field: string, value: any) => {
    const currentCards = [...(sectionData.cards || [])];
    currentCards[index] = { ...currentCards[index], [field]: value };
    onContentChange('cards', currentCards);
  };

  const removeCard = (index: number) => {
    const currentCards = sectionData.cards || [];
    const updatedCards = currentCards.filter((_: any, i: number) => i !== index);
    onContentChange('cards', updatedCards);
  };

  const renderBasicFields = () => (
    <div className="space-y-4">
      {/* Título */}
      <FormItem>
        <FormLabel>Título Principal</FormLabel>
        <FormControl>
          <Input
            value={sectionData.titulo || ''}
            onChange={(e) => onContentChange('titulo', e.target.value)}
            placeholder="Digite o título da seção"
          />
        </FormControl>
      </FormItem>

      {/* Subtítulo */}
      <FormItem>
        <FormLabel>Subtítulo</FormLabel>
        <FormControl>
          <Input
            value={sectionData.subtitulo || ''}
            onChange={(e) => onContentChange('subtitulo', e.target.value)}
            placeholder="Digite o subtítulo"
          />
        </FormControl>
      </FormItem>

      {/* Descrição */}
      <FormItem>
        <FormLabel>Descrição</FormLabel>
        <FormControl>
          <Textarea
            value={sectionData.descricao || ''}
            onChange={(e) => onContentChange('descricao', e.target.value)}
            placeholder="Digite a descrição da seção"
            className="min-h-[100px]"
          />
        </FormControl>
      </FormItem>

      {/* Texto do Botão */}
      <FormItem>
        <FormLabel>Texto do Botão</FormLabel>
        <FormControl>
          <Input
            value={sectionData.botaoTexto || ''}
            onChange={(e) => onContentChange('botaoTexto', e.target.value)}
            placeholder="Ex: Saiba Mais, Entre em Contato"
          />
        </FormControl>
      </FormItem>

      {/* Link do Botão */}
      <FormItem>
        <FormLabel>Link do Botão</FormLabel>
        <FormControl>
          <Input
            value={sectionData.botaoLink || ''}
            onChange={(e) => onContentChange('botaoLink', e.target.value)}
            placeholder="https://... ou #"
          />
        </FormControl>
      </FormItem>

      {/* Upload de Imagem */}
      <FormItem>
        <FormLabel>Imagem da Seção</FormLabel>
        <FormControl>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload('imagem')}
                className="flex-1"
              />
              <Button type="button" variant="outline">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {sectionData.imagem && (
              <img 
                src={sectionData.imagem} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded border"
              />
            )}
          </div>
        </FormControl>
      </FormItem>
    </div>
  );

  const renderCardEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Cards/Itens da Seção</h4>
        <Button type="button" onClick={addCard} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Item
        </Button>
      </div>

      {(sectionData.cards || []).map((card: any, index: number) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Item {index + 1}</span>
            <Button 
              type="button" 
              onClick={() => removeCard(index)} 
              variant="destructive" 
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormItem>
              <FormLabel>Título do Item</FormLabel>
              <FormControl>
                <Input
                  value={card.titulo || ''}
                  onChange={(e) => updateCard(index, 'titulo', e.target.value)}
                  placeholder="Título do card"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Ícone/Emoji</FormLabel>
              <FormControl>
                <Input
                  value={card.icone || ''}
                  onChange={(e) => updateCard(index, 'icone', e.target.value)}
                  placeholder="⭐ 🎯 💡"
                />
              </FormControl>
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                value={card.descricao || ''}
                onChange={(e) => updateCard(index, 'descricao', e.target.value)}
                placeholder="Descrição do item"
                className="min-h-[80px]"
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Link (opcional)</FormLabel>
            <FormControl>
              <Input
                value={card.link || ''}
                onChange={(e) => updateCard(index, 'link', e.target.value)}
                placeholder="https://... ou #"
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Imagem do Item</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onImageUpload(`cards.${index}.imagem`, file);
                    }
                  }}
                />
                {card.imagem && (
                  <img 
                    src={card.imagem} 
                    alt="Preview" 
                    className="w-24 h-24 object-cover rounded border"
                  />
                )}
              </div>
            </FormControl>
          </FormItem>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Editar Conteúdo - {sectionType}</h3>
      {renderBasicFields()}
      {renderCardEditor()}
    </div>
  );
};
