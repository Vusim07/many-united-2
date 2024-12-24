export interface CHWData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface AdminStats {
  totalCHWs: number;
  activeCHWs: number;
  totalDoctors: number;
  totalPatients: number;
  totalVisits: number;
}

export interface SystemSettings {
  emailNotifications: boolean;
  autoAssignment: boolean;
  maxVisitsPerDay: number;
  requireVisitApproval: boolean;
  maintenanceMode: boolean;
}

export interface SystemMetrics {
  activeUsers: number;
  totalVisits: number;
  completionRate: number;
  averageResponseTime: number;
}