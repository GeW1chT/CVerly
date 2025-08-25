// components/templates/ClassicTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

interface ClassicTemplateProps {
  isPremium?: boolean;
}

export default function ClassicTemplate({ isPremium = false }: ClassicTemplateProps) {
  return (
    <div style={{
      width: '200px',
      height: '260px',
      background: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderRadius: '0.25rem',
      overflow: 'hidden',
      fontSize: '6px',
      lineHeight: '1.2',
      position: 'relative'
    }}>
      {isPremium && (
        <div style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          background: '#f59e0b',
          color: 'white',
          padding: '1px 4px',
          borderRadius: '2px',
          fontSize: '5px',
          fontWeight: '600',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '2px'
        }}>
          <Crown style={{ width: '6px', height: '6px' }} />
          PREMIUM
        </div>
      )}
      
      {/* Header */}
      <div style={{
        padding: '12px',
        textAlign: 'center',
        borderBottom: '2px solid #1e293b'
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '2px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          MEHMET DEMİR
        </div>
        <div style={{
          fontSize: '6px',
          color: '#6b7280',
          marginBottom: '4px',
          textTransform: 'uppercase'
        }}>
          Proje Yöneticisi
        </div>
        <div style={{
          fontSize: '4px',
          color: '#6b7280'
        }}>
          📧 mehmet@example.com | 📱 +90 555 987 65 43<br />
          🏢 LinkedIn: mehmetdemir | 📍 İstanbul, Türkiye
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '8px', fontSize: '5px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#1e293b', 
            marginBottom: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            ÖZET
          </div>
          <div style={{ color: '#4b5563', fontSize: '4px', lineHeight: '1.3' }}>
            10+ yıl deneyime sahip proje yöneticisi. Kurumsal projeler yönetiminde uzman, agile metodolojiler konusunda sertifikalı.
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#1e293b', 
            marginBottom: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            DENEYİM
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#1f2937' }}>
              Kıdemli Proje Yöneticisi
            </div>
            <div style={{ fontSize: '4px', color: '#6b7280' }}>
              ABC Holding | 2020-2024
            </div>
            <div style={{ fontSize: '4px', color: '#4b5563', marginTop: '1px' }}>
              • 50+ proje yönetimi<br />
              • 20 kişilik ekip liderliği
            </div>
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#1f2937' }}>
              Proje Yöneticisi
            </div>
            <div style={{ fontSize: '4px', color: '#6b7280' }}>
              XYZ Ltd. | 2016-2020
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#1e293b', 
            marginBottom: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            EĞİTİM
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#1f2937' }}>
            İşletme Yönetimi, Yüksek Lisans
          </div>
          <div style={{ fontSize: '4px', color: '#6b7280' }}>
            Boğaziçi Üniversitesi | 2014-2016
          </div>
        </div>
        
        <div>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#1e293b', 
            marginBottom: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            SERTİFİKALAR
          </div>
          <div style={{ fontSize: '4px', color: '#4b5563' }}>
            • PMP (Project Management Professional)<br />
            • Scrum Master Certified<br />
            • Six Sigma Green Belt
          </div>
        </div>
      </div>
    </div>
  );
}