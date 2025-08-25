// app/dashboard/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Download, 
  Trash2, 
  Eye,
  Calendar,
  BarChart3,
  Settings,
  Crown,
  Search,
  AlertTriangle
} from 'lucide-react';
import { useSettings, useTranslation, getThemeColors } from '../contexts/SettingsContext';

const Dashboard = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const themeColors = getThemeColors(settings.preferences.theme);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, cvId: '', cvName: '' });
  const [isDownloading, setIsDownloading] = useState('');
  
  // CV verileri - state olarak tanımladık ki silebiliriz
  const [cvs, setCvs] = useState([
    {
      id: '1',
      name: t('cvs'),
      template: 'Modern',
      lastModified: '2 gün önce',
      status: 'Tamamlandı',
      views: 24,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
      }
    },
    {
      id: '2',
      name: 'Pazarlama Uzmanı CV',
      template: 'Creative',
      lastModified: '1 hafta önce',
      status: 'Taslak',
      views: 8,
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
      }
    },
    {
      id: '3',
      name: 'Proje Yöneticisi CV',
      template: 'Professional',
      lastModified: '3 hafta önce',
      status: 'Tamamlandı',
      views: 156,
      data: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
      }
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'CV güncellendi', cv: 'Yazılım Geliştirici CV', time: '2 saat önce' },
    { id: 2, action: 'CV görüntülendi', cv: 'Proje Yöneticisi CV', time: '5 saat önce' },
    { id: 3, action: 'CV indirildi', cv: 'Yazılım Geliştirici CV', time: '1 gün önce' },
    { id: 4, action: 'Yeni CV oluşturuldu', cv: 'Pazarlama Uzmanı CV', time: '1 hafta önce' }
  ]);

  const stats = [
    { label: t('totalCVs'), value: cvs.length.toString(), icon: FileText, color: 'blue' },
    { label: 'Bu Ay ' + t('views'), value: cvs.reduce((sum, cv) => sum + cv.views, 0).toString(), icon: Eye, color: 'green' },
    { label: t('downloads') + ' Sayısı', value: '47', icon: Download, color: 'purple' },
    { label: t('lastUpdate'), value: '2 gün', icon: Calendar, color: 'orange' }
  ];

  const filteredCVs = cvs.filter(cv => 
    cv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Aktivite ekleme fonksiyonu
  const addActivity = (action: string, cvName: string) => {
    const newActivity = {
      id: Date.now(),
      action,
      cv: cvName,
      time: 'Az önce'
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 3)]);
  };

  // CV görüntüleme
  const handleView = (cv: any) => {
    setCvs(prev => prev.map(item => 
      item.id === cv.id 
        ? { ...item, views: item.views + 1 }
        : item
    ));
    
    addActivity('CV görüntülendi', cv.name);
    window.open(`/cv-preview/${cv.id}`, '_blank');
  };

  // CV düzenleme
  const handleEdit = (cv: any) => {
    addActivity('CV düzenlendi', cv.name);
    window.location.href = `/editor?cv=${cv.id}`;
  };

  // CV indirme
  const handleDownload = async (cv: any) => {
    setIsDownloading(cv.id);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const element = document.createElement('a');
      const file = new Blob([`CV: ${cv.name}\nTemplate: ${cv.template}\nSon Güncelleme: ${cv.lastModified}`], 
        { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${cv.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      addActivity('CV indirildi', cv.name);
      alert('CV başarıyla indirildi!');
      
    } catch (error) {
      alert('İndirme sırasında bir hata oluştu!');
    } finally {
      setIsDownloading('');
    }
  };

  // CV silme modal açma
  const openDeleteModal = (cv: any) => {
    setDeleteModal({
      isOpen: true,
      cvId: cv.id,
      cvName: cv.name
    });
  };

  // CV silme onaylama
  const handleDelete = () => {
    setCvs(prev => prev.filter(cv => cv.id !== deleteModal.cvId));
    addActivity('CV silindi', deleteModal.cvName);
    setDeleteModal({ isOpen: false, cvId: '', cvName: '' });
    alert('CV başarıyla silindi!');
  };

  // Modal kapatma
  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, cvId: '', cvName: '' });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: themeColors.background,
      paddingTop: '2rem', 
      paddingBottom: '2rem',
      transition: 'all 0.3s ease'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: '700', 
                color: themeColors.textPrimary,
                margin: 0
              }}>
                {t('dashboard')}
              </h1>
              <p style={{ 
                marginTop: '0.5rem',
                color: themeColors.textSecondary,
                fontSize: '1.125rem'
              }}>
                CV'lerinizi yönetin ve performanslarını takip edin
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/builder" className="btn btn-primary">
                <Plus style={{ width: '1rem', height: '1rem' }} />
                {t('newCV')}
              </Link>
              <button 
                className="btn btn-outline"
                onClick={() => window.location.href = '/settings'}
              >
                <Settings style={{ width: '1rem', height: '1rem' }} />
                {t('settings')}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4" style={{ marginBottom: '2rem', gap: '1rem' }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ 
                  width: '3rem', 
                  height: '3rem', 
                  margin: '0 auto 1rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: stat.color === 'blue' ? (settings.preferences.theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe') : 
                                 stat.color === 'green' ? (settings.preferences.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5') :
                                 stat.color === 'purple' ? (settings.preferences.theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : '#e9d5ff') : 
                                 (settings.preferences.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fed7aa')
                }}>
                  <Icon style={{ 
                    width: '1.5rem', 
                    height: '1.5rem',
                    color: stat.color === 'blue' ? '#2563eb' : 
                           stat.color === 'green' ? '#059669' :
                           stat.color === 'purple' ? '#7c3aed' : '#ea580c'
                  }} />
                </div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: themeColors.textPrimary, 
                  marginBottom: '0.25rem' 
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: themeColors.textSecondary 
                }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* CV'lerim */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title">{t('cvs')}</h2>
                <div style={{ position: 'relative', width: '250px' }}>
                  <Search style={{ 
                    position: 'absolute', 
                    left: '0.75rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '1rem', 
                    height: '1rem', 
                    color: themeColors.textSecondary
                  }} />
                  <input
                    type="text"
                    placeholder={t('search')}
                    className="input"
                    style={{ 
                      paddingLeft: '2.5rem', 
                      fontSize: '0.875rem',
                      background: themeColors.inputBg,
                      color: themeColors.textPrimary,
                      border: `2px solid ${themeColors.border}`
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-content" style={{ padding: 0 }}>
              {filteredCVs.length === 0 ? (
                <div style={{ 
                  padding: '3rem', 
                  textAlign: 'center', 
                  color: themeColors.textSecondary 
                }}>
                  {searchTerm ? 'Aramanızla eşleşen CV bulunamadı.' : 'Henüz CV oluşturmadınız.'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {filteredCVs.map((cv, index) => (
                    <div key={cv.id} style={{ 
                      padding: '1.5rem',
                      borderBottom: index < filteredCVs.length - 1 ? `1px solid ${themeColors.border}` : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '3rem',
                          height: '3rem',
                          backgroundColor: settings.preferences.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : '#f3f4f6',
                          borderRadius: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FileText style={{ 
                            width: '1.5rem', 
                            height: '1.5rem', 
                            color: themeColors.textSecondary 
                          }} />
                        </div>
                        <div>
                          <h3 style={{ 
                            fontWeight: '600', 
                            marginBottom: '0.25rem',
                            color: themeColors.textPrimary 
                          }}>
                            {cv.name}
                          </h3>
                          <div style={{ 
                            display: 'flex', 
                            gap: '1rem', 
                            fontSize: '0.875rem', 
                            color: themeColors.textSecondary 
                          }}>
                            <span>{cv.template}</span>
                            <span>•</span>
                            <span>{cv.lastModified}</span>
                            <span>•</span>
                            <span>{cv.views} görüntüleme</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: cv.status === 'Tamamlandı' ? 
                            (settings.preferences.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5') : 
                            (settings.preferences.theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7'),
                          color: cv.status === 'Tamamlandı' ? '#059669' : '#d97706'
                        }}>
                          {cv.status}
                        </span>
                        <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '0.5rem' }}>
                          <button 
                            style={{ 
                              padding: '0.5rem',
                              backgroundColor: 'transparent',
                              color: themeColors.textSecondary,
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease'
                            }}
                            title={t('preview')}
                            onClick={() => handleView(cv)}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = settings.preferences.theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.8)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Eye style={{ width: '1rem', height: '1rem' }} />
                          </button>
                          <button 
                            style={{ 
                              padding: '0.5rem',
                              backgroundColor: 'transparent',
                              color: themeColors.textSecondary,
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease'
                            }}
                            title={t('edit')}
                            onClick={() => handleEdit(cv)}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = settings.preferences.theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.8)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Edit3 style={{ width: '1rem', height: '1rem' }} />
                          </button>
                          <button 
                            style={{ 
                              padding: '0.5rem',
                              backgroundColor: 'transparent',
                              color: isDownloading === cv.id ? '#3b82f6' : themeColors.textSecondary,
                              border: 'none',
                              cursor: isDownloading === cv.id ? 'not-allowed' : 'pointer',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease'
                            }}
                            title={isDownloading === cv.id ? 'İndiriliyor...' : t('download')}
                            onClick={() => handleDownload(cv)}
                            disabled={isDownloading === cv.id}
                          >
                            <Download 
                              style={{ 
                                width: '1rem', 
                                height: '1rem',
                                animation: isDownloading === cv.id ? 'spin 1s linear infinite' : 'none'
                              }} 
                            />
                          </button>
                          <button 
                            style={{ 
                              padding: '0.5rem',
                              backgroundColor: 'transparent',
                              color: '#ef4444',
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease'
                            }}
                            title={t('delete')}
                            onClick={() => openDeleteModal(cv)}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Trash2 style={{ width: '1rem', height: '1rem' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sağ Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Son Aktiviteler */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title" style={{ fontSize: '1.125rem' }}>Son Aktiviteler</h3>
              </div>
              <div className="card-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '500',
                        color: themeColors.textPrimary 
                      }}>
                        {activity.action}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: themeColors.textSecondary 
                      }}>
                        {activity.cv}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: themeColors.textSecondary,
                        opacity: 0.7
                      }}>
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium CTA */}
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              textAlign: 'center' 
            }}>
              <div className="card-content" style={{ padding: '2rem' }}>
                <Crown style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 1rem', color: '#fbbf24' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Premium'a Geç
                </h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' }}>
                  Daha fazla şablon, gelişmiş özellikler ve öncelikli destek
                </p>
                <Link href="/premium" className="btn" style={{ 
                  backgroundColor: 'white', 
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}>
                  Şimdi Yükselt
                </Link>
              </div>
            </div>

            {/* Hızlı İstatistikler */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title" style={{ fontSize: '1.125rem' }}>
                  <BarChart3 style={{ width: '1rem', height: '1rem' }} />
                  Bu Hafta
                </h3>
              </div>
              <div className="card-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: themeColors.textSecondary 
                    }}>
                      {t('views')}
                    </span>
                    <span style={{ 
                      fontWeight: '600',
                      color: themeColors.textPrimary 
                    }}>
                      +{cvs.reduce((sum, cv) => sum + cv.views, 0)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: themeColors.textSecondary 
                    }}>
                      {t('downloads')}
                    </span>
                    <span style={{ 
                      fontWeight: '600',
                      color: themeColors.textPrimary 
                    }}>
                      +8
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      color: themeColors.textSecondary 
                    }}>
                      Güncelleme
                    </span>
                    <span style={{ 
                      fontWeight: '600',
                      color: themeColors.textPrimary 
                    }}>
                      2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: themeColors.cardBg,
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle style={{ width: '1.5rem', height: '1.5rem', color: '#dc2626' }} />
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  margin: 0,
                  color: themeColors.textPrimary 
                }}>
                  CV'yi Sil
                </h3>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: themeColors.textSecondary, 
                  margin: '0.25rem 0 0 0' 
                }}>
                  Bu işlem geri alınamaz.
                </p>
              </div>
            </div>
            
            <p style={{ 
              marginBottom: '2rem', 
              color: themeColors.textPrimary,
              lineHeight: '1.5' 
            }}>
              "<strong>{deleteModal.cvName}</strong>" adlı CV'yi silmek istediğinizden emin misiniz?
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={closeDeleteModal}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${themeColors.border}`,
                  backgroundColor: themeColors.cardBg,
                  color: themeColors.textPrimary,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;