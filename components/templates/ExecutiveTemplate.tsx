// components/templates/ExecutiveTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

interface ExecutiveTemplateProps {
  isPremium?: boolean;
}

export default function ExecutiveTemplate({ isPremium = false }: ExecutiveTemplateProps) {
  return (
    <div style={{
      width: '200px',
      height: '260px',
      background: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderRadius: '0.25rem',
      overflow: 'hidden',
      fontSize: '6px',
      lineHeight: '1.2',
      position: 'relative',
      border: '1px solid #d8b4fe'
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
        background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
        color: 'white',
        padding: '12px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '2px',
          background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
        }} />
        
        <div style={{
          width: '28px',
          height: '28px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          margin: '0 auto 4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>👔</div>
        
        <div style={{
          fontSize: '9px',
          fontWeight: 'bold',
          marginBottom: '2px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Dr. CAN ÖZTÜRK
        </div>
        
        <div style={{
          fontSize: '6px',
          opacity: 0.9,
          marginBottom: '3px',
          textTransform: 'uppercase',
          letterSpacing: '0.3px'
        }}>
          İcra Kurulu Başkanı
        </div>
        
        <div style={{
          height: '1px',
          background: 'rgba(255, 255, 255, 0.3)',
          margin: '4px 20px 4px 20px'
        }} />
        
        <div style={{
          fontSize: '3px',
          opacity: 0.8
        }}>
          📧 can.ozturk@company.com<br />
          📱 +90 212 xxx xx xx | 🌐 linkedin.com/in/canozturk
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '8px', fontSize: '5px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#7c3aed',
            marginBottom: '2px',
            position: 'relative',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            YÖNETİCİ ÖZETİ
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '0',
              width: '30px',
              height: '1px',
              background: 'linear-gradient(90deg, #7c3aed 0%, #fbbf24 100%)'
            }} />
          </div>
          <div style={{ color: '#581c87', fontSize: '4px', lineHeight: '1.4' }}>
            20+ yıl C-level deneyimi. Fortune 500 şirketlerinde stratejik liderlik, M&A operasyonları ve global büyüme.
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#7c3aed',
            marginBottom: '2px',
            position: 'relative',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            BAŞARILAR
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '0',
              width: '30px',
              height: '1px',
              background: 'linear-gradient(90deg, #7c3aed 0%, #fbbf24 100%)'
            }} />
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#581c87' }}>
              CEO | MegaCorp Holding
            </div>
            <div style={{ fontSize: '4px', color: '#7c2d12' }}>
              2018-2024 | €2.5B Ciro
            </div>
            <div style={{ fontSize: '4px', color: '#581c87', marginTop: '1px' }}>
              • 300% büyüme<br />
              • 15 ülkeye expansion<br />
              • 3 başarılı M&A
            </div>
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#581c87' }}>
              COO | TechGiant Inc.
            </div>
            <div style={{ fontSize: '4px', color: '#7c2d12' }}>
              2014-2018 | NASDAQ: TECH
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#7c3aed',
            marginBottom: '2px',
            position: 'relative',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            EĞİTİM
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '0',
              width: '30px',
              height: '1px',
              background: 'linear-gradient(90deg, #7c3aed 0%, #fbbf24 100%)'
            }} />
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#581c87' }}>
            MBA, Executive Program
          </div>
          <div style={{ fontSize: '4px', color: '#7c2d12' }}>
            Harvard Business School | 2008
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#581c87', marginTop: '2px' }}>
            Doktora, İktisat
          </div>
          <div style={{ fontSize: '4px', color: '#7c2d12' }}>
            London School of Economics | 2004
          </div>
        </div>
        
        <div>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#7c3aed',
            marginBottom: '2px',
            position: 'relative',
            textTransform: 'uppercase',
            letterSpacing: '0.3px'
          }}>
            YÖNETİM KURULU
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: '0',
              width: '30px',
              height: '1px',
              background: 'linear-gradient(90deg, #7c3aed 0%, #fbbf24 100%)'
            }} />
          </div>
          <div style={{ fontSize: '4px', color: '#581c87' }}>
            • TechStart Ventures (Partner)<br />
            • Innovation Fund (Board Member)<br />
            • Digital Turkey Association (Chairman)
          </div>
        </div>
      </div>
    </div>
  );
}