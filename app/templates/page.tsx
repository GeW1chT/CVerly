// app/templates/page.tsx - Genişletilmiş
"use client"

import React from 'react';
import Link from 'next/link';
import { FileText, Star, Crown, Users } from 'lucide-react';

// Import all template components
import ModernTemplate from '../../components/templates/ModernTemplate';
import ClassicTemplate from '../../components/templates/ClassicTemplate';
import CreativeTemplate from '../../components/templates/CreativeTemplate';
import ExecutiveTemplate from '../../components/templates/ExecutiveTemplate';
import AcademicTemplate from '../../components/templates/AcademicTemplate';
import StartupTemplate from '../../components/templates/StartupTemplate';

// New template imports
import ModernTechTemplate from '../../components/templates/ModernTechTemplate';
import CreativeDesignerTemplate from '../../components/templates/CreativeDesignerTemplate';
import ExecutiveCEOTemplate from '../../components/templates/ExecutiveCEOTemplate';
import FinanceProTemplate from '../../components/templates/FinanceProTemplate';
import HealthcareProTemplate from '../../components/templates/HealthcareProTemplate';
import ConsultingProTemplate from '../../components/templates/ConsultingProTemplate';
import SalesProTemplate from '../../components/templates/SalesProTemplate';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  cardContent: {
    padding: '1.5rem'
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  btnPrimary: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#374151',
    border: '1px solid #d1d5db'
  },
  btnLg: {
    padding: '1rem 2rem',
    fontSize: '1rem'
  }
};

export default function TemplatesPage() {
  const templates = [
    // ÜCRETSIZ ŞABLONLAR
    {
      id: 'modern',
      name: 'Modern Minimalist',
      description: 'Temiz ve minimal tasarım. Tech sektörü için ideal.',
      category: 'Modern',
      isPremium: false,
      rating: 4.8,
      usageCount: 2500,
      component: 'modern'
    },
    {
      id: 'classic',
      name: 'Classic Professional',
      description: 'Geleneksel ve güvenilir görünüm. Kurumsal sektör için.',
      category: 'Classic',
      isPremium: false,
      rating: 4.7,
      usageCount: 1800,
      component: 'classic'
    },
    {
      id: 'simple-clean',
      name: 'Simple Clean',
      description: 'Sade ve okunması kolay tasarım. Her sektör için uygun.',
      category: 'Modern',
      isPremium: false,
      rating: 4.6,
      usageCount: 3200,
      component: 'modern'
    },
    
    // PREMIUM ŞABLONLAR - Modern
    {
      id: 'modern-tech',
      name: 'Modern Tech Pro',
      description: 'Yazılım ve teknoloji profesyonelleri için özel tasarım.',
      category: 'Modern',
      isPremium: true,
      rating: 4.9,
      usageCount: 1200,
      component: 'modern-tech'
    },
    {
      id: 'startup',
      name: 'Startup Dynamo',
      description: 'Genç ve dinamik startup ekipleri için.',
      category: 'Modern',
      isPremium: true,
      rating: 4.7,
      usageCount: 380,
      component: 'startup'
    },
    
    // PREMIUM ŞABLONLAR - Creative
    {
      id: 'creative',
      name: 'Creative Portfolio',
      description: 'Yaratıcı ve göz alıcı tasarım. Tasarım ve sanat alanları için.',
      category: 'Creative',
      isPremium: true,
      rating: 4.9,
      usageCount: 950,
      component: 'creative'
    },
    {
      id: 'creative-designer',
      name: 'Creative Designer Pro',
      description: 'Grafik tasarımcılar için portfolio odaklı CV.',
      category: 'Creative',
      isPremium: true,
      rating: 4.8,
      usageCount: 720,
      component: 'creative-designer'
    },
    
    // PREMIUM ŞABLONLAR - Executive
    {
      id: 'executive',
      name: 'Executive Elite',
      description: 'Üst düzey yöneticiler için prestijli tasarım.',
      category: 'Executive',
      isPremium: true,
      rating: 4.8,
      usageCount: 650,
      component: 'executive'
    },
    {
      id: 'executive-ceo',
      name: 'Executive CEO',
      description: 'C-level yöneticiler için özel tasarlanmış şablon.',
      category: 'Executive',
      isPremium: true,
      rating: 4.9,
      usageCount: 420,
      component: 'executive-ceo'
    },
    
    // PREMIUM ŞABLONLAR - Academic
    {
      id: 'academic',
      name: 'Academic Scholar',
      description: 'Akademik kariyer için özel tasarlanmış şablon.',
      category: 'Academic',
      isPremium: true,
      rating: 4.6,
      usageCount: 420,
      component: 'academic'
    },
    
    // PREMIUM ŞABLONLAR - Industry Specific
    {
      id: 'finance-pro',
      name: 'Finance Professional',
      description: 'Finans ve bankacılık sektörü için özel tasarım.',
      category: 'Industry',
      isPremium: true,
      rating: 4.8,
      usageCount: 640,
      component: 'finance-pro'
    },
    {
      id: 'healthcare-pro',
      name: 'Healthcare Professional',
      description: 'Sağlık sektörü çalışanları için.',
      category: 'Industry',
      isPremium: true,
      rating: 4.7,
      usageCount: 580,
      component: 'healthcare-pro'
    },
    {
      id: 'consulting-pro',
      name: 'Consulting Professional',
      description: 'Danışmanlık firmaları için premium tasarım.',
      category: 'Industry',
      isPremium: true,
      rating: 4.9,
      usageCount: 520,
      component: 'consulting-pro'
    },
    {
      id: 'sales-pro',
      name: 'Sales Professional',
      description: 'Satış ve pazarlama uzmanları için.',
      category: 'Industry',
      isPremium: true,
      rating: 4.6,
      usageCount: 750,
      component: 'sales-pro'
    }
  ];

  const categories = ['Hepsi', 'Modern', 'Classic', 'Creative', 'Executive', 'Academic', 'Industry'];
  const [selectedCategory, setSelectedCategory] = React.useState('Hepsi');

  const filteredTemplates = selectedCategory === 'Hepsi' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  // Template Component Renderer
  const renderTemplatePreview = (template: any) => {
    const props = { isPremium: template.isPremium };
    
    switch (template.component) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'executive':
        return <ExecutiveTemplate {...props} />;
      case 'academic':
        return <AcademicTemplate {...props} />;
      case 'startup':
        return <StartupTemplate {...props} />;
      case 'modern-tech':
        return <ModernTechTemplate {...props} />;
      case 'creative-designer':
        return <CreativeDesignerTemplate {...props} />;
      case 'executive-ceo':
        return <ExecutiveCEOTemplate {...props} />;
      case 'finance-pro':
        return <FinanceProTemplate {...props} />;
      case 'healthcare-pro':
        return <HealthcareProTemplate {...props} />;
      case 'consulting-pro':
        return <ConsultingProTemplate {...props} />;
      case 'sales-pro':
        return <SalesProTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  // Stats
  const freeCount = templates.filter(t => !t.isPremium).length;
  const premiumCount = templates.filter(t => t.isPremium).length;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0', backgroundColor: '#f8fafc' }}>
      <div style={styles.container}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            CV Şablonları
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280', 
            maxWidth: '42rem', 
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            {templates.length} farklı sektör ve pozisyon için özel tasarlanmış şablonlar. 
            {freeCount} ücretsiz, {premiumCount} premium şablon.
          </p>
          
          {/* Quick Stats */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{templates.length}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Toplam Şablon</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{freeCount}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ücretsiz</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{premiumCount}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Premium</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            padding: '0.25rem',
            background: '#f1f5f9',
            borderRadius: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedCategory === category ? '#2563eb' : 'transparent',
                  color: selectedCategory === category ? 'white' : '#4b5563'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.color = '#2563eb';
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.color = '#4b5563';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {category} ({category === 'Hepsi' ? templates.length : templates.filter(t => t.category === category).length})
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem', 
          marginBottom: '3rem' 
        }}>
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Template Preview */}
              <div style={{ 
                position: 'relative',
                height: '320px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '1rem'
              }}>
                {template.isPremium && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    zIndex: 10
                  }}>
                    <Crown size={12} />
                    PREMIUM
                  </div>
                )}
                
                {/* Template Component Preview */}
                <div style={{ 
                  transform: 'scale(0.6)',
                  transformOrigin: 'center center',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {renderTemplatePreview(template)}
                </div>
              </div>

              {/* Card Content */}
              <div style={styles.cardContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    {template.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                      {template.rating}
                    </span>
                  </div>
                </div>
                
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                  {template.description}
                </p>
                
                {/* Usage Stats */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1.5rem',
                  fontSize: '0.75rem',
                  color: '#9ca3af'
                }}>
                  <Users size={14} />
                  <span>{template.usageCount.toLocaleString()} kişi kullandı</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Link 
                    href={`/editor?template=${template.id}`} 
                    style={{
                      ...styles.btn,
                      ...styles.btnPrimary,
                      flex: 1,
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                    }}
                  >
                    <FileText size={16} />
                    {template.isPremium ? 'Premium ile Kullan' : 'Kullan'}
                  </Link>
                  <Link 
                    href={`/templates/preview/${template.id}`} 
                    style={{
                      ...styles.btn,
                      ...styles.btnOutline
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                  >
                    Önizleme
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          borderRadius: '1rem', 
          padding: '3rem 2rem',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
            Premium Şablonlarla Fark Yaratın
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9, margin: '0 0 2rem 0' }}>
            Sektöre özel tasarlanmış premium şablonlarla profesyonel CV'nizi oluşturun
          </p>
          <Link 
            href="/pricing" 
            style={{
              ...styles.btn,
              ...styles.btnLg,
              backgroundColor: 'white',
              color: '#667eea',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Crown size={20} />
            Premium'a Geçiş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}