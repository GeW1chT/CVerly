// lib/storage.ts
import { useState, useEffect } from 'react';

export interface CVData {
  personalInfo: any;
  experience: any[];
  education: any[];
  skills: any[];
  languages?: any[];
  lastModified: string;
  version: string;
}

export interface SavedCV {
  id: string;
  name: string;
  data: CVData;
  createdAt: string;
  updatedAt: string;
}

export class CVStorage {
  private static readonly STORAGE_KEY = 'cverly_saved_cvs';
  private static readonly CURRENT_CV_KEY = 'cverly_current_cv';
  private static readonly AUTO_SAVE_KEY = 'cverly_auto_save';
  private static readonly VERSION = '1.0.0';

  // Tüm kaydedilen CV'leri getir
  static getSavedCVs(): SavedCV[] {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('CV verilerini okuma hatası:', error);
      return [];
    }
  }

  // Yeni CV kaydet
  static saveCV(name: string, data: CVData): string {
    try {
      const savedCVs = this.getSavedCVs();
      const id = this.generateId();
      const now = new Date().toISOString();

      const newCV: SavedCV = {
        id,
        name: name || `CV - ${new Date().toLocaleDateString('tr-TR')}`,
        data: {
          ...data,
          lastModified: now,
          version: this.VERSION
        },
        createdAt: now,
        updatedAt: now
      };

      savedCVs.push(newCV);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedCVs));
      
      // Son çalışılan CV olarak işaretle
      this.setCurrentCV(id);
      
      return id;
    } catch (error) {
      console.error('CV kaydetme hatası:', error);
      throw new Error('CV kaydedilemedi. Tarayıcı depolama alanı dolu olabilir.');
    }
  }

  // Mevcut CV'yi güncelle
  static updateCV(id: string, data: CVData): void {
    try {
      const savedCVs = this.getSavedCVs();
      const index = savedCVs.findIndex(cv => cv.id === id);
      
      if (index === -1) {
        throw new Error('Güncellenecek CV bulunamadı');
      }

      savedCVs[index].data = {
        ...data,
        lastModified: new Date().toISOString(),
        version: this.VERSION
      };
      savedCVs[index].updatedAt = new Date().toISOString();

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(savedCVs));
    } catch (error) {
      console.error('CV güncelleme hatası:', error);
      throw new Error('CV güncellenemedi');
    }
  }

  // CV yükle
  static loadCV(id: string): CVData | null {
    try {
      const savedCVs = this.getSavedCVs();
      const cv = savedCVs.find(cv => cv.id === id);
      
      if (!cv) {
        return null;
      }

      // Son çalışılan CV olarak işaretle
      this.setCurrentCV(id);
      
      return cv.data;
    } catch (error) {
      console.error('CV yükleme hatası:', error);
      return null;
    }
  }

  // CV sil
  static deleteCV(id: string): void {
    try {
      const savedCVs = this.getSavedCVs();
      const filteredCVs = savedCVs.filter(cv => cv.id !== id);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredCVs));
      
      // Eğer silinen CV şu anki CV ise, temizle
      if (this.getCurrentCVId() === id) {
        this.clearCurrentCV();
      }
    } catch (error) {
      console.error('CV silme hatası:', error);
      throw new Error('CV silinemedi');
    }
  }

  // CV kopyala
  static duplicateCV(id: string): string {
    try {
      const cv = this.getSavedCVs().find(cv => cv.id === id);
      if (!cv) {
        throw new Error('Kopyalanacak CV bulunamadı');
      }

      return this.saveCV(`${cv.name} (Kopya)`, cv.data);
    } catch (error) {
      console.error('CV kopyalama hatası:', error);
      throw new Error('CV kopyalanamadı');
    }
  }

  // Otomatik kaydetme
  static autoSave(data: CVData): void {
    try {
      const autoSaveData = {
        data,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(this.AUTO_SAVE_KEY, JSON.stringify(autoSaveData));
    } catch (error) {
      console.error('Otomatik kaydetme hatası:', error);
    }
  }

  // Otomatik kaydedilen veriyi getir
  static getAutoSaved(): CVData | null {
    try {
      const saved = localStorage.getItem(this.AUTO_SAVE_KEY);
      if (!saved) return null;

      const parsed = JSON.parse(saved);
      const savedTime = new Date(parsed.timestamp).getTime();
      const now = new Date().getTime();
      
      // 1 saatten eski otomatik kayıtları sil
      if (now - savedTime > 3600000) {
        this.clearAutoSave();
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error('Otomatik kayıt okuma hatası:', error);
      return null;
    }
  }

  // Otomatik kayıt temizle
  static clearAutoSave(): void {
    localStorage.removeItem(this.AUTO_SAVE_KEY);
  }

  // Şu anki CV ID'sini ayarla
  static setCurrentCV(id: string): void {
    localStorage.setItem(this.CURRENT_CV_KEY, id);
  }

  // Şu anki CV ID'sini getir
  static getCurrentCVId(): string | null {
    return localStorage.getItem(this.CURRENT_CV_KEY);
  }

  // Şu anki CV temizle
  static clearCurrentCV(): void {
    localStorage.removeItem(this.CURRENT_CV_KEY);
  }

  // CV verilerini JSON olarak export et
  static exportCV(id: string): string {
    const cv = this.getSavedCVs().find(cv => cv.id === id);
    if (!cv) {
      throw new Error('Export edilecek CV bulunamadı');
    }

    return JSON.stringify(cv, null, 2);
  }

  // JSON'dan CV import et
  static importCV(jsonData: string): string {
    try {
      const cvData = JSON.parse(jsonData);
      
      // Veri formatını kontrol et
      if (!cvData.data || !cvData.name) {
        throw new Error('Geçersiz CV formatı');
      }

      return this.saveCV(`${cvData.name} (İçe Aktarılan)`, cvData.data);
    } catch (error) {
      console.error('CV import hatası:', error);
      throw new Error('CV içe aktarılamadı. Dosya formatı geçersiz.');
    }
  }

  // Depolama alanı kullanımını hesapla
  static getStorageUsage(): { used: number; total: number; percentage: number } {
    try {
      let used = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length;
        }
      }

      // Tahmini maksimum localStorage kapasitesi (genellikle 5-10MB)
      const total = 5 * 1024 * 1024; // 5MB
      const percentage = (used / total) * 100;

      return { used, total, percentage };
    } catch (error) {
      return { used: 0, total: 0, percentage: 0 };
    }
  }

  // Tüm CVerly verilerini temizle
  static clearAllData(): void {
    const keys = [this.STORAGE_KEY, this.CURRENT_CV_KEY, this.AUTO_SAVE_KEY];
    keys.forEach(key => localStorage.removeItem(key));
  }

  // Benzersiz ID oluştur
  private static generateId(): string {
    return `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // CV verilerini doğrula
  static validateCVData(data: any): boolean {
    try {
      return (
        data &&
        typeof data === 'object' &&
        (data.personalInfo || data.experience || data.education || data.skills)
      );
    } catch {
      return false;
    }
  }

  // Son aktiflik zamanını güncelle
  static updateLastActivity(): void {
    localStorage.setItem('cverly_last_activity', new Date().toISOString());
  }

  // Son aktiflik zamanını getir
  static getLastActivity(): Date | null {
    const activity = localStorage.getItem('cverly_last_activity');
    return activity ? new Date(activity) : null;
  }
}

// React Hook - CV Storage için
export function useCVStorage() {
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [currentCVId, setCurrentCVId] = useState<string | null>(null);
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 0, percentage: 0 });

  // Component mount olduğunda verileri yükle
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setSavedCVs(CVStorage.getSavedCVs());
    setCurrentCVId(CVStorage.getCurrentCVId());
    setStorageUsage(CVStorage.getStorageUsage());
  };

  const saveCV = (name: string, data: CVData) => {
    const id = CVStorage.saveCV(name, data);
    refreshData();
    return id;
  };

  const updateCV = (id: string, data: CVData) => {
    CVStorage.updateCV(id, data);
    refreshData();
  };

  const deleteCV = (id: string) => {
    CVStorage.deleteCV(id);
    refreshData();
  };

  const duplicateCV = (id: string) => {
    const newId = CVStorage.duplicateCV(id);
    refreshData();
    return newId;
  };

  const loadCV = (id: string) => {
    const data = CVStorage.loadCV(id);
    refreshData();
    return data;
  };

  return {
    savedCVs,
    currentCVId,
    storageUsage,
    saveCV,
    updateCV,
    deleteCV,
    duplicateCV,
    loadCV,
    refreshData,
    exportCV: CVStorage.exportCV,
    importCV: CVStorage.importCV,
    autoSave: CVStorage.autoSave,
    getAutoSaved: CVStorage.getAutoSaved,
    clearAutoSave: CVStorage.clearAutoSave
  };
}