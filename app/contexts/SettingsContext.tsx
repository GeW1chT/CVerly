// app/contexts/SettingsContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserSettings {
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    autoSave: boolean;
    showTips: boolean;
  };
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    allowAnalytics: boolean;
  };
}

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateProfile: (field: string, value: string) => void;
  updatePreference: (field: string, value: boolean | string) => void;
  updatePrivacy: (field: string, value: boolean | string) => void;
  isLoading: boolean;
}

const defaultSettings: UserSettings = {
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

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Settings yüklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply theme and language to document
  useEffect(() => {
    if (!isLoading) {
      // Theme uygula
      document.documentElement.setAttribute('data-theme', settings.preferences.theme);
      document.body.className = settings.preferences.theme === 'dark' ? 'dark-theme' : 'light-theme';
      
      // Language uygula
      document.documentElement.setAttribute('lang', settings.preferences.language);
      document.documentElement.setAttribute('data-language', settings.preferences.language);
    }
  }, [settings.preferences.theme, settings.preferences.language, isLoading]);

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateProfile = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const updatePreference = (field: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const updatePrivacy = (field: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value
      }
    }));
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      updateProfile,
      updatePreference,
      updatePrivacy,
      isLoading
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// Translation helper
export const useTranslation = () => {
  const { settings } = useSettings();
  
  const translations = {
    tr: {
      dashboard: 'Dashboard',
      cvs: 'CV\'lerim',
      templates: 'Şablonlar',
      settings: 'Ayarlar',
      profile: 'Profil',
      newCV: 'Yeni CV Oluştur',
      edit: 'Düzenle',
      delete: 'Sil',
      download: 'İndir',
      preview: 'Önizleme',
      save: 'Kaydet',
      search: 'Ara...',
      totalCVs: 'Toplam CV',
      views: 'Görüntüleme',
      downloads: 'İndirme',
      lastUpdate: 'Son Güncelleme'
    },
    en: {
      dashboard: 'Dashboard',
      cvs: 'My CVs',
      templates: 'Templates',
      settings: 'Settings',
      profile: 'Profile',
      newCV: 'Create New CV',
      edit: 'Edit',
      delete: 'Delete',
      download: 'Download',
      preview: 'Preview',
      save: 'Save',
      search: 'Search...',
      totalCVs: 'Total CVs',
      views: 'Views',
      downloads: 'Downloads',
      lastUpdate: 'Last Update'
    },
    de: {
      dashboard: 'Dashboard',
      cvs: 'Meine CVs',
      templates: 'Vorlagen',
      settings: 'Einstellungen',
      profile: 'Profil',
      newCV: 'Neuen CV erstellen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      download: 'Herunterladen',
      preview: 'Vorschau',
      save: 'Speichern',
      search: 'Suchen...',
      totalCVs: 'Gesamt CVs',
      views: 'Aufrufe',
      downloads: 'Downloads',
      lastUpdate: 'Letztes Update'
    },
    fr: {
      dashboard: 'Tableau de bord',
      cvs: 'Mes CVs',
      templates: 'Modèles',
      settings: 'Paramètres',
      profile: 'Profil',
      newCV: 'Créer un nouveau CV',
      edit: 'Modifier',
      delete: 'Supprimer',
      download: 'Télécharger',
      preview: 'Aperçu',
      save: 'Enregistrer',
      search: 'Rechercher...',
      totalCVs: 'Total CVs',
      views: 'Vues',
      downloads: 'Téléchargements',
      lastUpdate: 'Dernière mise à jour'
    }
  };

  const t = (key: string) => {
    const lang = settings.preferences.language as keyof typeof translations;
    return translations[lang]?.[key as keyof typeof translations.tr] || translations.tr[key as keyof typeof translations.tr] || key;
  };

  return { t, currentLanguage: settings.preferences.language };
};

// Theme utility functions
export const getThemeColors = (theme: 'light' | 'dark') => {
  return theme === 'dark' ? {
    background: '#111827',
    cardBg: 'rgba(31, 41, 55, 0.95)',
    textPrimary: '#f9fafb',
    textSecondary: '#d1d5db',
    border: 'rgba(75, 85, 99, 0.3)',
    inputBg: 'rgba(55, 65, 81, 0.8)'
  } : {
    background: '#f8fafc',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    border: 'rgba(229, 231, 235, 0.8)',
    inputBg: 'rgba(249, 250, 251, 0.8)'
  };
};