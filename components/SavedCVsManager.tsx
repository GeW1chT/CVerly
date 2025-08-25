// components/SavedCVsManager.tsx
"use client"

import React, { useState } from 'react';
import { 
  Save, 
  Folder, 
  Download, 
  Upload, 
  Trash2, 
  Copy, 
  Clock, 
  FileText,
  MoreVertical,
  AlertCircle,
  HardDrive
} from 'lucide-react';
import { useCVStorage, CVData } from '../lib/storage';

interface SavedCVsManagerProps {
  currentCVData: CVData;
  onLoadCV: (data: CVData) => void;
  onSaveSuccess?: (id: string) => void;
}

export default function SavedCVsManager({ 
  currentCVData, 
  onLoadCV, 
  onSaveSuccess 
}: SavedCVsManagerProps) {
  const {
    savedCVs,
    currentCVId,
    storageUsage,
    saveCV,
    updateCV,
    deleteCV,
    duplicateCV,
    loadCV,
    exportCV,
    importCV,
    refreshData
  } = useCVStorage();

  const [isOpen, setIsOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // CV kaydet
  const handleSaveCV = async () => {
    try {
      const name = saveName.trim() || `CV - ${new Date().toLocaleDateString('tr-TR')}`;
      const id = await saveCV(name, currentCVData);
      setSaveModalOpen(false);
      setSaveName('');
      onSaveSuccess?.(id);
      alert('CV başarıyla kaydedildi!');
    } catch (error) {
      alert(`Kaydetme hatası: ${error}`);
    }
  };

  // CV güncelle
  const handleUpdateCV = async (id: string) => {
    try {
      await updateCV(id, currentCVData);
      alert('CV başarıyla güncellendi!');
    } catch (error) {
      alert(`Güncelleme hatası: ${error}`);
    }
  };

  // CV yükle
  const handleLoadCV = async (id: string) => {
    try {
      const data = await loadCV(id);
      if (data) {
        onLoadCV(data);
        setIsOpen(false);
        alert('CV başarıyla yüklendi!');
      }
    } catch (error) {
      alert(`Yükleme hatası: ${error}`);
    }
  };

  // CV sil
  const handleDeleteCV = async (id: string) => {
    try {
      await deleteCV(id);
      setShowDeleteConfirm(null);
      alert('CV başarıyla silindi!');
    } catch (error) {
      alert(`Silme hatası: ${error}`);
    }
  };

  // CV kopyala
  const handleDuplicateCV = async (id: string) => {
    try {
      await duplicateCV(id);
      alert('CV başarıyla kopyalandı!');
    } catch (error) {
      alert(`Kopyalama hatası: ${error}`);
    }
  };

  // CV export et
  const handleExportCV = (id: string) => {
    try {
      const jsonData = exportCV(id);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Export hatası: ${error}`);
    }
  };

  // CV import et
  const handleImportCV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          await importCV(text);
          alert('CV başarıyla içe aktarıldı!');
        } catch (error) {
          alert(`İçe aktarma hatası: ${error}`);
        }
      }
    };
    input.click();
  };

  // Dosya boyutunu formatla
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Tarihi formatla
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Kaydet Butonu */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => setSaveModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#059669';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#10b981';
          }}
        >
          <Save style={{ width: '1rem', height: '1rem' }} />
          Kaydet
        </button>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#3b82f6';
          }}
        >
          <Folder style={{ width: '1rem', height: '1rem' }} />
          CV Yönet ({savedCVs.length})
        </button>
      </div>

      {/* Kaydet Modal */}
      {saveModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            maxWidth: '28rem',
            width: '90%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              CV'nizi Kaydedin
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                CV Adı
              </label>
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder={`CV - ${new Date().toLocaleDateString('tr-TR')}`}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setSaveModalOpen(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                İptal
              </button>
              <button
                onClick={handleSaveCV}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV Yönetim Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '0.75rem',
            maxWidth: '56rem',
            width: '95%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  Kaydedilen CV'ler ({savedCVs.length})
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  CV'lerinizi yönetin, yükleyin ve organize edin
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '0.5rem',
                  background: 'none',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            {/* Storage Usage */}
            <div style={{
              padding: '1rem 1.5rem',
              background: '#f8fafc',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <HardDrive style={{ width: '1rem', height: '1rem' }} />
                  Depolama Kullanımı
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {formatFileSize(storageUsage.used)} / {formatFileSize(storageUsage.total)}
                </div>
              </div>
              <div style={{
                background: '#e5e7eb',
                height: '0.5rem',
                borderRadius: '0.25rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: storageUsage.percentage > 80 ? '#ef4444' : 
                           storageUsage.percentage > 60 ? '#f59e0b' : '#10b981',
                  height: '100%',
                  width: `${Math.min(storageUsage.percentage, 100)}%`,
                  transition: 'all 0.3s'
                }} />
              </div>
            </div>

            {/* Import/Export Actions */}
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              gap: '0.75rem'
            }}>
              <button
                onClick={handleImportCV}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <Upload style={{ width: '1rem', height: '1rem' }} />
                İçe Aktar
              </button>
            </div>

            {/* CV List */}
            <div style={{
              maxHeight: '24rem',
              overflow: 'auto',
              padding: '1rem'
            }}>
              {savedCVs.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#6b7280'
                }}>
                  <Folder style={{
                    width: '3rem',
                    height: '3rem',
                    margin: '0 auto 1rem',
                    color: '#d1d5db'
                  }} />
                  <p style={{ marginBottom: '0.5rem' }}>Henüz kaydedilen CV yok</p>
                  <p style={{ fontSize: '0.875rem' }}>
                    İlk CV'nizi kaydetmek için "Kaydet" butonunu kullanın
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {savedCVs.map((cv) => (
                    <div
                      key={cv.id}
                      style={{
                        border: `1px solid ${currentCVId === cv.id ? '#3b82f6' : '#e5e7eb'}`,
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        background: currentCVId === cv.id ? '#eff6ff' : 'white',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.25rem'
                          }}>
                            <FileText style={{ width: '1rem', height: '1rem', color: '#3b82f6' }} />
                            <h4 style={{
                              fontSize: '1rem',
                              fontWeight: '600',
                              color: '#1f2937'
                            }}>
                              {cv.name}
                            </h4>
                            {currentCVId === cv.id && (
                              <span style={{
                                background: '#10b981',
                                color: 'white',
                                fontSize: '0.75rem',
                                padding: '0.125rem 0.5rem',
                                borderRadius: '1rem'
                              }}>
                                Aktif
                              </span>
                            )}
                          </div>
                          <div style={{
                            display: 'flex',
                            gap: '1rem',
                            fontSize: '0.75rem',
                            color: '#6b7280'
                          }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                              {formatDate(cv.updatedAt)}
                            </span>
                            <span>
                              {cv.data.personalInfo?.firstName} {cv.data.personalInfo?.lastName}
                            </span>
                          </div>
                        </div>

                        <div style={{
                          position: 'relative',
                          display: 'inline-block'
                        }}>
                          <button
                            onClick={() => setSelectedCV(selectedCV === cv.id ? null : cv.id)}
                            style={{
                              padding: '0.25rem',
                              background: 'none',
                              border: 'none',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                              color: '#6b7280'
                            }}
                          >
                            <MoreVertical style={{ width: '1rem', height: '1rem' }} />
                          </button>

                          {selectedCV === cv.id && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              right: 0,
                              background: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '0.5rem',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                              zIndex: 10,
                              minWidth: '12rem'
                            }}>
                              <button
                                onClick={() => {
                                  handleLoadCV(cv.id);
                                  setSelectedCV(null);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem 1rem',
                                  background: 'none',
                                  border: 'none',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  fontSize: '0.875rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  color: '#374151'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                              >
                                <FileText style={{ width: '1rem', height: '1rem' }} />
                                Yükle
                              </button>

                              {currentCVId === cv.id && (
                                <button
                                  onClick={() => {
                                    handleUpdateCV(cv.id);
                                    setSelectedCV(null);
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#374151'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                >
                                  <Save style={{ width: '1rem', height: '1rem' }} />
                                  Güncelle
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  handleDuplicateCV(cv.id);
                                  setSelectedCV(null);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem 1rem',
                                  background: 'none',
                                  border: 'none',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  fontSize: '0.875rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  color: '#374151'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                              >
                                <Copy style={{ width: '1rem', height: '1rem' }} />
                                Kopyala
                              </button>

                              <button
                                onClick={() => {
                                  handleExportCV(cv.id);
                                  setSelectedCV(null);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem 1rem',
                                  background: 'none',
                                  border: 'none',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  fontSize: '0.875rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  color: '#374151'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                              >
                                <Download style={{ width: '1rem', height: '1rem' }} />
                                Export
                              </button>

                              <div style={{ height: '1px', background: '#e5e7eb', margin: '0.25rem 0' }} />

                              <button
                                onClick={() => {
                                  setShowDeleteConfirm(cv.id);
                                  setSelectedCV(null);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem 1rem',
                                  background: 'none',
                                  border: 'none',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  fontSize: '0.875rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  color: '#dc2626'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                              >
                                <Trash2 style={{ width: '1rem', height: '1rem' }} />
                                Sil
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CV Preview Info */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '0.75rem',
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        <div>
                          <span style={{ fontWeight: '500' }}>Deneyim:</span> {cv.data.experience?.length || 0}
                        </div>
                        <div>
                          <span style={{ fontWeight: '500' }}>Eğitim:</span> {cv.data.education?.length || 0}
                        </div>
                        <div>
                          <span style={{ fontWeight: '500' }}>Beceri:</span> {cv.data.skills?.length || 0}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '0.75rem'
                      }}>
                        <button
                          onClick={() => handleLoadCV(cv.id)}
                          style={{
                            padding: '0.375rem 0.75rem',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                        >
                          Yükle
                        </button>

                        {currentCVId === cv.id && (
                          <button
                            onClick={() => handleUpdateCV(cv.id)}
                            style={{
                              padding: '0.375rem 0.75rem',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '0.375rem',
                              fontSize: '0.75rem',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#10b981'}
                          >
                            Güncelle
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100
        }}>
          <div style={{
            background: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            maxWidth: '24rem',
            width: '90%',
            textAlign: 'center'
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <AlertCircle style={{ width: '1.5rem', height: '1.5rem', color: '#dc2626' }} />
            </div>

            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              CV'yi Sil
            </h3>

            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '1.5rem'
            }}>
              Bu CV'yi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>

            <div style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                İptal
              </button>
              <button
                onClick={() => handleDeleteCV(showDeleteConfirm)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}