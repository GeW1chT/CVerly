// components/forms/CVFormWizard.tsx
interface CVFormWizardProps {
  initialData?: CVData;
  onSave: (data: CVData) => void;
  onPreview: (data: CVData) => void;
}

// Adımlar:
// 1. Kişisel Bilgiler
// 2. İş Deneyimi  
// 3. Eğitim
// 4. Beceriler
// 5. Diller & Projeler
// 6. Önizleme & İndir