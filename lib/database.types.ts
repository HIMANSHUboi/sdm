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
      disaster_alerts: {
        Row: {
          id: string
          disaster_type: string
          severity_level: string
          probability: number
          title: string
          description: string | null
          latitude: number
          longitude: number
          affected_radius_km: number | null
          status: string
          predicted_impact_time: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          disaster_type: string
          severity_level?: string
          probability?: number
          title: string
          description?: string | null
          latitude: number
          longitude: number
          affected_radius_km?: number | null
          status?: string
          predicted_impact_time?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          disaster_type?: string
          severity_level?: string
          probability?: number
          title?: string
          description?: string | null
          latitude?: number
          longitude?: number
          affected_radius_km?: number | null
          status?: string
          predicted_impact_time?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      sos_requests: {
        Row: {
          id: string
          user_name: string
          phone_number: string
          latitude: number
          longitude: number
          emergency_type: string
          people_count: number | null
          description: string | null
          status: string
          priority: string
          created_at: string | null
          resolved_at: string | null
        }
        Insert: {
          id?: string
          user_name: string
          phone_number: string
          latitude: number
          longitude: number
          emergency_type: string
          people_count?: number | null
          description?: string | null
          status?: string
          priority?: string
          created_at?: string | null
          resolved_at?: string | null
        }
        Update: {
          id?: string
          user_name?: string
          phone_number?: string
          latitude?: number
          longitude?: number
          emergency_type?: string
          people_count?: number | null
          description?: string | null
          status?: string
          priority?: string
          created_at?: string | null
          resolved_at?: string | null
        }
      }
      affected_areas: {
        Row: {
          id: string
          alert_id: string | null
          area_name: string
          latitude: number
          longitude: number
          radius_km: number | null
          population_affected: number | null
          damage_level: string | null
          evacuation_required: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          alert_id?: string | null
          area_name: string
          latitude: number
          longitude: number
          radius_km?: number | null
          population_affected?: number | null
          damage_level?: string | null
          evacuation_required?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          alert_id?: string | null
          area_name?: string
          latitude?: number
          longitude?: number
          radius_km?: number | null
          population_affected?: number | null
          damage_level?: string | null
          evacuation_required?: boolean | null
          created_at?: string | null
        }
      }
      safe_zones: {
        Row: {
          id: string
          name: string
          type: string
          latitude: number
          longitude: number
          capacity: number | null
          current_occupancy: number | null
          facilities: string[] | null
          contact_number: string | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          latitude: number
          longitude: number
          capacity?: number | null
          current_occupancy?: number | null
          facilities?: string[] | null
          contact_number?: string | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          latitude?: number
          longitude?: number
          capacity?: number | null
          current_occupancy?: number | null
          facilities?: string[] | null
          contact_number?: string | null
          is_active?: boolean | null
          created_at?: string | null
        }
      }
      evacuation_routes: {
        Row: {
          id: string
          name: string
          from_latitude: number
          from_longitude: number
          to_latitude: number
          to_longitude: number
          safe_zone_id: string | null
          distance_km: number | null
          estimated_time_minutes: number | null
          is_clear: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          from_latitude: number
          from_longitude: number
          to_latitude: number
          to_longitude: number
          safe_zone_id?: string | null
          distance_km?: number | null
          estimated_time_minutes?: number | null
          is_clear?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          from_latitude?: number
          from_longitude?: number
          to_latitude?: number
          to_longitude?: number
          safe_zone_id?: string | null
          distance_km?: number | null
          estimated_time_minutes?: number | null
          is_clear?: boolean | null
          created_at?: string | null
        }
      }
    }
  }
}
