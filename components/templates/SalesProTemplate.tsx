// components/templates/SalesProTemplate.tsx
import React from 'react';
import { Crown } from 'lucide-react';

const SalesProTemplate = ({ isPremium = false }: { isPremium?: boolean }) => (
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
    
    {/* Sales Header */}
    <div style={{
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      margin: '-12px -12px 8px -12px',
      padding: '10px 12px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '40px',
        height: '40px',
        border: '2px solid rgba(255,255,255,0.2)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        width: '8px',
        height: '8px',
        background: 'rgba(255,255,255,0.3)',
        borderRadius: '50%'
      }} />
      <div>
        <div style={{ fontSize: '8px', fontWeight: 'bold' }}>ALEX SALES</div>
        <div style={{ fontSize: '5px', opacity: 0.9 }}>Senior Sales Executive</div>
        <div style={{ fontSize: '4px', opacity: 0.8, marginTop: '1px' }}>Enterprise Solutions • B2B Sales Leader</div>
      </div>
    </div>
    
    {/* Achievement Banner */}
    <div style={{ 
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', 
      padding: '4px', 
      borderRadius: '2px', 
      marginBottom: '6px',
      border: '1px solid #a7f3d0',
      borderLeft: '3px solid #059669'
    }}>
      <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', textAlign: 'center' }}>
        🏆 TOP 1% SALES PERFORMER • 150% QUOTA ACHIEVEMENT
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '6px' }}>
      <div style={{ flex: 2 }}>
        {/* Sales Metrics */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            borderBottom: '1px solid #a7f3d0',
            paddingBottom: '1px'
          }}>
            📊 SALES PERFORMANCE
          </div>
          
          {/* Progress Bars */}
          <div style={{ marginBottom: '2px' }}>
            <div style={{ fontSize: '4px', color: '#374151', marginBottom: '1px' }}>Revenue Generation</div>
            <div style={{ background: '#d1fae5', height: '3px', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{ background: '#059669', width: '95%', height: '100%', borderRadius: '1px' }} />
            </div>
          </div>
          
          <div style={{ marginBottom: '2px' }}>
            <div style={{ fontSize: '4px', color: '#374151', marginBottom: '1px' }}>Client Acquisition</div>
            <div style={{ background: '#d1fae5', height: '3px', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{ background: '#10b981', width: '88%', height: '100%', borderRadius: '1px' }} />
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '4px', color: '#374151', marginBottom: '1px' }}>Relationship Management</div>
            <div style={{ background: '#d1fae5', height: '3px', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{ background: '#34d399', width: '92%', height: '100%', borderRadius: '1px' }} />
            </div>
          </div>
        </div>
        
        {/* Experience */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '6px',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            borderBottom: '1px solid #a7f3d0',
            paddingBottom: '1px'
          }}>
            💼 SALES EXPERIENCE
          </div>
          <div style={{ marginBottom: '3px' }}>
            <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1f2937' }}>Senior Sales Executive</div>
            <div style={{ fontSize: '4px', color: '#6b7280', fontStyle: 'italic' }}>TechCorp Solutions | 2020-Present</div>
            <div style={{ fontSize: '4px', color: '#374151', marginTop: '1px' }}>
              • Generated $2.5M+ annual revenue<br/>
              • Managed 50+ enterprise accounts<br/>
              • 150% quota achievement rate
            </div>
          </div>
          <div>
            <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#1f2937' }}>Sales Manager</div>
            <div style={{ fontSize: '4px', color: '#6b7280', fontStyle: 'italic' }}>SalesPro Inc | 2018-2020</div>
            <div style={{ fontSize: '4px', color: '#374151', marginTop: '1px' }}>
              • Led team of 8 sales representatives<br/>
              • Exceeded targets by 25% annually
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ width: '55px' }}>
        {/* Key Numbers */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', marginBottom: '2px', textAlign: 'center' }}>
            KEY NUMBERS
          </div>
          <div style={{
            background: '#059669',
            color: 'white',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            $2.5M Revenue
          </div>
          <div style={{
            background: '#d1fae5',
            color: '#059669',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            150% Quota
          </div>
          <div style={{
            background: '#d1fae5',
            color: '#059669',
            padding: '2px 4px',
            borderRadius: '2px',
            fontSize: '4px',
            textAlign: 'center'
          }}>
            50+ Clients
          </div>
        </div>

        {/* Sales Skills */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', marginBottom: '2px', textAlign: 'center' }}>
            SALES SKILLS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {['CRM Systems', 'Lead Generation', 'Negotiation', 'Closing'].map((skill, index) => (
              <div key={index} style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '1px 2px',
                borderRadius: '1px',
                fontSize: '4px',
                textAlign: 'center',
                color: '#059669'
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', marginBottom: '2px', textAlign: 'center' }}>
            TOOLS & CRM
          </div>
          <div style={{ fontSize: '4px', color: '#374151', textAlign: 'center', lineHeight: '1.3' }}>
            Salesforce<br/>
            HubSpot<br/>
            LinkedIn Sales<br/>
            Zoom
          </div>
        </div>

        {/* Awards */}
        <div style={{ marginBottom: '4px' }}>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', marginBottom: '2px', textAlign: 'center' }}>
            AWARDS
          </div>
          <div style={{
            background: '#fbbf24',
            color: 'white',
            padding: '1px 2px',
            borderRadius: '1px',
            fontSize: '4px',
            textAlign: 'center',
            marginBottom: '1px'
          }}>
            🏆 Top Performer
          </div>
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            padding: '1px 2px',
            borderRadius: '1px',
            fontSize: '4px',
            textAlign: 'center',
            color: '#059669'
          }}>
            Sales Excellence
          </div>
        </div>

        <div>
          <div style={{ fontSize: '5px', fontWeight: 'bold', color: '#059669', marginBottom: '2px', textAlign: 'center' }}>
            CONTACT
          </div>
          <div style={{ fontSize: '4px', color: '#666', textAlign: 'center', lineHeight: '1.3' }}>
            📧 alex@sales.com<br/>
            📱 (555) 234-5678<br/>
            🔗 linkedin.com/in/alexsales
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SalesProTemplate;