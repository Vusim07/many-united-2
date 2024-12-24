export interface VisitUpdate {
  id: string;
  visitId: string;
  type: 'note' | 'vital' | 'medication' | 'status';
  content: string;
  timestamp: string;
  chwId: string;
}

export interface VitalSign {
  type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'blood_sugar' | 'oxygen';
  value: string;
  unit: string;
  timestamp: string;
}

export interface VisitDetails extends VisitRequest {
  updates: VisitUpdate[];
  vitals?: VitalSign[];
}