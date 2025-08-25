// lib/cv-context.tsx
interface CVContextType {
  cvData: CVData;
  updateCVData: (data: Partial<CVData>) => void;
  saveToDraft: () => void;
  loadFromDraft: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}