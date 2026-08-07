export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  team: string;
  status: 'In Progress' | 'Completed';
  date: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
  score?: string;
  image?: string;
  details?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Scouting' | 'Hackathon' | 'Music & Arts' | 'Language' | 'Other';
  rank?: string;
  description: string;
  year: string;
  image?: string;
  secondaryImage?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
  score: string;
  highlights: string[];
}

export interface HobbyItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export interface ProfileData {
  name: string;
  title: string;
  role: string;
  tagline: string;
  cgpa: string;
  email: string;
  collegeEmail?: string;
  phone: string;
  location: string;
  linkedin: string;
  naukri?: string;
  github: string;
  leetcode: string;
  bio: string;
  profilePic: string;
  skills: {
    languages: string[];
    webDev: string[];
    databases: string[];
    mlAi: string[];
    tools: string[];
    softSkills: string[];
  };
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  education: EducationItem[];
  hobbies: HobbyItem[];
  leetcodeStats: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    submissions: number;
    streakDays: number;
  };
}

export type ThemeMode = 'glossy-glass' | 'classic-aesthetic' | 'vs-dark' | 'quantum' | 'emerald' | 'sunset' | 'vs-light';

export type FileId = 
  | 'home.tsx' 
  | 'about.html' 
  | 'projects.jsx' 
  | 'certificates.md' 
  | 'achievements.json' 
  | 'hobbies.ts'
  | 'leetcode.ts' 
  | 'github.rs' 
  | 'contact.css' 
  | 'resume.pdf';
