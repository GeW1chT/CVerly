import React from 'react';
import { Crown } from 'lucide-react';

const ModernTechTemplate = ({ isPremium = false }: { isPremium?: boolean }) => (
  <div style={{
    width: '200px',
    height: '260px',
    background: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: '4px',
    padding: '12px',
    fontSize: '6px',
    lineHeight: '1.2',
    position: 'relative',
    fontFamily: 'Arial, sans-serif'
  }}>
    {isPremium && (
      <Crown style={{
        position: 'absolute',
        top: '4px',
        right: '4px',
        width: '12px',
        height: '12px',
        color: '#f59e0b'
      }} />
    )}
    
    {/* Header - Tech Blue */}
    <div style={{
      background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
      margin: '-12px -12px 8px -12px',
      padding: '12px',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        width: '16px',
        height: '16px',
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        margin: '0 auto 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '8px'
      }}>👨‍💻</div>
      <div style={{ fontSize: '8px', fontWeight: 'bold', marginBottom: '2px' }}>JOHN DEVELOPER</div>
      <div style={{ fontSize: '5px', opacity: 0.9 }}>Senior Software Engineer</div>
      <div style={{ fontSize: '4px', opacity: 0.8, marginTop: '2px' }}>john@tech.com | +1 234 567 890</div>
    </div>
    
    {/* Content */}
    <div style={{ display: 'flex', gap: '6px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '6px', fontWeight: 'bold', color: '#0891b2', marginBottom: '3px', borderBottom: '0.5px solid #0891b2', paddingBottom: '1px' }}>EXPERIENCE</div>
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '80%' }} />
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '95%' }} />
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '75%' }} />
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '6px', fontWeight: 'bold', color: '#0891b2', marginBottom: '3px', borderBottom: '0.5px solid #0891b2', paddingBottom: '1px' }}>PROJECTS</div>
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '85%' }} />
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '70%' }} />
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
        </div>
      </div>
      
      <div style={{ width: '60px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '6px', fontWeight: 'bold', color: '#0891b2', marginBottom: '3px', borderBottom: '0.5px solid #0891b2', paddingBottom: '1px' }}>TECH SKILLS</div>
          <div style={{ height: '2px', background: '#0891b2', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
          <div style={{ height: '2px', background: '#0891b2', borderRadius: '1px', marginBottom: '2px', width: '80%' }} />
          <div style={{ height: '2px', background: '#0891b2', borderRadius: '1px', marginBottom: '2px', width: '95%' }} />
          <div style={{ height: '2px', background: '#0891b2', borderRadius: '1px', marginBottom: '2px', width: '75%' }} />
          <div style={{ height: '2px', background: '#0891b2', borderRadius: '1px', marginBottom: '2px', width: '85%' }} />
        </div>
        
        <div>
          <div style={{ fontSize: '6px', fontWeight: 'bold', color: '#0891b2', marginBottom: '3px', borderBottom: '0.5px solid #0891b2', paddingBottom: '1px' }}>EDUCATION</div>
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '100%' }} />
          <div style={{ height: '3px', background: '#f0f9ff', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default ModernTechTemplate;