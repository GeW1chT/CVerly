// app/cv-preview/[id]/page.tsx
"use client"

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  Edit3, 
  Eye,
  FileText
} from 'lucide-react';

// CV verilerini simulate ediyoruz - normalde API'den gelecek
const getCVData = (id: string) => {
  const cvDatabase = {
    '1': {
      id: '1',
      name: 'Yazılım Geliştirici CV',
      template: 'Modern',
      lastModified: '2 gün önce',
      status: 'Tamamlandı',
      views: 24,
      data: {
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
            title: 'Senior Software Developer',
            company: 'TechCorp',
            period: '2022 - Günümüz',
            description: 'Web uygulamaları geliştirme, takım liderliği ve mentoring'
          },
          {
            title: 'Software Developer',
            company: 'StartupX',
            period: '2020 - 2022',
            description: 'React ve Node.js ile e-ticaret platformu geliştirme'
          }
        ],
        education: [
          {
            degree: 'Bilgisayar Mühendisliği',
            school: 'İstanbul Teknik Üniversitesi',
            period: '2016 - 2020'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS']
      }
    },
    '2': {
      id: '2',
      name: 'Pazarlama Uzmanı CV',
      template: 'Creative',
      lastModified: '1 hafta önce',
      status: 'Taslak',
      views: 8,
      data: {
        personalInfo: {
          name: 'Ayşe Demir',
          email: 'ayse.demir@email.com',
          phone: '+90 555 987 6543',
          location: 'Ankara, Türkiye',
          linkedin: 'linkedin.com/in/aysedemir'
        },
        summary: 'Dijital pazarlama uzmanı. SEO, SEM ve sosyal medya pazarlamada 4+ yıl deneyim.',
        experience: [
          {
            title: 'Pazarlama Uzmanı',
            company: 'Digital Agency',
            period: '2021 - Günümüz',
            description: 'Dijital kampanya yönetimi ve sosyal medya stratejileri'
          }
        ],
        education: [
          {
            degree: 'İşletme',
            school: 'Ankara Üniversitesi',
            period: '2017 - 2021'
          }
        ],
        skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Content Marketing']
      }
    },
    '3': {
      id: '3',
      name: 'Proje Yöneticisi CV',
      template: 'Professional',
      lastModified: '3 hafta önce',
      status: 'Tamamlandı',
      views: 156,
      data: {
        personalInfo: {
          name: 'Mehmet Özkan',
          email: 'mehmet.ozkan@email.com',
          phone: '+90 555 456 7890',
          location: 'İzmir, Türkiye',
          linkedin: 'linkedin.com/in/mehmetozkan'
        },
        summary: 'PMP sertifikalı proje yöneticisi. Agile/Scrum metodolojileri ile 8+ yıl deneyim.',
        experience: [
          {
            title: 'Senior Proje Yöneticisi',
            company: 'GlobalTech',
            period: '2020 - Günümüz',
            description: 'Büyük ölçekli yazılım projelerinin yönetimi ve koordinasyonu'
          }
        ],
        education: [
          {
            degree: 'Endüstri Mühendisliği',
            school: 'Ege Üniversitesi',
            period: '2012 - 2016'
          }
        ],
        skills: ['Project Management', 'Agile', 'Scrum', 'JIRA', 'Microsoft Project', 'Risk Management']
      }
    }
  };
  
  return cvDatabase[id as keyof typeof cvDatabase] || null;
};

export default function CVPreview({ params }: { params: { id: string } }) {
  const cv = getCVData(params.id);
  
  if (!cv) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <FileText style={{ width: '4rem', height: '4rem', color: '#9ca3af', margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>CV Bulunamadı</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Aradığınız CV mevcut değil.</p>
          <Link href="/dashboard" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
            Dashboard&apos;a Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // PDF indirme simülasyonu
    const element = document.createElement('a');
    const file = new Blob([`${cv.data.personalInfo.name} - CV`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${cv.data.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('CV başarıyla indirildi!');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/dashboard" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}>
                <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                Dashboard&apos;a Dön
              </Link>
              <div style={{ width: '1px', height: '1.5rem', backgroundColor: '#e5e7eb' }} />
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>{cv.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  <span>{cv.template} Şablon</span>
                  <span>•</span>
                  <span>{cv.lastModified}</span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Eye style={{ width: '0.875rem', height: '0.875rem' }} />
                    {cv.views} görüntüleme
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => window.location.href = `/editor?cv=${cv.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  cursor: 'pointer'
                }}
              >
                <Edit3 style={{ width: '1rem', height: '1rem' }} />
                Düzenle
              </button>
              
              <button 
                onClick={handleDownload}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3b82f6',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <Download style={{ width: '1rem', height: '1rem' }} />
                PDF İndir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '3rem',
          minHeight: '800px'
        }}>
          {/* Personal Info */}
          <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '2rem' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {cv.data.personalInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
              {cv.data.personalInfo.name}
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1rem' }}>
              {cv.data.summary}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <span>📧 {cv.data.personalInfo.email}</span>
              <span>📱 {cv.data.personalInfo.phone}</span>
              <span>📍 {cv.data.personalInfo.location}</span>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
              Deneyim
            </h2>
            {cv.data.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '2rem', paddingLeft: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                  {exp.title}
                </h3>
                <div style={{ fontSize: '1rem', color: '#3b82f6', fontWeight: '500', marginBottom: '0.5rem' }}>
                  {exp.company} • {exp.period}
                </div>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
              Eğitim
            </h2>
            {cv.data.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                  {edu.degree}
                </h3>
                <div style={{ fontSize: '1rem', color: '#3b82f6', fontWeight: '500' }}>
                  {edu.school} • {edu.period}
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
              Yetenekler
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingLeft: '1rem' }}>
              {cv.data.skills.map((skill, index) => (
                <span key={index} style={{
                  backgroundColor: '#eff6ff',
                  color: '#1d4ed8',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid #bfdbfe'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}