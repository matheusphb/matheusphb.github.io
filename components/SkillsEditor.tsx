import React, { useState } from 'react';
import { SkillGroup } from '../types';
import { Trash2, Plus } from 'lucide-react';

interface SkillsEditorProps {
  skills: SkillGroup[];
  onUpdate: (skills: SkillGroup[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, onUpdate }) => {
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [skewingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState(75);

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      onUpdate([
        ...skills,
        {
          category: categoryName,
          skills: []
        }
      ]);
      setCategoryName('');
    }
  };

  const handleAddSkill = (categoryIndex: number) => {
    if (skillName.trim()) {
      const updated = [...skills];
      updated[categoryIndex].skills.push({
        name: skillName,
        proficiency
      });
      onUpdate(updated);
      setSkillName('');
      setProficiency(75);
    }
  };

  const handleDeleteSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex].skills.splice(skillIndex, 1);
    onUpdate(updated);
  };

  const handleDeleteCategory = (categoryIndex: number) => {
    onUpdate(skills.filter((_, i) => i !== categoryIndex));
  };

  const handleUpdateSkillProficiency = (categoryIndex: number, skillIndex: number, prof: number) => {
    const updated = [...skills];
    updated[categoryIndex].skills[skillIndex].proficiency = prof;
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      {/* Adicionar categoria */}
      <div className="border border-slate-300 rounded-lg p-4 bg-white">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Adicionar Categoria</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nome da categoria (ex: Linguagens)"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-sky-600 text-white text-sm rounded hover:bg-sky-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>
      </div>

      {/* Lista de categorias e skills */}
      <div className="space-y-3">
        {skills.map((group, catIndex) => (
          <div key={catIndex} className="border border-slate-300 rounded-lg p-4 bg-slate-50">
            <div className="flex justify-between items-center mb-3">
              <h5 className="font-semibold text-slate-900 text-sm">{group.category}</h5>
              <button
                onClick={() => handleDeleteCategory(catIndex)}
                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Adicionar skill nesta categoria */}
            <div className="mb-3 p-3 bg-white border border-dashed border-slate-300 rounded">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Nome da skill"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={proficiency}
                    onChange={(e) => setProficiency(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold text-slate-900 w-12 text-right">{proficiency}%</span>
                </div>
                <button
                  onClick={() => handleAddSkill(catIndex)}
                  className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Adicionar Skill
                </button>
              </div>
            </div>

            {/* Lista de skills */}
            <div className="space-y-2">
              {group.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex justify-between items-center p-2 bg-white rounded border border-slate-200">
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 font-medium">{skill.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-xs">
                        <div
                          className="bg-sky-600 h-2 rounded-full transition-all"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 w-8 text-right">{skill.proficiency}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.proficiency}
                      onChange={(e) => handleUpdateSkillProficiency(catIndex, skillIndex, parseInt(e.target.value))}
                      className="w-16"
                    />
                    <button
                      onClick={() => handleDeleteSkill(catIndex, skillIndex)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
