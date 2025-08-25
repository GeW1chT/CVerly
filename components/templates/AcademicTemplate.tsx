// components/templates/AcademicTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

interface AcademicTemplateProps {
  isPremium?: boolean;
}

export default function AcademicTemplate({ isPremium = false }: AcademicTemplateProps) {
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
      position: 'relative',
      border: '1px solid #d1fae5'
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
        background: '#059669',
        color: 'white',
        padding: '10px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '9px',
          fontWeight: 'bold',
          marginBottom: '2px'
        }}>
          Prof. Dr. Fatma YILDIZ
        </div>
        
        <div style={{
          fontSize: '6px',
          opacity: 0.9,
          marginBottom: '3px'
        }}>
          Bilgisayar Bilimleri Bölümü
        </div>
        
        <div style={{
          fontSize: '4px',
          opacity: 0.8,
          lineHeight: '1.3'
        }}>
          📧 f.yildiz@university.edu.tr<br />
          🏢 İTÜ Bilgisayar Bilimleri Fakültesi<br />
          📱 +90 212 285 xx xx | 🌐 scholar.google.com/fyildiz
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '8px', fontSize: '5px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '2px',
            borderBottom: '1px solid #d1fae5',
            paddingBottom: '1px'
          }}>
            ARAŞTIRMA ALANLARI
          </div>
          <div style={{ color: '#065f46', fontSize: '4px' }}>
            • Makine Öğrenmesi<br />
            • Doğal Dil İşleme<br />
            • Derin Öğrenme Algoritmaları<br />
            • Bilgisayarlı Görü
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '2px',
            borderBottom: '1px solid #d1fae5',
            paddingBottom: '1px'
          }}>
            AKADEMİK POZISYONLAR
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#065f46' }}>
              Profesör
            </div>
            <div style={{ fontSize: '4px', color: '#047857' }}>
              İTÜ Bilgisayar Bilimleri | 2020-Devam
            </div>
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#065f46' }}>
              Doçent Dr.
            </div>
            <div style={{ fontSize: '4px', color: '#047857' }}>
              ODTÜ Bilgisayar Mühendisliği | 2015-2020
            </div>
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#065f46' }}>
              Yrd. Doç. Dr.
            </div>
            <div style={{ fontSize: '4px', color: '#047857' }}>
              Boğaziçi Üniversitesi | 2012-2015
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '2px',
            borderBottom: '1px solid #d1fae5',
            paddingBottom: '1px'
          }}>
            YAYINLAR (Seçili)
          </div>
          <div style={{ fontSize: '4px', color: '#065f46', lineHeight: '1.3' }}>
            • "Deep Learning for NLP" (2024)<br />
            &nbsp;&nbsp;Nature Machine Intelligence, IF: 25.8<br />
            • "Transformer Architectures" (2023)<br />
            &nbsp;&nbsp;ICML 2023, h-index: 127<br />
            • 85+ hakemli makale, 2800+ atıf
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '2px',
            borderBottom: '1px solid #d1fae5',
            paddingBottom: '1px'
          }}>
            PROJELER & HIBELER
          </div>
          <div style={{ fontSize: '4px', color: '#065f46' }}>
            • TÜBİTAK 1001 Projesi (2023-2026)<br />
            &nbsp;&nbsp;450.000 TL - Proje Yürütücüsü<br />
            • Horizon Europe Grant (2022-2025)<br />
            &nbsp;&nbsp;€2.1M - Work Package Leader<br />
            • Google AI Research Award (2021)
          </div>
        </div>
        
        <div>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '2px',
            borderBottom: '1px solid #d1fae5',
            paddingBottom: '1px'
          }}>
            EĞİTİM
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#065f46' }}>
            Doktora, Bilgisayar Bilimleri
          </div>
          <div style={{ fontSize: '4px', color: '#047857' }}>
            MIT | 2008-2012
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#065f46', marginTop: '2px' }}>
            Yüksek Lisans, Bilgisayar Mühendisliği
          </div>
          <div style={{ fontSize: '4px', color: '#047857' }}>
            Stanford University | 2006-2008
          </div>
        </div>
      </div>
    </div>
  );
}