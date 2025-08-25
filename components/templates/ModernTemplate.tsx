// components/templates/ModernTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

interface ModernTemplateProps {
  isPremium?: boolean;
}

export default function ModernTemplate({ isPremium = false }: ModernTemplateProps) {
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
        background: '#2563eb',
        color: 'white',
        padding: '12px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          margin: '0 auto 4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px'
        }}>👤</div>
        <div style={{ fontSize: '8px', fontWeight: 'bold', marginBottom: '2px' }}>
          Ahmet Yılmaz
        </div>
        <div style={{ fontSize: '6px', opacity: 0.9 }}>
          Frontend Developer
        </div>
        <div style={{ fontSize: '4px', marginTop: '4px', opacity: 0.8 }}>
          📧 ahmet@example.com<br />📱 +90 555 123 45 67
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '8px', fontSize: '5px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            marginBottom: '2px', 
            borderBottom: '0.5px solid #e5e7eb', 
            paddingBottom: '1px' 
          }}>
            HAKKIMDA
          </div>
          <div style={{ color: '#4b5563', fontSize: '4px' }}>
            5+ yıl deneyime sahip Frontend Developer. Modern web teknolojileri ile kullanıcı dostu arayüzler geliştiriyorum.
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            marginBottom: '2px', 
            borderBottom: '0.5px solid #e5e7eb', 
            paddingBottom: '1px' 
          }}>
            DENEYİM
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#1f2937' }}>
              Senior Frontend Developer
            </div>
            <div style={{ fontSize: '4px', color: '#6b7280' }}>
              TechCorp A.Ş. • 2022-2024
            </div>
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#1f2937' }}>
              Frontend Developer
            </div>
            <div style={{ fontSize: '4px', color: '#6b7280' }}>
              StartupXYZ • 2020-2022
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            marginBottom: '2px', 
            borderBottom: '0.5px solid #e5e7eb', 
            paddingBottom: '1px' 
          }}>
            EĞİTİM
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#1f2937' }}>
            Bilgisayar Mühendisliği
          </div>
          <div style={{ fontSize: '4px', color: '#6b7280' }}>
            İTÜ • 2016-2020
          </div>
        </div>
        
        <div>
          <div style={{ 
            fontSize: '6px', 
            fontWeight: 'bold', 
            color: '#2563eb', 
            marginBottom: '2px', 
            borderBottom: '0.5px solid #e5e7eb', 
            paddingBottom: '1px' 
          }}>
            YETENEKLER
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
            {['React', 'TypeScript', 'Vue.js', 'Node.js', 'CSS'].map((skill) => (
              <span key={skill} style={{
                background: '#eff6ff',
                color: '#2563eb',
                padding: '1px 3px',
                borderRadius: '2px',
                fontSize: '4px'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}