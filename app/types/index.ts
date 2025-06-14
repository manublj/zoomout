export interface Phase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
  phaseId: string;
  type: 'milestone' | 'task' | 'note';
  status: 'completed' | 'in-progress' | 'pending';
}

export interface Filter {
  id: string;
  name: string;
  active: boolean;
  type: 'phase' | 'event';
}

export interface TimelineData {
  phases: Phase[];
  events: Event[];
  filters: Filter[];
}

export interface TimelineContextType {
  data: TimelineData;
  selectedPhase: Phase | null;
  selectedEvent: Event | null;
  setSelectedPhase: (phase: Phase | null) => void;
  setSelectedEvent: (event: Event | null) => void;
  activeFilters: Filter[];
  toggleFilter: (filterId: string) => void;
} 