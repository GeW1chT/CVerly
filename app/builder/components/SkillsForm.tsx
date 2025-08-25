"use client"

import React, { useState } from 'react';
import { Plus, X, Star, Award, Code, Palette, BarChart3, Users, MessageCircle, Globe, Wrench } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 (1=Başlangıç, 5=Uzman)
  category: string;
}

interface SkillsFormProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

export default function SkillsForm({ skills = [], onUpdate }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState('Programlama');

  const categories = [
    { name: 'Programlama', icon: Code, color: '#3b82f6' },
    { name: 'Tasarım', icon: Palette, color: '#f59e0b' },
    { name: 'Pazarlama', icon: BarChart3, color: '#10b981' },
    { name: 'Yönetim', icon: Users, color: '#8b5cf6' },
    { name: 'İletişim', icon: MessageCircle, color: '#ef4444' },
    { name: 'Dil', icon: Globe, color: '#06b6d4' },
    { name: 'Teknik', icon: Wrench, color: '#f97316' },
    { name: 'Diğer', icon: Award, color: '#6b7280' }
  ];

  const levelNames = {
    1: 'Başlangıç',
    2: 'Temel',
    3: 'Orta',
    4: 'İleri',
    5: 'Uzman'
  };

  const levelColors = {
    1: '#ef4444',
    2: '#f97316',
    3: '#f59e0b',
    4: '#10b981',
    5: '#059669'
  };

  const popularSkills = {
    'Programlama': ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C#', 'PHP'],
    'Tasarım': ['Photoshop', 'Illustrator', 'Figma', 'Sketch', 'Adobe XD', 'InDesign', 'UI/UX', '3D Modeling'],
    'Pazarlama': ['SEO', 'Google Analytics', 'Social Media', 'Content Marketing', 'Email Marketing', 'PPC', 'Brand Management'],
    'Yönetim': ['Proje Yönetimi', 'Takım Liderliği', 'Scrum', 'Agile', 'Stratejik Planlama', 'Risk Yönetimi'],
    'İletişim': ['Sunum', 'Yazma', 'Müzakere', 'Public Speaking', 'Copywriting', 'Çeviri'],
    'Dil': ['İngilizce', 'Almanca', 'Fransızca', 'İspanyolca', 'Çince', 'Japonca', 'Rusça'],
    'Teknik': ['Excel', 'SQL', 'AutoCAD', 'Power BI', 'Tableau', 'MATLAB', 'R', 'Machine Learning'],
    'Diğer': ['Müzik', 'Fotoğrafçılık', 'Yoga', 'Spor', 'Cooking', 'Writing']
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
        level: selectedLevel,
        category: selectedCategory
      };
      
      onUpdate([...skills, skill]);
      setNewSkill('');
      setSelectedLevel(3);
    }
  };

  const addPopularSkill = (skillName: string) => {
    if (!skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: skillName,
        level: 3,
        category: selectedCategory
      };
      onUpdate([...skills, skill]);
    }
  };

  const removeSkill = (id: string) => {
    onUpdate(skills.filter(skill => skill.id !== id));
  };

  const updateSkillLevel = (id: string, level: number) => {
    onUpdate(skills.map(skill => 
      skill.id === id ? { ...skill, level } : skill
    ));
  };

  const renderStars = (level: number, skillId?: string) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        style={{
          width: '1rem',
          height: '1rem',
          cursor: skillId ? 'pointer' : 'default',
          color: index < level ? levelColors[level as keyof typeof levelColors] : '#e5e7eb',
          fill: index < level ? levelColors[level as keyof typeof levelColors] : '#e5e7eb',
          transition: 'all 0.2s'
        }}
        onClick={skillId ? () => updateSkillLevel(skillId, index + 1) : undefined}
        onMouseEnter={skillId ? (e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        } : undefined}
        onMouseLeave={skillId ? (e) => {
          e.currentTarget.style.transform = 'scale(1)';
        } : undefined}
      />
    ));
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    if (!category) return Award;
    return category.icon;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#6b7280';
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Award style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} />
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            Beceriler & Yetenekler
          </h3>
        </div>
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          Profesyonel becerilerinizi ve seviyelerinizi ekleyerek CV&apos;nizde öne çıkın
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  border: `1px solid ${isSelected ? category.color : '#d1d5db'}`,
                  background: isSelected ? `${category.color}10` : 'white',
                  color: isSelected ? category.color : '#6b7280',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = category.color;
                    e.currentTarget.style.color = category.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                <Icon style={{ width: '1rem', height: '1rem' }} />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Skills */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h5 style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.75rem'
        }}>
          Popüler {selectedCategory} Becerileri:
        </h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {popularSkills[selectedCategory as keyof typeof popularSkills]?.map((skill) => {
            const isAdded = skills.some(s => s.name.toLowerCase() === skill.toLowerCase());
            return (
              <button
                key={skill}
                onClick={() => addPopularSkill(skill)}
                disabled={isAdded}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: isAdded ? '#e5e7eb' : 'white',
                  border: `1px solid ${isAdded ? '#d1d5db' : getCategoryColor(selectedCategory)}`,
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  color: isAdded ? '#6b7280' : getCategoryColor(selectedCategory),
                  cursor: isAdded ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {isAdded ? '✓ ' : '+ '}{skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add New Skill */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto',
          gap: '1rem',
          alignItems: 'end',
          marginBottom: '1rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Özel Beceri Ekle
            </label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder={`Örn: ${popularSkills[selectedCategory as keyof typeof popularSkills]?.[0] || 'Beceri adı'}`}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
          </div>

          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              background: newSkill.trim() ? getCategoryColor(selectedCategory) : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: newSkill.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <Plus style={{ width: '1rem', height: '1rem' }} />
            Ekle
          </button>
        </div>

        {/* Level Selection */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Seviye: <span style={{ color: levelColors[selectedLevel as keyof typeof levelColors] }}>
              {levelNames[selectedLevel as keyof typeof levelNames]}
            </span>
          </label>
          <div style={{ 
            display: 'flex', 
            gap: '0.25rem',
            marginBottom: '0.5rem'
          }}>
            {renderStars(selectedLevel)}
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
            style={{
              width: '200px',
              accentColor: levelColors[selectedLevel as keyof typeof levelColors]
            }}
          />
        </div>
      </div>

      {/* Skills List by Category */}
      {Object.keys(skillsByCategory).length > 0 && (
        <div>
          <h4 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Eklenen Beceriler ({skills.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {Object.entries(skillsByCategory).map(([categoryName, categorySkills]) => {
              const Icon = getCategoryIcon(categoryName);
              const color = getCategoryColor(categoryName);
              
              return (
                <div key={categoryName}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <Icon style={{ width: '1.25rem', height: '1.25rem', color }} />
                    <h5 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {categoryName} ({categorySkills.length})
                    </h5>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gap: '0.75rem'
                  }}>
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        style={{
                          background: '#fff',
                          border: `1px solid ${color}20`,
                          borderLeft: `4px solid ${color}`,
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h6 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginBottom: '0.5rem'
                          }}>
                            {skill.name}
                          </h6>
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                          }}>
                            <div style={{ display: 'flex', gap: '0.125rem' }}>
                              {renderStars(skill.level, skill.id)}
                            </div>
                            <span style={{
                              fontSize: '0.875rem',
                              color: levelColors[skill.level as keyof typeof levelColors],
                              fontWeight: '600'
                            }}>
                              {levelNames[skill.level as keyof typeof levelNames]}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeSkill(skill.id)}
                          style={{
                            padding: '0.5rem',
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                          }}
                        >
                          <X style={{ width: '1.25rem', height: '1.25rem' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#6b7280'
        }}>
          <Award style={{ 
            width: '4rem', 
            height: '4rem', 
            margin: '0 auto 1rem',
            color: '#d1d5db'
          }} />
          <h4 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: '#374151'
          }}>
            Henüz beceri eklenmemiş
          </h4>
          <p style={{ fontSize: '0.875rem' }}>
            Popüler beceriler listesinden seçim yapın veya kendi becerinizi ekleyin
          </p>
        </div>
      )}
    </div>
  );
}