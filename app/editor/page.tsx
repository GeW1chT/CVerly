"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Save, 
  Eye, 
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// Type definitions
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

interface CVData {
  id: string;
  name: string;
  template: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

// CV verilerini yükleme fonksiyonu
const getCVData = (id: string): CVData | null => {
  const cvDatabase: Record<string, CVData> = {
    '1': {
      id: '1',
      name: 'Yazılım Geliştirici CV',
      template: 'Modern',
      personalInfo: {
        name: 'Ahmet Yılmaz',
        email: 'ahmet.yilmaz@email.com',
        phone: '+90 555 123 4567',
        location: 'İstanbul, Türkiye',
        linkedin: 'linkedin.com/in/ahmetyilmaz',
        github: 'github.com/ahmetyilmaz'
      },
      summary: 'Deneyimli Full Stack Developer. React, Node.js ve Python teknolojilerinde uzman. 5+ yıllık deneyim.',
      experience: [
        {
          id: '1',
          title: 'Senior Software Developer',
          company: 'TechCorp',
          period: '2022 - Günümüz',
          description: 'Web uygulamaları geliştirme, takım liderliği ve mentoring'
        },
        {
          id: '2',
          title: 'Software Developer',
          company: 'StartupX',
          period: '2020 - 2022',
          description: 'React ve Node.js ile e-ticaret platformu geliştirme'
        }
      ],
      education: [
        {
          id: '1',
          degree: 'Bilgisayar Mühendisliği',
          school: 'İstanbul Teknik Üniversitesi',
          period: '2016 - 2020'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS']
    }
  };
  
  return cvDatabase[id] || null;
};

const getEmptyCV = (): CVData => ({
  id: '',
  name: 'Yeni CV',
  template: 'Modern',
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: []
});

// Ana CV Editor Componenti
function CVEditorContent() {
  const searchParams = useSearchParams();
  const cvId = searchParams?.get('cv');
  
  const [cvData, setCvData] = useState<CVData>(() => {
    if (cvId) {
      return getCVData(cvId) || getEmptyCV();
    }
    return getEmptyCV();
  });

  const [isEditing] = useState(!!cvId);
  const [isSaving, setIsSaving] = useState(false);

  // Kişisel bilgi güncelleme
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Deneyim ekleme
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      period: '',
      description: ''
    };
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  // Deneyim silme
  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Deneyim güncelleme
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Eğitim ekleme
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      period: ''
    };
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  // Eğitim silme
  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Eğitim güncelleme
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // Yetenek ekleme
  const addSkill = () => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  // Yetenek güncelleme
  const updateSkill = (index: number, value: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  // Yetenek silme
  const removeSkill = (index: number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simüle edilmiş kaydetme işlemi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // CV verilerini local storage'a kaydet (gerçek uygulamada API'ye gönderilir)
      const savedCVs = JSON.parse(localStorage.getItem('savedCVs') || '{}');
      
      // CV ID yoksa yeni ID oluştur
      if (!cvData.id) {
        cvData.id = Date.now().toString();
      }
      
      // CV'yi kaydet
      savedCVs[cvData.id] = {
        ...cvData,
        lastModified: new Date().toISOString(),
        updatedAt: new Date().toLocaleString('tr-TR')
      };
      
      localStorage.setItem('savedCVs', JSON.stringify(savedCVs));
      
      // Başarı bildirimi
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        font-weight: 600;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease-out;
      `;
      
      notification.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        CV başarıyla kaydedildi!
      `;
      
      document.body.appendChild(notification);
      
      // Bildirimi 3 saniye sonra kaldır
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
      
    } catch {
      // Hata bildirimi
      alert('CV kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (cvData.id) {
      window.open(`/cv-preview/${cvData.id}`, '_blank');
    } else {
      alert('Önizleme için önce CV&apos;yi kaydedin.');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-16 16-16 16 0s-16 16-16 0zm16 0c0-16 16-16 16 0s-16 16-16 0z"/%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.1
      }} />
      
      {/* Header */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)', 
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link href="/dashboard" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                background: 'rgba(107, 114, 128, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                Dashboard&apos;a Dön
              </Link>
              
              <div style={{ height: '2rem', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
              
              <div>
                <h1 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '700', 
                  color: '#1f2937',
                  margin: 0 
                }}>
                  {isEditing ? `${cvData.name} - Düzenle` : 'Yeni CV Oluştur'}
                </h1>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  margin: '0.25rem 0 0 0',
                  fontWeight: '500'
                }}>
                  {cvData.template} şablonunu kullanıyorsunuz
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={handlePreview}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid transparent',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#667eea',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Eye style={{ width: '1.125rem', height: '1.125rem' }} />
                Önizleme
              </button>
              
              <button 
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  background: isSaving ? 'rgba(156, 163, 175, 0.8)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'white',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
              >
                <Save style={{ 
                  width: '1.125rem', 
                  height: '1.125rem',
                  animation: isSaving ? 'spin 1s linear infinite' : 'none'
                }} />
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Personal Info Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '0 20px 0 100px'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              <User style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                margin: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                Kişisel Bilgiler
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontWeight: '500'
              }}>
                Temel bilgilerinizi girin
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <User style={{ width: '1rem', height: '1rem' }} />
                Ad Soyad
              </label>
              <input
                type="text"
                value={cvData.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                placeholder="Adınızı ve soyadınızı girin"
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
                E-posta
              </label>
              <input
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                placeholder="email@örnek.com"
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
                Telefon
              </label>
              <input
                type="tel"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                placeholder="+90 555 123 4567"
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <MapPin style={{ width: '1rem', height: '1rem' }} />
                Konum
              </label>
              <input
                type="text"
                value={cvData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                placeholder="İstanbul, Türkiye"
              />
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ 
              display: 'block',
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '0.75rem'
            }}>
              Profesyonel Özet
            </label>
            <textarea
              value={cvData.summary}
              onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
              style={{
                width: '100%',
                padding: '1.25rem',
                border: '2px solid transparent',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: 'rgba(249, 250, 251, 0.8)',
                minHeight: '120px',
                resize: 'vertical',
                transition: 'all 0.3s ease',
                outline: 'none',
                lineHeight: '1.6'
              }}
              placeholder="Kendinizi, yeteneklerinizi ve kariyer hedeflerinizi kısaca tanıtın..."
            />
          </div>
        </div>

        {/* Experience Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <Briefcase style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: 0 
                }}>
                  İş Deneyimi
                </h2>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  margin: '0.25rem 0 0 0',
                  fontWeight: '500'
                }}>
                  Profesyonel geçmişinizi ekleyin
                </p>
              </div>
            </div>
            <button
              onClick={addExperience}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
            >
              <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
              Deneyim Ekle
            </button>
          </div>
          
          {cvData.experience.map((exp, index) => (
            <div key={exp.id} style={{ 
              border: '2px solid rgba(229, 231, 235, 0.8)', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '1.5rem',
              background: 'rgba(249, 250, 251, 0.5)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%'
                  }} />
                  Deneyim {index + 1}
                </h3>
                <button
                  onClick={() => removeExperience(exp.id)}
                  style={{
                    padding: '0.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '50%',
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Trash2 style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  placeholder="Pozisyon"
                  style={{
                    padding: '0.875rem',
                    border: '2px solid transparent',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Şirket"
                  style={{
                    padding: '0.875rem',
                    border: '2px solid transparent',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
              </div>
              
              <input
                type="text"
                value={exp.period}
                onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                placeholder="Çalışma Dönemi (örn: 2020 - 2023)"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid transparent',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Görev ve sorumluluklar..."
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid transparent',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.8)',
                  minHeight: '100px',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  lineHeight: '1.5'
                }}
              />
            </div>
          ))}
          
          {cvData.experience.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 2rem',
              background: 'rgba(249, 250, 251, 0.5)',
              borderRadius: '16px',
              border: '2px dashed rgba(156, 163, 175, 0.3)'
            }}>
              <Briefcase style={{ 
                width: '3rem', 
                height: '3rem', 
                color: '#9ca3af', 
                margin: '0 auto 1rem'
              }} />
              <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '500' }}>
                Henüz iş deneyimi eklenmedi
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                &quot;Deneyim Ekle&quot; butonuna tıklayarak başlayın
              </p>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
              }}>
                <GraduationCap style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: 0 
                }}>
                  Eğitim
                </h2>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  margin: '0.25rem 0 0 0',
                  fontWeight: '500'
                }}>
                  Akademik geçmişinizi ekleyin
                </p>
              </div>
            </div>
            <button
              onClick={addEducation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
              }}
            >
              <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
              Eğitim Ekle
            </button>
          </div>
          
          {cvData.education.map((edu, index) => (
            <div key={edu.id} style={{ 
              border: '2px solid rgba(229, 231, 235, 0.8)', 
              borderRadius: '16px', 
              padding: '2rem', 
              marginBottom: '1.5rem',
              background: 'rgba(249, 250, 251, 0.5)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#f59e0b',
                    borderRadius: '50%'
                  }} />
                  Eğitim {index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  style={{
                    padding: '0.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '50%',
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Trash2 style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bölüm/Derece"
                  style={{
                    padding: '0.875rem',
                    border: '2px solid transparent',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                  placeholder="2020 - 2024"
                  style={{
                    padding: '0.875rem',
                    border: '2px solid transparent',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
              </div>
              
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                placeholder="Okul/Üniversite Adı"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid transparent',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.8)',
                  marginTop: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>
          ))}
          
          {cvData.education.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 2rem',
              background: 'rgba(249, 250, 251, 0.5)',
              borderRadius: '16px',
              border: '2px dashed rgba(156, 163, 175, 0.3)'
            }}>
              <GraduationCap style={{ 
                width: '3rem', 
                height: '3rem', 
                color: '#9ca3af', 
                margin: '0 auto 1rem'
              }} />
              <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '500' }}>
                Henüz eğitim bilgisi eklenmedi
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                &quot;Eğitim Ekle&quot; butonuna tıklayarak başlayın
              </p>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}>
                <Award style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: 0 
                }}>
                  Yetenekler
                </h2>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  margin: '0.25rem 0 0 0',
                  fontWeight: '500'
                }}>
                  Sahip olduğunuz becerileri ekleyin
                </p>
              </div>
            </div>
            <button
              onClick={addSkill}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
              }}
            >
              <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
              Yetenek Ekle
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {cvData.skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="Yetenek adı"
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    border: '2px solid transparent',
                    borderRadius: '50px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: 'rgba(249, 250, 251, 0.8)',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => removeSkill(index)}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '50%',
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Trash2 style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            ))}
          </div>
          
          {cvData.skills.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 2rem',
              background: 'rgba(249, 250, 251, 0.5)',
              borderRadius: '16px',
              border: '2px dashed rgba(156, 163, 175, 0.3)'
            }}>
              <Award style={{ 
                width: '3rem', 
                height: '3rem', 
                color: '#9ca3af', 
                margin: '0 auto 1rem'
              }} />
              <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '500' }}>
                Henüz yetenek eklenmedi
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                &quot;Yetenek Ekle&quot; butonuna tıklayarak başlayın
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(100%); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideOut {
          from { 
            opacity: 1; 
            transform: translateX(0); 
          }
          to { 
            opacity: 0; 
            transform: translateX(100%); 
          }
        }
      `}</style>
    </div>
  );
}

// Loading Component
function EditorLoading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '2rem',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <p style={{ 
          color: '#6b7280', 
          fontWeight: '500',
          margin: 0
        }}>
          CV Editörü yükleniyor...
        </p>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Ana Export Component - Suspense ile sarmalı
export default function CVEditor() {
  return (
    <Suspense fallback={<EditorLoading />}>
      <CVEditorContent />
    </Suspense>
  );
}