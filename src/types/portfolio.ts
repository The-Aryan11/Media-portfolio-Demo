export interface Publication {
  id: string;
  title: string;
  publication: string;
  date: string;
  category: string;
  excerpt: string;
  fullText: string;
  imageUrl: string;
  readTime: string;
  accentColor?: string;
}

export interface PressItem {
  id: string;
  title: string;
  outlet: string;
  format: 'TV Interview' | 'Podcast' | 'Keynote' | 'Roundtable';
  date: string;
  location: string;
  duration: string;
  imageUrl: string;
  summary: string;
}
