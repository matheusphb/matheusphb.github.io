import React, { useState } from 'react';
import { Experience } from '../types';
import { Trash2, Plus } from 'lucide-react';

interface ExperienceFormProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Experience>({
    role: '',
    company: '',
    period: '',
    description: ''
  });

  const handleAdd = () => {
    if (formData.role && formData.company && formData.period) {
      onUpdate([...experiences, { ...formData }]);
      setFormData({ role: '', company: '', period: '', description: '' });
    }
  };

  const handleEdit = (index: number) => {
    setFormData(experiences[index]);
    setEditingId(index);
  };

  const handleSave = () => {
    if (editingId !== null && formData.role && formData.company && formData.period) {
      const updated = [...experiences];
      updated[editingId] = formData;
      onUpdate(updated);
      setFormData({ role: '', company: '', period: '', description: '' });
      setEditingId(null);
    }
  };

  const handleDelete = (index: number) => {
    onUpdate(experiences.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setFormData({ role: '', company: '', period: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {/* Formulário de entrada */}
      <div className="border border-slate-300 rounded-lg p-4 bg-white">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          {editingId !== null ? 'Editar Experiência' : 'Adicionar Nova Experiência'}
        </h4>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Cargo/Função"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <input
            type="text"
            placeholder="Empresa"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <input
            type="text"
            placeholder="Período (ex: jan 2020 - dez 2021)"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          
          <textarea
            placeholder="Descrição (markdown suportado)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
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

      {/* Lista de experiências */}
      <div className="space-y-2">
        {experiences.map((exp, index) => (
          <div key={index} className="border border-slate-300 rounded-lg p-3 bg-slate-50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h5 className="font-semibold text-slate-900 text-sm">{exp.role}</h5>
                <p className="text-xs text-slate-600">{exp.company}</p>
                <p className="text-xs text-slate-500">{exp.period}</p>
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
            {exp.description && (
              <p className="text-xs text-slate-700 line-clamp-2">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
