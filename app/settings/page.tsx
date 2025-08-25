// app/settings/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Download,
  Trash2,
  Save,
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  Crown
} from 'lucide-react';

export default function SettingsPage() {
  // User settings state
  const [userSettings, setUserSettings] = useState(() => {
    // Load from localStorage on first render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userSettings');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      profile: {
        name: 'Ahmet Yılmaz',
        email: 'ahmet.yilmaz@email.com',
        phone: '+90 555 123 4567',
        location: 'İstanbul, Türkiye'
      },
      preferences: {
        theme: 'light',
        language: 'tr',
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: true,
        autoSave: true,
        showTips: true
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        allowAnalytics: true
      }
    };
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  // Apply theme changes immediately
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', userSettings.preferences.theme);
    document.documentElement.setAttribute('data-language', userSettings.preferences.language);
  }, [userSettings.preferences.theme, userSettings.preferences.language]);

  // Update functions
  const updateProfile = (field: string, value: string) => {
    setUserSettings((prev: typeof userSettings) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const updatePreference = (field: string, value: boolean | string) => {
    setUserSettings((prev: typeof userSettings) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
    
    // Show immediate feedback for some settings
    if (field === 'theme') {
      const themeMsg = value === 'dark' ? 'Koyu tema aktifleştirildi!' : 'Açık tema aktifleştirildi!';
      showNotification(themeMsg, '#8b5cf6');
    }
    
    if (field === 'language') {
      const langMsg = getLanguageMessage(value as string);
      showNotification(langMsg, '#3b82f6');
    }
  };

  const updatePrivacy = (field: string, value: boolean | string) => {
    setUserSettings((prev: typeof userSettings) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  // Language messages
  const getLanguageMessage = (lang: string) => {
    const messages = {
      'tr': 'Dil Türkçe olarak değiştirildi!',
      'en': 'Language changed to English!',
      'de': 'Sprache wurde auf Deutsch geändert!',
      'fr': 'Langue changée en français!'
    };
    return messages[lang as keyof typeof messages] || 'Dil değiştirildi!';
  };

  // Show notification helper
  const showNotification = (message: string, color: string) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${color};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      font-weight: 600;
      font-size: 0.875rem;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 2000);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simüle edilmiş kaydetme
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Settings'i localStorage'a kaydet
      localStorage.setItem('userSettings', JSON.stringify(userSettings));
      
      // Success notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        font-weight: 600;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `;
      
      notification.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        Ayarlar başarıyla kaydedildi!
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 3000);
      
    } catch (error) {
      alert('Ayarlar kaydedilirken bir hata oluştu!');
    } finally {
      setIsSaving(false);
    }
  };

  // Export data
  const handleExportData = () => {
    const dataToExport = {
      userSettings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `cverly_data_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    alert('Verileriniz başarıyla dışa aktarıldı!');
  };

  // Delete account
  const handleDeleteAccount = () => {
    if (confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      // Simüle edilmiş hesap silme
      alert('Hesap silme işlemi başlatıldı. E-postanızı kontrol edin.');
      setShowDeleteAccount(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.1
      }} />
      
      {/* Header */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)', 
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link href="/dashboard" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                background: 'rgba(107, 114, 128, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                Dashboard&apos;a Dön
              </Link>
              
              <div style={{ height: '2rem', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
              
              <div>
                <h1 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '700', 
                  color: '#1f2937',
                  margin: 0 
                }}>
                  Ayarlar
                </h1>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  margin: '0.25rem 0 0 0',
                  fontWeight: '500'
                }}>
                  Hesap ve uygulama ayarlarınızı yönetin
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                background: isSaving ? 'rgba(156, 163, 175, 0.8)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              <Save style={{ 
                width: '1.125rem', 
                height: '1.125rem',
                animation: isSaving ? 'spin 1s linear infinite' : 'none'
              }} />
              {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 1
      }}>

        {/* Profile Settings */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              <User style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: 0 
              }}>
                Profil Bilgileri
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontWeight: '500'
              }}>
                Kişisel bilgilerinizi güncelleyin
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <User style={{ width: '1rem', height: '1rem' }} />
                Ad Soyad
              </label>
              <input
                type="text"
                value={userSettings.profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
                E-posta
              </label>
              <input
                type="email"
                value={userSettings.profile.email}
                onChange={(e) => updateProfile('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
                Telefon
              </label>
              <input
                type="tel"
                value={userSettings.profile.phone}
                onChange={(e) => updateProfile('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.75rem'
              }}>
                <MapPin style={{ width: '1rem', height: '1rem' }} />
                Konum
              </label>
              <input
                type="text"
                value={userSettings.profile.location}
                onChange={(e) => updateProfile('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'rgba(249, 250, 251, 0.8)',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div style={{ 
          background: userSettings.preferences.theme === 'dark' 
            ? 'rgba(31, 41, 55, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
            }}>
              <Palette style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: userSettings.preferences.theme === 'dark' ? '#f9fafb' : '#1f2937', 
                margin: 0 
              }}>
                Uygulama Tercihleri
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: userSettings.preferences.theme === 'dark' ? '#d1d5db' : '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontWeight: '500'
              }}>
                Uygulama deneyiminizi kişiselleştirin
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Theme Selection */}
            <div>
              <label style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: userSettings.preferences.theme === 'dark' ? '#f9fafb' : '#374151', 
                marginBottom: '1rem',
                display: 'block'
              }}>
                Tema Seçimi
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { value: 'light', label: 'Açık', icon: Sun },
                  { value: 'dark', label: 'Koyu', icon: Moon }
                ].map((theme) => {
                  const Icon = theme.icon;
                  const isSelected = userSettings.preferences.theme === theme.value;
                  return (
                    <button
                      key={theme.value}
                      onClick={() => updatePreference('theme', theme.value)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '1.25rem',
                        border: `2px solid ${isSelected ? '#10b981' : 'rgba(229, 231, 235, 0.8)'}`,
                        borderRadius: '12px',
                        background: isSelected 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)' 
                          : (userSettings.preferences.theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(249, 250, 251, 0.8)'),
                        color: isSelected ? '#059669' : (userSettings.preferences.theme === 'dark' ? '#d1d5db' : '#6b7280'),
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: isSelected ? '0 8px 25px rgba(16, 185, 129, 0.2)' : 'none'
                      }}
                      onMouseOver={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.borderColor = '#10b981';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 0.8)';
                        }
                      }}
                    >
                      <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                      {theme.label} Tema
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: userSettings.preferences.theme === 'dark' ? '#f9fafb' : '#374151', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Globe style={{ width: '1rem', height: '1rem' }} />
                Dil Seçimi
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={userSettings.preferences.language}
                  onChange={(e) => updatePreference('language', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    border: '2px solid transparent',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    background: userSettings.preferences.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(249, 250, 251, 0.8)',
                    color: userSettings.preferences.theme === 'dark' ? '#f9fafb' : '#374151',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1rem',
                    paddingRight: '3rem'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.background = userSettings.preferences.theme === 'dark' ? 'rgba(31, 41, 55, 0.9)' : 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.background = userSettings.preferences.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(249, 250, 251, 0.8)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="tr">🇹🇷 Türkçe</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="de">🇩🇪 Deutsch</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="it">🇮🇹 Italiano</option>
                </select>
              </div>
              
              {/* Language preview */}
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: userSettings.preferences.theme === 'dark' ? 'rgba(17, 24, 39, 0.5)' : 'rgba(239, 246, 255, 0.8)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: userSettings.preferences.theme === 'dark' ? '#d1d5db' : '#6b7280',
                fontStyle: 'italic'
              }}>
                Önizleme: {
                  userSettings.preferences.language === 'tr' ? 'CV oluşturucu uygulaması' :
                  userSettings.preferences.language === 'en' ? 'CV builder application' :
                  userSettings.preferences.language === 'de' ? 'Lebenslauf-Builder-Anwendung' :
                  userSettings.preferences.language === 'fr' ? 'Application de création de CV' :
                  userSettings.preferences.language === 'es' ? 'Aplicación creadora de CV' :
                  'Applicazione per creare CV'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
            }}>
              <Bell style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: 0 
              }}>
                Bildirimler
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontWeight: '500'
              }}>
                Bildirim tercihlerinizi yönetin
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { key: 'emailNotifications', label: 'E-posta Bildirimleri', desc: 'Önemli güncellemeler için e-posta alın' },
              { key: 'pushNotifications', label: 'Push Bildirimleri', desc: 'Tarayıcı bildirimleri' },
              { key: 'marketingEmails', label: 'Pazarlama E-postaları', desc: 'Özellikler ve promosyonlar hakkında bilgi alın' },
              { key: 'autoSave', label: 'Otomatik Kaydetme', desc: 'CV\'lerinizi otomatik olarak kaydedin' },
              { key: 'showTips', label: 'İpuçları Göster', desc: 'Uygulama içi yardım ipuçlarını göster' }
            ].map((setting) => (
              <div key={setting.key} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'rgba(249, 250, 251, 0.5)',
                borderRadius: '12px',
                border: '2px solid rgba(229, 231, 235, 0.8)'
              }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {setting.label}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {setting.desc}
                  </div>
                </div>
                <button
                  onClick={() => updatePreference(setting.key, !userSettings.preferences[setting.key as keyof typeof userSettings.preferences])}
                  style={{
                    width: '50px',
                    height: '30px',
                    borderRadius: '15px',
                    border: 'none',
                    background: userSettings.preferences[setting.key as keyof typeof userSettings.preferences] 
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                      : '#d1d5db',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '4px',
                    left: userSettings.preferences[setting.key as keyof typeof userSettings.preferences] ? '24px' : '4px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}>
              <Shield style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: 0 
              }}>
                Gizlilik ve Güvenlik
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontWeight: '500'
              }}>
                Veri gizliliği ayarlarınızı kontrol edin
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1.5rem',
              background: 'rgba(249, 250, 251, 0.5)',
              borderRadius: '12px',
              border: '2px solid rgba(229, 231, 235, 0.8)'
            }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                  Profil Görünürlüğü
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  CV'lerinizin kimler tarafından görülebileceğini seçin
                </div>
              </div>
              <select
                value={userSettings.privacy.profileVisibility}
                onChange={(e) => updatePrivacy('profileVisibility', e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="public">Herkese Açık</option>
                <option value="limited">Sınırlı</option>
                <option value="private">Özel</option>
              </select>
            </div>

            {[
              { key: 'showEmail', label: 'E-posta Adresini Göster', desc: 'CV\'nizde e-posta adresinizi gösterin' },
              { key: 'showPhone', label: 'Telefon Numarasını Göster', desc: 'CV\'nizde telefon numaranızı gösterin' },
              { key: 'allowAnalytics', label: 'Analitik Verilerine İzin Ver', desc: 'Uygulama geliştirme için anonim veri toplama' }
            ].map((setting) => (
              <div key={setting.key} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'rgba(249, 250, 251, 0.5)',
                borderRadius: '12px',
                border: '2px solid rgba(229, 231, 235, 0.8)'
              }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {setting.label}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {setting.desc}
                  </div>
                </div>
                <button
                  onClick={() => updatePrivacy(setting.key, !userSettings.privacy[setting.key as keyof typeof userSettings.privacy])}
                  style={{
                    width: '50px',
                    height: '30px',
                    borderRadius: '15px',
                    border: 'none',
                    background: userSettings.privacy[setting.key as keyof typeof userSettings.privacy] 
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' 
                      : '#d1d5db',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '4px',
                    left: userSettings.privacy[setting.key as keyof typeof userSettings.privacy] ? '24px' : '4px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem', 
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
            }}>
              <Download style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: 0 
              }}>
                Veri Yönetimi
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontWeight: '500'
              }}>
                Verilerinizi yedekleyin veya hesabınızı yönetin
              </p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <button
              onClick={handleExportData}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '2px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                color: '#0891b2',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download style={{ width: '1.5rem', height: '1.5rem' }} />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  Verileri Dışa Aktar
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  Tüm CV verilerinizi JSON formatında indirin
                </div>
              </div>
            </button>

            <Link 
              href="/premium"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                border: '2px solid rgba(251, 191, 36, 0.2)',
                borderRadius: '12px',
                color: '#d97706',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              <Crown style={{ width: '1.5rem', height: '1.5rem' }} />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  Premium'a Geç
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                  Gelişmiş özellikler ve şablonlar
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(239, 68, 68, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
            }}>
              <Trash2 style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#dc2626', 
                margin: 0 
              }}>
                Tehlikeli Alan
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: '0.25rem 0 0 0',
                fontWeight: '500'
              }}>
                Geri alınamaz işlemler
              </p>
            </div>
          </div>
          
          <div style={{
            padding: '1.5rem',
            background: 'rgba(254, 242, 242, 0.8)',
            borderRadius: '12px',
            border: '2px solid rgba(252, 165, 165, 0.5)'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.5rem' }}>
                Hesabı Sil
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
                Hesabınızı sildiğinizde tüm CV&apos;leriniz, verileriniz ve ayarlarınız kalıcı olarak silinecektir. 
                Bu işlem geri alınamaz.
              </div>
            </div>
            
            <button
              onClick={() => setShowDeleteAccount(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Trash2 style={{ width: '1rem', height: '1rem' }} />
              Hesabı Sil
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteAccount && (
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
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 15px 35px rgba(239, 68, 68, 0.3)'
              }}>
                <Trash2 style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626', margin: '0 0 0.5rem 0' }}>
                Hesabı Sil
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
                Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(254, 242, 242, 0.8)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              border: '1px solid rgba(252, 165, 165, 0.3)'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#dc2626', fontWeight: '600', marginBottom: '0.5rem' }}>
                Silinecek veriler:
              </p>
              <ul style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6', margin: 0, paddingLeft: '1rem' }}>
                <li>Tüm CV'leriniz ve şablonlarınız</li>
                <li>Hesap bilgileriniz</li>
                <li>Kullanım geçmişiniz</li>
                <li>Premium aboneliğiniz (varsa)</li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteAccount(false)}
                style={{
                  padding: '0.875rem 2rem',
                  borderRadius: '50px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                İptal
              </button>
              <button
                onClick={handleDeleteAccount}
                style={{
                  padding: '0.875rem 2rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Evet, Hesabı Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}