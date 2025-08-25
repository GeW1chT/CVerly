import React from 'react';
import { Crown } from 'lucide-react';

const CreativeDesignerTemplate = ({ isPremium = false }: { isPremium?: boolean }) => (
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
    
    {/* Asymmetric Header */}
    <div style={{ display: 'flex', marginBottom: '8px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, #be185d 0%, #e11d48 100%)',
        borderRadius: '20px 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px'
      }}>🎨</div>
      
      <div style={{ marginLeft: '8px', flex: 1 }}>
        <div style={{ fontSize: '8px', fontWeight: 'bold', color: '#be185d', marginBottom: '2px' }}>SARAH CREATIVE</div>
        <div style={{ fontSize: '6px', color: '#6b7280', marginBottom: '1px' }}>Graphic Designer</div>
        <div style={{ fontSize: '4px', color: '#9ca3af' }}>sarah@creative.com</div>
      </div>
    </div>
    
    {/* Creative Grid Layout */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '6px' }}>
      <div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: 'white',
            background: '#be185d',
            padding: '2px 4px',
            borderRadius: '2px',
            marginBottom: '3px',
            display: 'inline-block'
          }}>PORTFOLIO</div>
          <div style={{ height: '3px', background: '#fce7f3', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
          <div style={{ height: '3px', background: '#fce7f3', borderRadius: '1px', marginBottom: '2px', width: '70%' }} />
          <div style={{ height: '3px', background: '#fce7f3', borderRadius: '1px', marginBottom: '2px', width: '85%' }} />
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: 'white',
            background: '#be185d',
            padding: '2px 4px',
            borderRadius: '2px',
            marginBottom: '3px',
            display: 'inline-block'
          }}>EXPERIENCE</div>
          <div style={{ height: '3px', background: '#fce7f3', borderRadius: '1px', marginBottom: '2px', width: '95%' }} />
          <div style={{ height: '3px', background: '#fce7f3', borderRadius: '1px', marginBottom: '2px', width: '80%' }} />
          <div style={{ height: '3px', background: '#fce7f3', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
        </div>
      </div>
      
      <div>
        <div style={{
          width: '12px',
          height: '12px',
          background: '#be185d',
          borderRadius: '50%',
          margin: '0 auto 4px'
        }} />
        <div style={{
          width: '8px',
          height: '8px',
          background: '#e11d48',
          borderRadius: '50%',
          margin: '0 auto 4px'
        }} />
        <div style={{
          width: '10px',
          height: '10px',
          background: '#f43f5e',
          borderRadius: '50%',
          margin: '0 auto 8px'
        }} />
        
        <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#be185d', marginBottom: '2px', textAlign: 'center' }}>SKILLS</div>
        <div style={{ height: '2px', background: '#be185d', borderRadius: '1px', marginBottom: '2px', width: '100%' }} />
        <div style={{ height: '2px', background: '#be185d', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
        <div style={{ height: '2px', background: '#be185d', borderRadius: '1px', marginBottom: '2px', width: '95%' }} />
      </div>
    </div>
  </div>
);

export default CreativeDesignerTemplate;