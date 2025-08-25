// components/templates/HealthcareProTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

const HealthcareProTemplate = ({ isPremium = false }: { isPremium?: boolean }) => (
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
    
    {/* Medical Header */}
    <div style={{
      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
      margin: '-12px -12px 8px -12px',
      padding: '10px 12px',
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '18px',
          height: '18px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px'
        }}>⚕️</div>
        <div>
          <div style={{ fontSize: '8px', fontWeight: 'bold' }}>DR. SARAH MEDICINE</div>
          <div style={{ fontSize: '5px', opacity: 0.9 }}>Cardiologist, MD</div>
        </div>
      </div>
    </div>
    
    {/* Medical Credentials */}
    <div style={{ 
      background: '#fef2f2', 
      padding: '4px', 
      borderRadius: '2px', 
      marginBottom: '6px',
      border: '1px solid #fecaca'
    }}>
      <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#dc2626', textAlign: 'center' }}>
        MD • Board Certified • 15+ Years Experience
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '6px' }}>
      <div style={{ flex: 2 }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <div style={{ width: '8px', height: '1px', background: '#dc2626' }} />
            CLINICAL EXPERIENCE
          </div>
          <div style={{ height: '3px', background: '#fef2f2', borderRadius: '1px', marginBottom: '2px', width: '100%' }} />
          <div style={{ height: '3px', background: '#fef2f2', borderRadius: '1px', marginBottom: '2px', width: '90%' }} />
          <div style={{ height: '3px', background: '#fef2f2', borderRadius: '1px', marginBottom: '2px', width: '85%' }} />
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <div style={{ width: '8px', height: '1px', background: '#dc2626' }} />
            RESEARCH & PUBLICATIONS
          </div>
          <div style={{ height: '3px', background: '#fef2f2', borderRadius: '1px', marginBottom: '2px', width: '95%' }} />
          <div style={{ height: '3px', background: '#fef2f2', borderRadius: '1px', marginBottom: '2px', width: '80%' }} />
        </div>

        <div style={{ marginBottom: '6px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <div style={{ width: '8px', height: '1px', background: '#dc2626' }} />
            EDUCATION & TRAINING
          </div>
          <div style={{ height: '3px', background: '#fef2f2', borderRadius: '1px', marginBottom: '2px', width: '100%' }} />
          <div style={{ height: '3px', background: '#fef2f2', borderRadius: '1px', marginBottom: '2px', width: '75%' }} />
        </div>
      </div>
      
      <div style={{ width: '55px' }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#dc2626', marginBottom: '2px', textAlign: 'center' }}>SPECIALTIES</div>
          <div style={{
            background: '#dc2626',
            color: 'white',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            Cardiology
          </div>
          <div style={{
            background: '#fecaca',
            color: '#dc2626',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            Surgery
          </div>
          <div style={{
            background: '#fecaca',
            color: '#dc2626',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center'
          }}>
            Research
          </div>
        </div>

        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#dc2626', marginBottom: '2px', textAlign: 'center' }}>CERTIFICATIONS</div>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            padding: '2px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center',
            marginBottom: '1px'
          }}>
            ABIM Certified
          </div>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            padding: '2px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center',
            marginBottom: '1px'
          }}>
            CPR/BLS
          </div>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            padding: '2px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center'
          }}>
            ACLS
          </div>
        </div>

        <div>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#dc2626', marginBottom: '2px', textAlign: 'center' }}>CONTACT</div>
          <div style={{ fontSize: '4px', color: '#666', textAlign: 'center', lineHeight: '1.3' }}>
            📧 sarah@med.com<br/>
            📱 (555) 123-4567<br/>
            📍 Medical Center
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HealthcareProTemplate;