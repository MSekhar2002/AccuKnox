export interface Widget {
  id: string;
  title: string;
  type: string;
  data?: unknown;
  content?: string;
}

export interface Category {
  id: string;
  name: string;
  widgets: string[];
  type: 'CSPM' | 'CWPP' | 'Image' | 'Ticket' | 'General';
}

export interface DashboardState {
  categories: Category[];
  widgets: Record<string, Widget>;
  searchQuery: string;
} 