// app/builder/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { User, Briefcase, GraduationCap, Eye, Award } from 'lucide-react';
import SkillsForm from './components/SkillsForm';
import SavedCVsManager from '@/components/SavedCVsManager';
import { CVStorage } from '@/lib/storage';

// CV Veri Yapısını Tanımlayan Interface'ler
interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  achievements: string;
}

interface Skill {
  name: string;
  level: number;
}

// CVStorage'ın beklediği ana CVData tipi
interface FullCVData {
  personalInfo: PersonalInfo | null;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  lastModified?: string;
  version?: string;
}

interface StepProps {
  data: any; // Bu alt bileşenler için şimdilik 'any' bırakıyorum, çünkü veri tipleri duruma göre değişiyor.
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PersonalInfoStep = ({ data, onUpdate, onNext }: Omit<StepProps, 'onPrev'>) => {
  const [formData, setFormData] = useState<PersonalInfo>(data || {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onNext();
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h2 className="card-title">
          <User style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
          Kişisel Bilgiler
        </h2>
        <p className="card-description">
          CV&apos;nizin temelini oluşturacak kişisel bilgilerinizi girin.
        </p>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="label">Ad *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Adınızı girin"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Soyad *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Soyadınızı girin"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="label">Başlık/Pozisyon *</label>
              <input
                type="text"
                className="input"
                placeholder="ör: Yazılım Geliştirici, Pazarlama Uzmanı"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="label">Email *</label>
                <input
                  type="email"
                  className="input"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Telefon *</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="+90 555 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Konum *</label>
              <input
                type="text"
                className="input"
                placeholder="İstanbul, Türkiye"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Kişisel Özet *</label>
              <textarea
                className="textarea"
                placeholder="Kendinizi ve kariyerinizi kısaca özetleyin..."
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                required
              />
              <div className="text-right text-sm text-gray-600" style={{ marginTop: '0.5rem' }}>
                {formData.summary?.length || 0}/500 karakter
              </div>
            </div>

            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Devam Et
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const ExperienceStep = ({ data, onUpdate, onNext, onPrev }: StepProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(data || []);
  const [currentExp, setCurrentExp] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: ''
  });

  const addExperience = () => {
    if (currentExp.company && currentExp.position) {
      setExperiences([...experiences, { ...currentExp, id: Date.now().toString() }]);
      setCurrentExp({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        location: ''
      });
    }
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_: Experience, i: number) => i !== index));
  };

  const handleNext = () => {
    onUpdate(experiences);
    onNext();
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h2 className="card-title">
          <Briefcase style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
          İş Deneyimi
        </h2>
        <p className="card-description">
          Çalışma geçmişinizi ve deneyimlerinizi ekleyin.
        </p>
      </div>
      <div className="card-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiences.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 className="text-lg font-semibold">Eklenen Deneyimler ({experiences.length})</h3>
              {experiences.map((exp: Experience, index: number) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <h4 className="experience-position">{exp.position}</h4>
                      <p className="experience-company">{exp.company} - {exp.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="experience-date">
                        {exp.startDate} - {exp.current ? 'Devam ediyor' : exp.endDate}
                      </p>
                      <button 
                        onClick={() => removeExperience(index)}
                        className="text-sm"
                        style={{ 
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          marginTop: '0.25rem'
                        }}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="experience-description" style={{ marginTop: '0.5rem' }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 className="text-lg font-semibold">Yeni Deneyim Ekle</h3>
            
            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="label">Şirket Adı</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Şirket adını girin"
                  value={currentExp.company}
                  onChange={(e) => setCurrentExp({...currentExp, company: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">Pozisyon</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Pozisyonunuzu girin"
                  value={currentExp.position}
                  onChange={(e) => setCurrentExp({...currentExp, position: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Konum</label>
              <input
                type="text"
                className="input"
                placeholder="İstanbul, Türkiye"
                value={currentExp.location}
                onChange={(e) => setCurrentExp({...currentExp, location: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="label">Başlangıç Tarihi</label>
                <input
                  type="month"
                  className="input"
                  value={currentExp.startDate}
                  onChange={(e) => setCurrentExp({...currentExp, startDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">Bitiş Tarihi</label>
                <input
                  type="month"
                  className="input"
                  value={currentExp.endDate}
                  onChange={(e) => setCurrentExp({...currentExp, endDate: e.target.value})}
                  disabled={currentExp.current}
                />
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="current"
                    checked={currentExp.current}
                    onChange={(e) => setCurrentExp({...currentExp, current: e.target.checked})}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <label htmlFor="current" className="text-sm">Hala bu pozisyonda çalışıyorum</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Açıklama</label>
              <textarea
                className="textarea"
                placeholder="Bu pozisyondaki sorumluluklarınızı ve başarılarınızı açıklayın..."
                value={currentExp.description}
                onChange={(e) => setCurrentExp({...currentExp, description: e.target.value})}
              />
            </div>

            <button 
              type="button" 
              onClick={addExperience}
              className="btn btn-outline"
              disabled={!currentExp.company || !currentExp.position}
              style={{ 
                alignSelf: 'flex-start',
                opacity: (!currentExp.company || !currentExp.position) ? 0.5 : 1 
              }}
            >
              + Deneyim Ekle
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            paddingTop: '1rem', 
            borderTop: '1px solid #e5e7eb',
            marginTop: '1rem'
          }}>
            <button onClick={onPrev} className="btn btn-outline">
              ← Geri
            </button>
            <button onClick={handleNext} className="btn btn-primary">
              Devam Et →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationStep = ({ data, onUpdate, onNext, onPrev }: StepProps) => {
  const [education, setEducation] = useState<Education[]>(data || []);
  const [currentEdu, setCurrentEdu] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    achievements: ''
  });

  const addEducation = () => {
    if (currentEdu.institution && currentEdu.degree) {
      setEducation([...education, { ...currentEdu, id: Date.now().toString() }]);
      setCurrentEdu({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        achievements: ''
      });
    }
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_: Education, i: number) => i !== index));
  };

  const handleNext = () => {
    onUpdate(education);
    onNext();
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h2 className="card-title">
          <GraduationCap style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
          Eğitim Bilgileri
        </h2>
        <p className="card-description">
          Eğitim geçmişinizi ve akademik başarılarınızı ekleyin.
        </p>
      </div>
      <div className="card-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {education.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 className="text-lg font-semibold">Eklenen Eğitimler ({education.length})</h3>
              {education.map((edu: Education, index: number) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <h4 className="experience-position">{edu.degree} {edu.field && `- ${edu.field}`}</h4>
                      <p className="experience-company">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right">
                      <p className="experience-date">
                        {edu.startDate} - {edu.current ? 'Devam ediyor' : edu.endDate}
                      </p>
                      <button 
                        onClick={() => removeEducation(index)}
                        className="text-sm"
                        style={{ 
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          marginTop: '0.25rem'
                        }}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                  {edu.achievements && (
                    <p className="experience-description" style={{ marginTop: '0.5rem' }}>
                      {edu.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 className="text-lg font-semibold">Yeni Eğitim Ekle</h3>
            
            <div className="form-group">
              <label className="label">Okul/Üniversite Adı *</label>
              <input
                type="text"
                className="input"
                placeholder="ör: İstanbul Teknik Üniversitesi"
                value={currentEdu.institution}
                onChange={(e) => setCurrentEdu({...currentEdu, institution: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="label">Derece *</label>
                <select
                  className="input"
                  value={currentEdu.degree}
                  onChange={(e) => setCurrentEdu({...currentEdu, degree: e.target.value})}
                >
                  <option value="">Derece seçin</option>
                  <option value="Lise Diploması">Lise Diploması</option>
                  <option value="Ön Lisans">Ön Lisans</option>
                  <option value="Lisans">Lisans</option>
                  <option value="Yüksek Lisans">Yüksek Lisans</option>
                  <option value="Doktora">Doktora</option>
                  <option value="MBA">MBA</option>
                  <option value="Sertifika">Sertifika</option>
                </select>
              </div>
              <div className="form-group">
                <label className="label">Alan/Bölüm</label>
                <input
                  type="text"
                  className="input"
                  placeholder="ör: Bilgisayar Mühendisliği"
                  value={currentEdu.field}
                  onChange={(e) => setCurrentEdu({...currentEdu, field: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div className="form-group">
                <label className="label">Başlangıç Tarihi</label>
                <input
                  type="month"
                  className="input"
                  value={currentEdu.startDate}
                  onChange={(e) => setCurrentEdu({...currentEdu, startDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">Bitiş Tarihi</label>
                <input
                  type="month"
                  className="input"
                  value={currentEdu.endDate}
                  onChange={(e) => setCurrentEdu({...currentEdu, endDate: e.target.value})}
                  disabled={currentEdu.current}
                />
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="current-edu"
                    checked={currentEdu.current}
                    onChange={(e) => setCurrentEdu({...currentEdu, current: e.target.checked})}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <label htmlFor="current-edu" className="text-sm">Hala devam ediyor</label>
                </div>
              </div>
              <div className="form-group">
                <label className="label">GPA/Not Ortalaması</label>
                <input
                  type="text"
                  className="input"
                  placeholder="ör: 3.45/4.00"
                  value={currentEdu.gpa}
                  onChange={(e) => setCurrentEdu({...currentEdu, gpa: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Başarılar & Notlar</label>
              <textarea
                className="textarea"
                placeholder="Akademik başarılarınızı, ödüllerinizi, öne çıkan projelerinizi yazın..."
                value={currentEdu.achievements}
                onChange={(e) => setCurrentEdu({...currentEdu, achievements: e.target.value})}
                rows={3}
              />
            </div>

            <button 
              type="button" 
              onClick={addEducation}
              className="btn btn-outline"
              disabled={!currentEdu.institution || !currentEdu.degree}
              style={{ 
                alignSelf: 'flex-start',
                opacity: (!currentEdu.institution || !currentEdu.degree) ? 0.5 : 1 
              }}
            >
              Eğitim Ekle
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            paddingTop: '1rem', 
            borderTop: '1px solid #e5e7eb',
            marginTop: '1rem'
          }}>
            <button onClick={onPrev} className="btn btn-outline">
              ← Geri
            </button>
            <button onClick={handleNext} className="btn btn-primary">
              Devam Et →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsStep = ({ data, onUpdate, onNext, onPrev }: StepProps) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="animate-fade-in">
      <SkillsForm 
        skills={data || []}
        onUpdate={onUpdate}
      />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        maxWidth: '56rem',
        margin: '0 auto'
      }}>
        <button onClick={onPrev} className="btn btn-outline">
          ← Geri
        </button>
        <button onClick={handleNext} className="btn btn-primary">
          Devam Et →
        </button>
      </div>
    </div>
  );
};

const PreviewStep = ({ cvData, onPrev }: { cvData: FullCVData, onPrev: () => void }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      
      if (!cvData.personalInfo?.firstName || !cvData.personalInfo?.lastName) {
        alert('PDF oluşturmak için en az ad ve soyad bilgisi gereklidir.');
        return;
      }

      const generateSimplePDF = (cvData: FullCVData): void => {
        const { personalInfo, experience, education, skills } = cvData;
        
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>CV - ${personalInfo?.firstName} ${personalInfo?.lastName}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 20px;
                  color: #333;
                  max-width: 210mm;
                }
                .header {
                  text-align: center;
                  border-bottom: 2px solid #2563eb;
                  padding-bottom: 20px;
                  margin-bottom: 30px;
                }
                .name {
                  font-size: 28px;
                  font-weight: bold;
                  margin: 0;
                  color: #1e293b;
                }
                .title {
                  font-size: 18px;
                  color: #2563eb;
                  margin: 5px 0;
                }
                .contact {
                  font-size: 14px;
                  color: #64748b;
                }
                .section {
                  margin-bottom: 25px;
                }
                .section-title {
                  font-size: 16px;
                  font-weight: bold;
                  color: #1e293b;
                  border-bottom: 1px solid #e2e8f0;
                  padding-bottom: 5px;
                  margin-bottom: 15px;
                }
                .experience-item {
                  margin-bottom: 20px;
                  padding: 15px;
                  background: #f8fafc;
                  border-left: 3px solid #2563eb;
                }
                .experience-header {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                }
                .position {
                  font-weight: bold;
                  color: #1e293b;
                }
                .company {
                  color: #2563eb;
                  font-size: 14px;
                }
                .date {
                  font-size: 12px;
                  color: #64748b;
                }
                .description {
                  font-size: 14px;
                  color: #374151;
                  margin-top: 8px;
                }
                .skills-section {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 10px;
                  margin-top: 10px;
                }
                .skill-item {
                  background: #eff6ff;
                  color: #2563eb;
                  padding: 5px 10px;
                  border-radius: 15px;
                  font-size: 12px;
                  border: 1px solid #dbeafe;
                }
                .skill-level {
                  font-size: 10px;
                  opacity: 0.8;
                  margin-left: 5px;
                }
                @media print {
                  body { margin: 0; }
                  @page { margin: 1cm; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1 class="name">${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}</h1>
                <p class="title">${personalInfo?.title || ''}</p>
                <div class="contact">
                  <p>${personalInfo?.email || ''} | ${personalInfo?.phone || ''}</p>
                  <p>${personalInfo?.location || ''}</p>
                </div>
              </div>

              ${personalInfo?.summary ? `
                <div class="section">
                  <h2 class="section-title">ÖZET</h2>
                  <p>${personalInfo.summary}</p>
                </div>
              ` : ''}

              ${experience && experience.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">İŞ DENEYİMİ</h2>
                  ${experience.map((exp: Experience) => `
                    <div class="experience-item">
                      <div class="experience-header">
                        <div>
                          <div class="position">${exp.position || ''}</div>
                          <div class="company">${exp.company || ''} - ${exp.location || ''}</div>
                        </div>
                        <div class="date">
                          ${exp.startDate || ''} - ${exp.current ? 'Devam ediyor' : exp.endDate || ''}
                        </div>
                      </div>
                      ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${education && education.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">EĞİTİM</h2>
                  ${education.map((edu: Education) => `
                    <div class="experience-item">
                      <div class="experience-header">
                        <div>
                          <div class="position">${edu.degree || ''} ${edu.field ? `- ${edu.field}` : ''}</div>
                          <div class="company">${edu.institution || ''}</div>
                          ${edu.gpa ? `<div style="font-size: 12px; color: #64748b;">GPA: ${edu.gpa}</div>` : ''}
                        </div>
                        <div class="date">
                          ${edu.startDate || ''} - ${edu.current ? 'Devam ediyor' : edu.endDate || ''}
                        </div>
                      </div>
                      ${edu.achievements ? `<div class="description">${edu.achievements}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${skills && skills.length > 0 ? `
                <div class="section">
                  <h2 class="section-title">BECERİLER</h2>
                  <div class="skills-section">
                    ${skills.map((skill: any) => `
                      <div class="skill-item">
                        ${skill.name}
                        <span class="skill-level">${'★'.repeat(skill.level)}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #9ca3af;">
                Bu CV CVerly.com ile oluşturulmuştur
              </div>
            </body>
          </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(htmlContent);
          printWindow.document.close();
          
          setTimeout(() => {
            printWindow.print();
          }, 500);
        } else {
          alert('Popup engellendi. Lütfen tarayıcınızın popup ayarlarını kontrol edin.');
        }
      };

      generateSimplePDF(cvData);
      
      alert('CV\'niz başarıyla oluşturuldu! Açılan pencerede PDF olarak kaydet seçeneğini kullanın.');
      
    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      alert('PDF oluşturulamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h2 className="card-title">
          <Eye style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
          CV Önizleme
        </h2>
        <p className="card-description">
          CV&apos;nizin son halini kontrol edin ve PDF olarak indirin.
        </p>
      </div>
      <div className="card-content">
        <div className="cv-preview">
          {/* CV Preview Content */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            maxWidth: '21cm',
            margin: '0 auto',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Header */}
            <div style={{
              textAlign: 'center',
              borderBottom: '2px solid #2563eb',
              paddingBottom: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: '0',
                color: '#1e293b'
              }}>
                {cvData.personalInfo?.firstName || ''} {cvData.personalInfo?.lastName || ''}
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: '#2563eb',
                margin: '0.5rem 0'
              }}>
                {cvData.personalInfo?.title || ''}
              </p>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                <p style={{ margin: '0.25rem 0' }}>
                  {cvData.personalInfo?.email || ''} | {cvData.personalInfo?.phone || ''}
                </p>
                <p style={{ margin: '0.25rem 0' }}>
                  {cvData.personalInfo?.location || ''}
                </p>
              </div>
            </div>

            {/* Summary */}
            {cvData.personalInfo?.summary && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  ÖZET
                </h2>
                <p style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: '#374151'
                }}>
                  {cvData.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {cvData.experience && cvData.experience.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  İŞ DENEYİMİ
                </h2>
                {cvData.experience.map((exp: Experience, index: number) => (
                  <div key={index} style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderLeft: '3px solid #2563eb',
                    borderRadius: '0.25rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <div style={{
                          fontWeight: 'bold',
                          color: '#1e293b',
                          fontSize: '0.95rem'
                        }}>
                          {exp.position}
                        </div>
                        <div style={{
                          color: '#2563eb',
                          fontSize: '0.875rem'
                        }}>
                          {exp.company} - {exp.location}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#64748b'
                      }}>
                        {exp.startDate} - {exp.current ? 'Devam ediyor' : exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#374151',
                        marginTop: '0.5rem',
                        lineHeight: '1.5'
                      }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {cvData.education && cvData.education.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  EĞİTİM
                </h2>
                {cvData.education.map((edu: Education, index: number) => (
                  <div key={index} style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderLeft: '3px solid #2563eb',
                    borderRadius: '0.25rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <div style={{
                          fontWeight: 'bold',
                          color: '#1e293b',
                          fontSize: '0.95rem'
                        }}>
                          {edu.degree} {edu.field && `- ${edu.field}`}
                        </div>
                        <div style={{
                          color: '#2563eb',
                          fontSize: '0.875rem'
                        }}>
                          {edu.institution}
                        </div>
                        {edu.gpa && (
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#64748b'
                          }}>
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#64748b'
                      }}>
                        {edu.startDate} - {edu.current ? 'Devam ediyor' : edu.endDate}
                      </div>
                    </div>
                    {edu.achievements && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#374151',
                        marginTop: '0.5rem',
                        lineHeight: '1.5'
                      }}>
                        {edu.achievements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {cvData.skills && cvData.skills.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  BECERİLER
                </h2>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {cvData.skills.map((skill: Skill, index: number) => (
                    <div key={index} style={{
                      background: '#eff6ff',
                      color: '#2563eb',
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      border: '1px solid #dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {skill.name}
                      <span style={{
                        fontSize: '0.75rem',
                        opacity: 0.8
                      }}>
                        {'★'.repeat(skill.level)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              marginTop: '3rem',
              fontSize: '0.75rem',
              color: '#9ca3af'
            }}>
              Bu CV CVerly.com ile oluşturulmuştur
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button onClick={onPrev} className="btn btn-outline">
            ← Geri
          </button>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={downloadPDF}
              disabled={isGenerating}
              className="btn btn-primary"
              style={{
                opacity: isGenerating ? 0.7 : 1,
                cursor: isGenerating ? 'not-allowed' : 'pointer'
              }}
            >
              {isGenerating ? 'PDF Oluşturuluyor...' : '📄 PDF İndir'}
            </button>
          </div>
        </div>

        {/* Download Info */}
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '0.5rem',
          border: '1px solid #0ea5e9'
        }}>
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#0c4a6e',
            margin: '0 0 0.5rem 0'
          }}>
            PDF İndirme Hakkında
          </h4>
          <p style={{
            fontSize: '0.75rem',
            color: '#075985',
            margin: '0',
            lineHeight: '1.4'
          }}>
            PDF indir butonuna tıkladığınızda yeni bir pencere açılacak. Bu pencerede tarayıcınızın yazdırma özelliğini kullanarak PDF olarak kaydedebilirsiniz. Chrome&apos;da Ctrl+P (Windows) veya Cmd+P (Mac) tuşlarını kullanın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CVBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cvData, setCvData] = useState<FullCVData>({
    personalInfo: null,
    experience: [],
    education: [],
    skills: []
  });
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Component mount olduğunda otomatik kayıt ve son CV'yi kontrol et
  useEffect(() => {
    // Otomatik kaydedilen veri var mı kontrol et
    const autoSaved = CVStorage.getAutoSaved();
    
    // AutoSaved veri kontrolü - basitleştirilmiş
    const hasAutoSavedData = autoSaved && (
      autoSaved.personalInfo ||
      (autoSaved.experience && autoSaved.experience.length > 0) ||
      (autoSaved.education && autoSaved.education.length > 0) ||
      (autoSaved.skills && autoSaved.skills.length > 0)
    );
    
    if (hasAutoSavedData) {
      const shouldRestore = window.confirm(
        'Daha önce çalıştığınız bir CV taslağı bulundu. Kaldığınız yerden devam etmek ister misiniz?'
      );
      if (shouldRestore) {
        setCvData(autoSaved);
        CVStorage.clearAutoSave();
      }
    } else {
      // Son çalışılan CV'yi yükle
      const currentId = CVStorage.getCurrentCVId();
      if (currentId) {
        const savedData = CVStorage.loadCV(currentId);
        if (savedData) {
          setCvData(savedData);
          setCurrentCVId(currentId);
        }
      }
    }
  }, []);

  // CV verilerinde değişiklik olduğunda otomatik kaydet
  useEffect(() => {
    const hasData = cvData.personalInfo || 
                    (cvData.experience && cvData.experience.length > 0) || 
                    (cvData.education && cvData.education.length > 0) || 
                    (cvData.skills && cvData.skills.length > 0);
    
    if (hasData) {
      // Debounce ile 3 saniye sonra otomatik kaydet
      const timer = setTimeout(() => {
        // Hata çözümü: autoSave'e göndermeden önce gerekli alanları ekle
        const dataToSave = {
          ...cvData,
          lastModified: new Date().toISOString(),
          version: '1.0' // Uygulamanızın versiyon numarası olabilir
        };
        CVStorage.autoSave(dataToSave);
      }, 3000);

      setHasUnsavedChanges(true);
      return () => clearTimeout(timer);
    }
  }, [cvData]);

  // Sayfa kapatılırken uyarı
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Kaydedilmemiş değişiklikler var. Sayfayı kapatmak istediğinizden emin misiniz?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const steps = [
    { id: 'personal', title: 'Kişisel Bilgiler', icon: User },
    { id: 'experience', title: 'İş Deneyimi', icon: Briefcase },
    { id: 'education', title: 'Eğitim', icon: GraduationCap },
    { id: 'skills', title: 'Beceriler', icon: Award },
    { id: 'preview', title: 'Önizleme', icon: Eye }
  ];

  const updateCVData = (stepData: any, stepKey: string) => {
    setCvData({
      ...cvData,
      [stepKey]: stepData
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // CV yükleme handler
  const handleLoadCV = (data: any) => {
    setCvData(data);
    setCurrentStep(0); // İlk adıma dön
    setHasUnsavedChanges(false);
  };

  // CV kaydetme success handler
  const handleSaveSuccess = (id: string) => {
    setCurrentCVId(id);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="step">
                <div className={`step-icon ${isActive ? 'step-active' : isCompleted ? 'step-completed' : 'step-inactive'}`}>
                  <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                </div>
                <div>
                  <p className={`step-title ${isActive ? 'step-title-active' : isCompleted ? 'step-title-completed' : 'step-title-inactive'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`step-line ${isCompleted ? 'step-line-active' : 'step-line-inactive'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Save/Load Actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '56rem',
          margin: '2rem auto 1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {hasUnsavedChanges && (
              <div style={{
                padding: '0.5rem 1rem',
                background: '#fef3c7',
                color: '#92400e',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                border: '1px solid #fcd34d'
              }}>
                Kaydedilmemiş değişiklikler var
              </div>
            )}

            {currentCVId && (
              <div style={{
                padding: '0.5rem 1rem',
                background: '#d1fae5',
                color: '#065f46',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                border: '1px solid #6ee7b7'
              }}>
                Aktif CV yüklü
              </div>
            )}
          </div>

          <SavedCVsManager
            currentCVData={cvData}
            onLoadCV={handleLoadCV}
            onSaveSuccess={handleSaveSuccess}
          />
        </div>

        {/* Step Content */}
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          {currentStep === 0 && (
            <PersonalInfoStep
              data={cvData.personalInfo}
              onUpdate={(data: PersonalInfo) => updateCVData(data, 'personalInfo')}
              onNext={nextStep}
            />
          )}
          
          {currentStep === 1 && (
            <ExperienceStep
              data={cvData.experience}
              onUpdate={(data: Experience[]) => updateCVData(data, 'experience')}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {currentStep === 2 && (
            <EducationStep
              data={cvData.education}
              onUpdate={(data: Education[]) => updateCVData(data, 'education')}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 3 && (
            <SkillsStep
              data={cvData.skills}
              onUpdate={(data: Skill[]) => updateCVData(data, 'skills')}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          
          {currentStep === 4 && (
            <PreviewStep 
              cvData={cvData} 
              onPrev={prevStep}
            />
          )}
        </div>

        {/* Progress Indicator */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ 
            background: '#e5e7eb', 
            height: '4px', 
            borderRadius: '2px', 
            maxWidth: '24rem', 
            margin: '0 auto',
            overflow: 'hidden'
          }}>
            <div style={{ 
              background: '#2563eb', 
              height: '100%', 
              borderRadius: '2px',
              width: `${((currentStep + 1) / steps.length) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p className="text-sm text-gray-600" style={{ marginTop: '0.5rem' }}>
            Adım {currentStep + 1} / {steps.length}
          </p>
        </div>

        {/* Auto-save Status */}
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          zIndex: 50
        }}>
          Otomatik kaydetme aktif
        </div>

        {/* Tips Section - Updated for storage */}
        <div style={{ 
          maxWidth: '56rem', 
          margin: '2rem auto 0',
          padding: '1.5rem',
          background: '#eff6ff',
          borderRadius: '0.75rem',
          border: '1px solid #dbeafe'
        }}>
          <h3 className="font-semibold text-blue-900" style={{ marginBottom: '0.5rem' }}>
            Kaydetme İpuçları
          </h3>
          <div className="text-sm text-blue-800">
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
              <li>Verileriniz otomatik olarak her 3 saniyede kaydedilir</li>
              <li>Düzenli olarak &quot;Kaydet&quot; butonunu kullanarak manuel yedek alın</li>
              <li>CV&apos;lerinizi JSON formatında export edebilirsiniz</li>
              <li>Tarayıcı depolama alanınızı kontrol edin - %80&apos;in üzerinde uyarı verilir</li>
            </ul>
          </div>
        </div>

        {/* Updated Quick Stats */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          maxWidth: '56rem',
          margin: '2rem auto 0'
        }}>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div className="text-2xl font-bold text-blue-600">
              {cvData.personalInfo ? '✓' : '○'}
            </div>
            <div className="text-sm text-gray-600">Kişisel Bilgiler</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div className="text-2xl font-bold text-blue-600">
              {cvData.experience?.length || 0}
            </div>
            <div className="text-sm text-gray-600">İş Deneyimi</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div className="text-2xl font-bold text-blue-600">
              {cvData.education?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Eğitim</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div className="text-2xl font-bold text-blue-600">
              {cvData.skills?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Beceriler</div>
          </div>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div className="text-2xl font-bold text-green-600">
              {hasUnsavedChanges ? '●' : '✓'}
            </div>
            <div className="text-sm text-gray-600">
              {hasUnsavedChanges ? 'Değişiklikler Var' : 'Kaydedildi'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}