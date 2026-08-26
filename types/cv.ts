export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  photo: string | null;
}

export interface ExperienceItem {
  id: number | string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationItem {
  id: number | string;
  institution: string;
  degree: string;
  year: string;
  description: string;
}

export interface LanguageItem {
  id: number | string;
  language: string;
  level: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  role?: string;
}

export interface CvData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: LanguageItem[];
  projects: ProjectItem[];
}
