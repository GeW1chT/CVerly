// components/templates/ConsultingProTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

const ConsultingProTemplate = ({ isPremium = false }: { isPremium?: boolean }) => (
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
    fontFamily: '"Times New Roman", serif'
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
    
    {/* Consulting Header */}
    <div style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      margin: '-12px -12px 8px -12px',
      padding: '10px 12px',
      color: 'white',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '30px',
        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'
      }} />
      <div>
        <div style={{ fontSize: '8px', fontWeight: 'bold', letterSpacing: '0.5px' }}>MICHAEL STRATEGY</div>
        <div style={{ fontSize: '5px', opacity: 0.9, fontStyle: 'italic' }}>Senior Management Consultant</div>
        <div style={{ fontSize: '4px', opacity: 0.8, marginTop: '1px' }}>MBA • Strategy & Operations</div>
      </div>
    </div>
    
    {/* Professional Summary */}
    <div style={{ 
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
      padding: '4px', 
      borderRadius: '2px', 
      marginBottom: '6px',
      border: '1px solid #bfdbfe',
      borderLeft: '3px solid #1e40af'
    }}>
      <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1e40af', marginBottom: '1px' }}>
        EXECUTIVE SUMMARY
      </div>
      <div style={{ fontSize: '4px', color: '#1f2937', lineHeight: '1.3' }}>
        Strategic consultant with 8+ years driving digital transformation and operational excellence for Fortune 500 clients
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '6px' }}>
      <div style={{ flex: 2 }}>
        {/* Core Competencies */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#1e40af',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            borderBottom: '1px solid #bfdbfe',
            paddingBottom: '1px'
          }}>
            💼 CORE COMPETENCIES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', marginTop: '2px' }}>
            {['Strategy', 'Operations', 'Digital Transformation', 'Change Management'].map((skill, index) => (
              <div key={index} style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '1px 3px',
                borderRadius: '1px',
                fontSize: '4px',
                color: '#1e40af'
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
        
        {/* Experience */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#1e40af',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            borderBottom: '1px solid #bfdbfe',
            paddingBottom: '1px'
          }}>
            📈 PROFESSIONAL EXPERIENCE
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1f2937' }}>Senior Consultant</div>
            <div style={{ fontSize: '4px', color: '#6b7280', fontStyle: 'italic' }}>McKinsey & Company | 2019-Present</div>
            <div style={{ fontSize: '4px', color: '#374151', marginTop: '1px' }}>
              • Led 15+ strategic initiatives across industries<br/>
              • Delivered $50M+ in client value creation
            </div>
          </div>
          <div>
            <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1f2937' }}>Business Analyst</div>
            <div style={{ fontSize: '4px', color: '#6b7280', fontStyle: 'italic' }}>Bain & Company | 2017-2019</div>
            <div style={{ fontSize: '4px', color: '#374151', marginTop: '1px' }}>
              • Supported C-suite decision making<br/>
              • Specialized in operational excellence
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ width: '55px' }}>
        {/* Key Metrics */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1e40af', marginBottom: '2px', textAlign: 'center' }}>
            KEY METRICS
          </div>
          <div style={{
            background: '#1e40af',
            color: 'white',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            $50M+ Impact
          </div>
          <div style={{
            background: '#dbeafe',
            color: '#1e40af',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            25+ Projects
          </div>
          <div style={{
            background: '#dbeafe',
            color: '#1e40af',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center'
          }}>
            8 Industries
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1e40af', marginBottom: '2px', textAlign: 'center' }}>
            EDUCATION
          </div>
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            padding: '2px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center',
            marginBottom: '2px'
          }}>
            MBA - Harvard<br/>
            Business School
          </div>
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            padding: '2px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center'
          }}>
            BS Economics<br/>
            Wharton School
          </div>
        </div>

        {/* Languages & Skills */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1e40af', marginBottom: '2px', textAlign: 'center' }}>
            LANGUAGES
          </div>
          <div style={{ fontSize: '4px', color: '#374151', textAlign: 'center', lineHeight: '1.3' }}>
            English (Native)<br/>
            German (Fluent)<br/>
            Spanish (Business)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1e40af', marginBottom: '2px', textAlign: 'center' }}>
            CONTACT
          </div>
          <div style={{ fontSize: '4px', color: '#666', textAlign: 'center', lineHeight: '1.3' }}>
            📧 m.strategy@consulting.com<br/>
            📱 +1 (555) 987-6543<br/>
            🔗 linkedin.com/in/mstrategy
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ConsultingProTemplate;