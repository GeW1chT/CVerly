import React from 'react';
import { Crown } from 'lucide-react';

const FinanceProTemplate = ({ isPremium = false }: { isPremium?: boolean }) => (
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
    
    {/* Finance Header */}
    <div style={{
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      margin: '-12px -12px 8px -12px',
      padding: '8px 12px',
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '16px',
          height: '16px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px'
        }}>💰</div>
        <div>
          <div style={{ fontSize: '7px', fontWeight: 'bold' }}>DAVID FINANCE</div>
          <div style={{ fontSize: '5px', opacity: 0.9 }}>Senior Financial Analyst</div>
        </div>
      </div>
      <div style={{ fontSize: '4px', opacity: 0.8, marginTop: '2px' }}>david@finance.com | CFA, MBA</div>
    </div>
    
    {/* Financial Layout */}
    <div>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
        <div style={{
          flex: 1,
          background: '#f0fdf4',
          padding: '4px',
          borderRadius: '2px',
          border: '1px solid #059669'
        }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', textAlign: 'center' }}>CERTIFICATIONS</div>
          <div style={{ fontSize: '4px', textAlign: 'center', color: '#065f46' }}>CFA • MBA • FRM</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '6px' }}>
        <div style={{ flex: 2 }}>
          <div style={{ marginBottom: '6px' }}>
            <div style={{
              fontSize: '6px',
              fontWeight: 'bold',
              color: '#059669',
              marginBottom: '2px',
              borderLeft: '2px solid #059669',
              paddingLeft: '3px'
            }}>EXPERIENCE</div>
            <div style={{ height: '3px', background: '#f0fdf4', borderRadius: '1px', marginBottom: '1px', width: '95%' }} />
            <div style={{ height: '3px', background: '#f0fdf4', borderRadius: '1px', marginBottom: '1px', width: '80%' }} />
            <div style={{ height: '3px', background: '#f0fdf4', borderRadius: '1px', marginBottom: '1px', width: '90%' }} />
            <div style={{ height: '3px', background: '#f0fdf4', borderRadius: '1px', marginBottom: '1px', width: '75%' }} />
          </div>
          
          <div style={{ marginBottom: '6px' }}>
            <div style={{
              fontSize: '6px',
              fontWeight: 'bold',
              color: '#059669',
              marginBottom: '2px',
              borderLeft: '2px solid #059669',
              paddingLeft: '3px'
            }}>KEY ACHIEVEMENTS</div>
            <div style={{ height: '3px', background: '#f0fdf4', borderRadius: '1px', marginBottom: '1px', width: '100%' }} />
            <div style={{ height: '3px', background: '#f0fdf4', borderRadius: '1px', marginBottom: '1px', width: '85%' }} />
            <div style={{ height: '3px', background: '#f0fdf4', borderRadius: '1px', marginBottom: '1px', width: '95%' }} />
          </div>
        </div>
        
        <div style={{ width: '50px' }}>
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', marginBottom: '2px', textAlign: 'center' }}>SKILLS</div>
            <div style={{ height: '2px', background: '#059669', borderRadius: '1px', marginBottom: '1px', width: '100%' }} />
            <div style={{ height: '2px', background: '#059669', borderRadius: '1px', marginBottom: '1px', width: '90%' }} />
            <div style={{ height: '2px', background: '#059669', borderRadius: '1px', marginBottom: '1px', width: '85%' }} />
            <div style={{ height: '2px', background: '#059669', borderRadius: '1px', marginBottom: '1px', width: '95%' }} />
          </div>
          
          <div>
            <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', marginBottom: '2px', textAlign: 'center' }}>SOFTWARE</div>
            <div style={{ fontSize: '4px', textAlign: 'center', color: '#065f46' }}>Excel</div>
            <div style={{ fontSize: '4px', textAlign: 'center', color: '#065f46' }}>Bloomberg</div>
            <div style={{ fontSize: '4px', textAlign: 'center', color: '#065f46' }}>SAP</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FinanceProTemplate;