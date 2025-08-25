// components/templates/CreativeTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

interface CreativeTemplateProps {
  isPremium?: boolean;
}

export default function CreativeTemplate({ isPremium = false }: CreativeTemplateProps) {
  return (
    <div style={{
      width: '200px',
      height: '260px',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
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
      
      {/* Sidebar */}
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        width: '70px',
        height: '100%',
        background: '#ea580c',
        color: 'white',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}>🎨</div>
        
        <div style={{ fontSize: '6px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>
          AYŞE<br />KAYA
        </div>
        
        <div style={{ fontSize: '4px', marginBottom: '8px', textAlign: 'center' }}>
          UI/UX Designer
        </div>
        
        {/* Skills Circular */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            position: 'relative'
          }}>
            <div style={{ fontSize: '3px', position: 'absolute', top: '6px', left: '4px', color: 'white' }}>UI</div>
          </div>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            position: 'relative'
          }}>
            <div style={{ fontSize: '3px', position: 'absolute', top: '4px', left: '2px', color: 'white' }}>UX</div>
          </div>
        </div>
        
        <div style={{ marginTop: '8px', fontSize: '3px', textAlign: 'center', opacity: 0.8 }}>
          📧 ayse@mail.com<br />
          📱 +90 555 111<br />
          🌐 behance.net/ayse
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ marginLeft: '70px', padding: '8px', height: '100%' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '7px',
            fontWeight: 'bold',
            color: '#ea580c',
            marginBottom: '3px',
            position: 'relative'
          }}>
            HAKKIMDA
            <div style={{
              position: 'absolute',
              bottom: '-1px',
              left: '0',
              width: '20px',
              height: '1px',
              background: '#ea580c'
            }} />
          </div>
          <div style={{ color: '#7c2d12', fontSize: '4px', lineHeight: '1.4' }}>
            5+ yıl UI/UX tasarım deneyimi. Kullanıcı odaklı çözümler üretmeyi seven yaratıcı tasarımcı.
          </div>
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '7px',
            fontWeight: 'bold',
            color: '#ea580c',
            marginBottom: '3px',
            position: 'relative'
          }}>
            PROJELER
            <div style={{
              position: 'absolute',
              bottom: '-1px',
              left: '0',
              width: '20px',
              height: '1px',
              background: '#ea580c'
            }} />
          </div>
          <div style={{ marginBottom: '4px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#7c2d12' }}>
              E-ticaret Uygulaması
            </div>
            <div style={{ fontSize: '4px', color: '#a16207' }}>
              Figma, Sketch • 2024
            </div>
            <div style={{ fontSize: '3px', color: '#7c2d12', marginTop: '1px' }}>
              Mobil-first tasarım, 40% conversion artışı
            </div>
          </div>
          <div style={{ marginBottom: '4px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#7c2d12' }}>
              SaaS Dashboard
            </div>
            <div style={{ fontSize: '4px', color: '#a16207' }}>
              Adobe XD • 2023
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '7px',
            fontWeight: 'bold',
            color: '#ea580c',
            marginBottom: '3px',
            position: 'relative'
          }}>
            ARAÇLAR
            <div style={{
              position: 'absolute',
              bottom: '-1px',
              left: '0',
              width: '20px',
              height: '1px',
              background: '#ea580c'
            }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
            {['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'].map((tool, index) => (
              <div key={tool} style={{
                background: index % 2 === 0 ? '#fed7aa' : '#fdba74',
                color: '#7c2d12',
                padding: '1px 3px',
                borderRadius: '2px',
                fontSize: '3px',
                fontWeight: '500'
              }}>
                {tool}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div style={{
            fontSize: '7px',
            fontWeight: 'bold',
            color: '#ea580c',
            marginBottom: '3px',
            position: 'relative'
          }}>
            EĞİTİM
            <div style={{
              position: 'absolute',
              bottom: '-1px',
              left: '0',
              width: '20px',
              height: '1px',
              background: '#ea580c'
            }} />
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#7c2d12' }}>
            Grafik Tasarım
          </div>
          <div style={{ fontSize: '4px', color: '#a16207' }}>
            Mimar Sinan GSÜ | 2017-2021
          </div>
        </div>
      </div>
    </div>
  );
}