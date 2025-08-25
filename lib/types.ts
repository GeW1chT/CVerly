// lib/types.ts
export interface CVData {
  id: string;
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects?: Project[];
  certifications?: Certification[];
  template: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Language' | 'Soft' | 'Other';
}

export interface Language {
  id: string;
  name: string;
  level: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  url?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'Modern' | 'Classic' | 'Creative' | 'Academic';
  preview: string;
  isPremium: boolean;
  colors: TemplateColor[];
}

export interface TemplateColor {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isPremium: boolean;
  subscriptionDate?: Date;
  cvCount: number;
  createdAt: Date;
}

// Utility Types
export type CVFormData = Omit<CVData, 'id' | 'createdAt' | 'updatedAt'>;
export type PersonalInfoFormData = PersonalInfo;
export type ExperienceFormData = Omit<WorkExperience, 'id'>;
export type EducationFormData = Omit<Education, 'id'>;

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PdfGenerationResponse {
  success: boolean;
  pdfUrl?: string;
  error?: string;
}