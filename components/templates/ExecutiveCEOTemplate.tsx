import React from 'react';
import { Crown } from 'lucide-react';

const ExecutiveCEOTemplate = ({ isPremium = false }: { isPremium?: boolean }) => (
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
    fontFamily: 'Georgia, serif'
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
    
    {/* Elegant Header */}
    <div style={{
      textAlign: 'center',
      borderBottom: '2px solid #4338ca',
      paddingBottom: '8px',
      marginBottom: '8px'
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
        borderRadius: '50%',
        margin: '0 auto 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '8px'
      }}>👔</div>
      <div style={{ fontSize: '8px', fontWeight: 'bold', color: '#1f2937', marginBottom: '2px' }}>MICHAEL EXECUTIVE</div>
      <div style={{ fontSize: '5px', color: '#4338ca', fontWeight: 'bold' }}>Chief Executive Officer</div>
      <div style={{ fontSize: '4px', color: '#6b7280', marginTop: '2px' }}>michael@company.com | +1 234 567 890</div>
    </div>
    
    {/* Executive Summary */}
    <div style={{ marginBottom: '8px', textAlign: 'center' }}>
      <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#4338ca', marginBottom: '2px' }}>EXECUTIVE SUMMARY</div>
      <div style={{ height: '2px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '1px', width: '100%' }} />
      <div style={{ height: '2px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '1px', width: '90%', margin: '0 auto 1px' }} />
      <div style={{ height: '2px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '1px', width: '95%', margin: '0 auto 1px' }} />
    </div>
    
    {/* Two Column Layout */}
    <div style={{ display: 'flex', gap: '8px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#4338ca', marginBottom: '3px', textAlign: 'center', borderBottom: '1px solid #4338ca', paddingBottom: '1px' }}>LEADERSHIP EXPERIENCE</div>
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '100%' }} />
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '85%' }} />
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '95%' }} />
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '80%' }} />
        </div>
        
        <div>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#4338ca', marginBottom: '3px', textAlign: 'center', borderBottom: '1px solid #4338ca', paddingBottom: '1px' }}>BOARD POSITIONS</div>
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '100%' }} />
        </div>
      </div>
      
      <div style={{ width: '60px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#4338ca', marginBottom: '3px', textAlign: 'center' }}>KEY METRICS</div>
          <div style={{
            background: '#4338ca',
            color: 'white',
            fontSize: '4px',
            textAlign: 'center',
            padding: '2px',
            borderRadius: '1px',
            marginBottom: '2px'
          }}>$100M+ Revenue</div>
          <div style={{
            background: '#6366f1',
            color: 'white',
            fontSize: '4px',
            textAlign: 'center',
            padding: '2px',
            borderRadius: '1px',
            marginBottom: '2px'
          }}>500+ Team</div>
        </div>
        
        <div>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#4338ca', marginBottom: '3px', textAlign: 'center' }}>EDUCATION</div>
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '100%' }} />
          <div style={{ height: '3px', background: '#e0e7ff', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
        </div>
      </div>
    </div>
  </div>
);

export default ExecutiveCEOTemplate;