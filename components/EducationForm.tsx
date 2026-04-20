import React, { useState } from 'react';
import { Education } from '../types';
import { Trash2, Plus } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Education>({
    degree: '',
    institution: '',
    period: '',
    description: ''
  });

  const handleAdd = () => {
    if (formData.degree && formData.institution && formData.period) {
      onUpdate([...education, { ...formData }]);
      setFormData({ degree: '', institution: '', period: '', description: '' });
    }
  };

  const handleEdit = (index: number) => {
    setFormData(education[index]);
    setEditingId(index);
  };

  const handleSave = () => {
    if (editingId !== null && formData.degree && formData.institution && formData.period) {
      const updated = [...education];
      updated[editingId] = formData;
      onUpdate(updated);
      setFormData({ degree: '', institution: '', period: '', description: '' });
      setEditingId(null);
    }
  };

  const handleDelete = (index: number) => {
    onUpdate(education.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setFormData({ degree: '', institution: '', period: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Formulário de entrada */}
      <div className="border border-slate-300 rounded-lg p-4 bg-white">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          {editingId !== null ? 'Editar Formação' : 'Adicionar Nova Formação'}
        </h4>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Grau/Diploma"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <input
            type="text"
            placeholder="Instituição"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <input
            type="text"
            placeholder="Período (ex: 2020 - Presente)"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <textarea
            placeholder="Descrição (opcional)"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <div className="flex gap-2">
            {editingId !== null ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 px-3 py-2 bg-sky-600 text-white text-sm rounded hover:bg-sky-700 transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-3 py-2 bg-slate-300 text-slate-900 text-sm rounded hover:bg-slate-400 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="flex-1 px-3 py-2 bg-sky-600 text-white text-sm rounded hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Adicionar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lista de formações */}
      <div className="space-y-2">
        {education.map((edu, index) => (
          <div key={index} className="border border-slate-300 rounded-lg p-3 bg-slate-50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h5 className="font-semibold text-slate-900 text-sm">{edu.degree}</h5>
                <p className="text-xs text-slate-600">{edu.institution}</p>
                <p className="text-xs text-slate-500">{edu.period}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            {edu.description && (
              <p className="text-xs text-slate-700 line-clamp-2">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
