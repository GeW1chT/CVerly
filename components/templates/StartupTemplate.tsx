// components/templates/StartupTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

interface StartupTemplateProps {
  isPremium?: boolean;
}

export default function StartupTemplate({ isPremium = false }: StartupTemplateProps) {
  return (
    <div style={{
      width: '200px',
      height: '260px',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #bfdbfe 100%)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderRadius: '0.25rem',
      overflow: 'hidden',
      fontSize: '6px',
      lineHeight: '1.2',
      position: 'relative',
      border: '1px solid #93c5fd'
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
      
      {/* Header - Dynamic Design */}
      <div style={{
        background: 'linear-gradient(45deg, #3b82f6 0%, #1d4ed8 50%, #2563eb 100%)',
        color: 'white',
        padding: '10px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
          opacity: 0.5
        }} />
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '4px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>🚀</div>
          
          <div>
            <div style={{
              fontSize: '8px',
              fontWeight: 'bold',
              marginBottom: '1px'
            }}>
              EMRE KARA
            </div>
            <div style={{
              fontSize: '5px',
              opacity: 0.9
            }}>
              Full-Stack Developer & Co-founder
            </div>
          </div>
        </div>
        
        <div style={{
          fontSize: '3px',
          opacity: 0.8,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px'
        }}>
          <span>📧 emre@startup.co</span>
          <span>📱 +90 555 444</span>
          <span>🌐 github.com/emrekara</span>
          <span>💼 angel.co/emre-kara</span>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '8px', fontSize: '5px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#1d4ed8',
            marginBottom: '2px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            ⚡ STARTUP DNA
          </div>
          <div style={{ color: '#1e40af', fontSize: '4px', lineHeight: '1.4' }}>
            3 startup kurdu, 1 exit yaptı (€5M). Full-stack development + product strategy expertise. 0-1 ürün geliştirmede uzman.
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#1d4ed8',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            🏢 STARTUP JOURNEY
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '2px' }}>
              Co-founder & CTO 
              <span style={{ 
                background: '#10b981', 
                color: 'white', 
                padding: '1px 3px', 
                borderRadius: '2px', 
                fontSize: '3px' 
              }}>EXIT</span>
            </div>
            <div style={{ fontSize: '4px', color: '#3730a3' }}>
              TechFlow AI | 2022-2024 | €5M Acquisition
            </div>
            <div style={{ fontSize: '4px', color: '#1e40af', marginTop: '1px' }}>
              • 50K+ users, $2M ARR<br />
              • Led 12-person dev team
            </div>
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontWeight: '600', fontSize: '5px', color: '#1e40af' }}>
              Lead Developer
            </div>
            <div style={{ fontSize: '4px', color: '#3730a3' }}>
              CodeCraft Startup | 2020-2022 | Series A
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#1d4ed8',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            💻 TECH STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
            {[
              { name: 'React', color: '#61dafb' },
              { name: 'Node.js', color: '#68a063' },
              { name: 'Python', color: '#3776ab' },
              { name: 'AWS', color: '#ff9900' },
              { name: 'Docker', color: '#2496ed' },
              { name: 'MongoDB', color: '#47a248' }
            ].map((tech) => (
              <span key={tech.name} style={{
                background: `${tech.color}20`,
                color: tech.color,
                border: `1px solid ${tech.color}40`,
                padding: '1px 3px',
                borderRadius: '2px',
                fontSize: '3px',
                fontWeight: '600'
              }}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#1d4ed8',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            🎯 ACHIEVEMENTS
          </div>
          <div style={{ fontSize: '4px', color: '#1e40af' }}>
            • ProductHunt #1 Product (2x)<br />
            • TechStars Istanbul Mentor<br />
            • 15K+ GitHub stars<br />
            • Speaker at Startup Istanbul 2024
          </div>
        </div>
        
        <div>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#1d4ed8',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            🎓 EDUCATION
          </div>
          <div style={{ fontWeight: '600', fontSize: '5px', color: '#1e40af' }}>
            Bilgisayar Mühendisliği
          </div>
          <div style={{ fontSize: '4px', color: '#3730a3' }}>
            Sabancı Üniversitesi | 2016-2020
          </div>
        </div>
      </div>
    </div>
  );
}