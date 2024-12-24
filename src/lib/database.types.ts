export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          name: string
          date_of_birth: string
          address: string
          phone: string
          medical_history: string | null
          gender: string | null
          emergency_contact: string | null
          insurance_info: Json | null
          preferred_language: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          date_of_birth: string
          address: string
          phone: string
          medical_history?: string
          gender?: string
          emergency_contact?: string
          insurance_info?: Json
          preferred_language?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          date_of_birth?: string
          address?: string
          phone?: string
          medical_history?: string
          gender?: string
          emergency_contact?: string
          insurance_info?: Json
          preferred_language?: string
          notes?: string
          updated_at?: string
        }
      }
      patient_conditions: {
        Row: {
          id: string
          patient_id: string
          condition: string
          status: string
          diagnosed_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          condition: string
          status: string
          diagnosed_date?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          condition?: string
          status?: string
          diagnosed_date?: string
          notes?: string
          updated_at?: string
        }
      }
      social_conditions: {
        Row: {
          id: string
          patient_id: string
          category: string
          status: 'stable' | 'at-risk' | 'critical'
          details: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          category: string
          status: 'stable' | 'at-risk' | 'critical'
          details?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          category?: string
          status?: 'stable' | 'at-risk' | 'critical'
          details?: string
          updated_at?: string
        }
      }
    }
  }
}