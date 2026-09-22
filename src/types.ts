export interface Opportunity {
  id: number;
  category: string;
  title: string;
  description: string;
  sex: string;
  sector: string;
  ageRange: string;
  salary: string;
  workload: string;
  city: string;
  requirements: string;
  benefits?: string[];
  tags?: string[];
}

export interface Hire {
  id: number;
  name: string;
  age: number;
  unit: string;
  neighborhood?: string;
  zone?: string;
  photoKey: string;
  role?: string;
  companySector?: string;
}

export interface VideoStory {
  id: number;
  mediaKey: string;
  mediaType: string;
  caption: string;
  authorName?: string;
  authorAge?: number;
  authorNeighborhood?: string;
  duration?: string;
}

export interface StateItem {
  uf: string;
  name: string;
  capital: string;
  polos: number;
  details?: string;
}

export interface VocationalOption {
  label: string;
  scores: {
    recepcao?: number;
    administrativo?: number;
    pedagogico?: number;
    telemarketing?: number;
  };
}

export interface VocationalQuestion {
  title: string;
  description?: string;
  options: VocationalOption[];
}

export interface Holiday {
  date: string;
  name: string;
  scope: string;
}

export interface StudentNotice {
  id: number;
  title: string;
  body: string;
  date: string;
  priority: 'normal' | 'alta';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  unit: string;
  photoUrl: string;
  bio?: string;
  responsibilities?: string[];
}

export interface LectureSession {
  id: string;
  label: string;
  period: string;
  eventTime: string;
  eventDate: string;
  maxSlots: number;
  registrations: number;
}
