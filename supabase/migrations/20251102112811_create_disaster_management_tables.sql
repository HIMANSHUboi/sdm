/*
  # Smart Disaster Management System Database Schema

  ## Overview
  Creates comprehensive database structure for disaster management system including:
  - Disaster alerts with AI prediction data
  - SOS emergency requests
  - Affected areas tracking
  - Safe zones and evacuation routes
  - User reports and notifications

  ## New Tables

  ### `disaster_alerts`
  - `id` (uuid, primary key) - Unique alert identifier
  - `disaster_type` (text) - Type of disaster (flood, earthquake, wildfire, etc.)
  - `severity_level` (text) - Critical, High, Medium, Low
  - `probability` (numeric) - AI predicted probability (0-100)
  - `title` (text) - Alert headline
  - `description` (text) - Detailed alert information
  - `latitude` (numeric) - Location latitude
  - `longitude` (numeric) - Location longitude
  - `affected_radius_km` (numeric) - Radius of affected area
  - `status` (text) - Active, Resolved, Monitoring
  - `predicted_impact_time` (timestamptz) - When disaster expected
  - `created_at` (timestamptz) - Alert creation time
  - `updated_at` (timestamptz) - Last update time

  ### `sos_requests`
  - `id` (uuid, primary key) - Unique SOS identifier
  - `user_name` (text) - Name of person requesting help
  - `phone_number` (text) - Contact number
  - `latitude` (numeric) - Current location latitude
  - `longitude` (numeric) - Current location longitude
  - `emergency_type` (text) - Medical, Trapped, Injured, etc.
  - `people_count` (integer) - Number of people needing help
  - `description` (text) - Emergency details
  - `status` (text) - Pending, InProgress, Resolved
  - `priority` (text) - Critical, High, Medium, Low
  - `created_at` (timestamptz) - Request timestamp
  - `resolved_at` (timestamptz) - Resolution timestamp

  ### `affected_areas`
  - `id` (uuid, primary key) - Unique area identifier
  - `alert_id` (uuid) - Reference to disaster_alerts
  - `area_name` (text) - Name of affected location
  - `latitude` (numeric) - Center latitude
  - `longitude` (numeric) - Center longitude
  - `radius_km` (numeric) - Affected radius
  - `population_affected` (integer) - Estimated people affected
  - `damage_level` (text) - Severe, Moderate, Minor
  - `evacuation_required` (boolean) - Evacuation needed flag
  - `created_at` (timestamptz) - Record creation time

  ### `safe_zones`
  - `id` (uuid, primary key) - Unique safe zone identifier
  - `name` (text) - Safe zone name
  - `type` (text) - Shelter, Hospital, Relief Center
  - `latitude` (numeric) - Location latitude
  - `longitude` (numeric) - Location longitude
  - `capacity` (integer) - Maximum capacity
  - `current_occupancy` (integer) - Current people count
  - `facilities` (text[]) - Available facilities
  - `contact_number` (text) - Contact information
  - `is_active` (boolean) - Currently operational
  - `created_at` (timestamptz) - Record creation time

  ### `evacuation_routes`
  - `id` (uuid, primary key) - Unique route identifier
  - `name` (text) - Route name
  - `from_latitude` (numeric) - Starting point latitude
  - `from_longitude` (numeric) - Starting point longitude
  - `to_latitude` (numeric) - Destination latitude
  - `to_longitude` (numeric) - Destination longitude
  - `safe_zone_id` (uuid) - Reference to safe_zones
  - `distance_km` (numeric) - Route distance
  - `estimated_time_minutes` (integer) - Travel time estimate
  - `is_clear` (boolean) - Route currently accessible
  - `created_at` (timestamptz) - Record creation time

  ## Security
  - Enable RLS on all tables
  - Public read access for disaster information
  - Authenticated write access for SOS requests
*/

-- Create disaster_alerts table
CREATE TABLE IF NOT EXISTS disaster_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  disaster_type text NOT NULL,
  severity_level text NOT NULL DEFAULT 'Medium',
  probability numeric NOT NULL DEFAULT 0,
  title text NOT NULL,
  description text,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  affected_radius_km numeric DEFAULT 5,
  status text NOT NULL DEFAULT 'Active',
  predicted_impact_time timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sos_requests table
CREATE TABLE IF NOT EXISTS sos_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  phone_number text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  emergency_type text NOT NULL,
  people_count integer DEFAULT 1,
  description text,
  status text NOT NULL DEFAULT 'Pending',
  priority text NOT NULL DEFAULT 'High',
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Create affected_areas table
CREATE TABLE IF NOT EXISTS affected_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id uuid REFERENCES disaster_alerts(id) ON DELETE CASCADE,
  area_name text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  radius_km numeric DEFAULT 2,
  population_affected integer DEFAULT 0,
  damage_level text DEFAULT 'Minor',
  evacuation_required boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create safe_zones table
CREATE TABLE IF NOT EXISTS safe_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  capacity integer DEFAULT 100,
  current_occupancy integer DEFAULT 0,
  facilities text[] DEFAULT '{}',
  contact_number text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create evacuation_routes table
CREATE TABLE IF NOT EXISTS evacuation_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  from_latitude numeric NOT NULL,
  from_longitude numeric NOT NULL,
  to_latitude numeric NOT NULL,
  to_longitude numeric NOT NULL,
  safe_zone_id uuid REFERENCES safe_zones(id) ON DELETE SET NULL,
  distance_km numeric,
  estimated_time_minutes integer,
  is_clear boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE disaster_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE affected_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE safe_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE evacuation_routes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for disaster_alerts (public read)
CREATE POLICY "Anyone can view disaster alerts"
  ON disaster_alerts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert alerts"
  ON disaster_alerts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update alerts"
  ON disaster_alerts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for sos_requests (public can create, authenticated can manage)
CREATE POLICY "Anyone can view SOS requests"
  ON sos_requests FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create SOS requests"
  ON sos_requests FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update SOS requests"
  ON sos_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for affected_areas (public read)
CREATE POLICY "Anyone can view affected areas"
  ON affected_areas FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage affected areas"
  ON affected_areas FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for safe_zones (public read)
CREATE POLICY "Anyone can view safe zones"
  ON safe_zones FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage safe zones"
  ON safe_zones FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update safe zones"
  ON safe_zones FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for evacuation_routes (public read)
CREATE POLICY "Anyone can view evacuation routes"
  ON evacuation_routes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage evacuation routes"
  ON evacuation_routes FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_disaster_alerts_status ON disaster_alerts(status);
CREATE INDEX IF NOT EXISTS idx_disaster_alerts_severity ON disaster_alerts(severity_level);
CREATE INDEX IF NOT EXISTS idx_disaster_alerts_created ON disaster_alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sos_requests_status ON sos_requests(status);
CREATE INDEX IF NOT EXISTS idx_sos_requests_priority ON sos_requests(priority);
CREATE INDEX IF NOT EXISTS idx_affected_areas_alert ON affected_areas(alert_id);
CREATE INDEX IF NOT EXISTS idx_safe_zones_active ON safe_zones(is_active);

-- Insert sample data for demonstration
INSERT INTO disaster_alerts (disaster_type, severity_level, probability, title, description, latitude, longitude, affected_radius_km, status, predicted_impact_time)
VALUES 
  ('Flood', 'Critical', 87.5, 'Flash Flood Warning - Downtown Area', 'AI models detect 87.5% probability of flash flooding in the next 2 hours due to heavy rainfall upstream.', 40.7128, -74.0060, 8, 'Active', now() + interval '2 hours'),
  ('Earthquake', 'High', 72.3, 'Seismic Activity Detected', 'Increased seismic activity detected. 72.3% probability of moderate earthquake in next 24 hours.', 37.7749, -122.4194, 15, 'Monitoring', now() + interval '24 hours'),
  ('Wildfire', 'High', 68.9, 'Wildfire Risk - Forest Area', 'High winds and dry conditions create 68.9% probability of wildfire spread.', 34.0522, -118.2437, 12, 'Active', now() + interval '6 hours');

INSERT INTO safe_zones (name, type, latitude, longitude, capacity, current_occupancy, facilities, contact_number, is_active)
VALUES 
  ('Central Emergency Shelter', 'Shelter', 40.7589, -73.9851, 500, 120, ARRAY['Medical', 'Food', 'Water', 'Beds'], '+1-555-0101', true),
  ('City General Hospital', 'Hospital', 37.7849, -122.4094, 300, 85, ARRAY['Medical', 'Emergency Care', 'ICU'], '+1-555-0102', true),
  ('Community Relief Center', 'Relief Center', 34.0622, -118.2537, 400, 50, ARRAY['Food', 'Water', 'Communication'], '+1-555-0103', true);

INSERT INTO evacuation_routes (name, from_latitude, from_longitude, to_latitude, to_longitude, safe_zone_id, distance_km, estimated_time_minutes, is_clear)
SELECT 
  'Route to Central Emergency Shelter',
  40.7128,
  -74.0060,
  40.7589,
  -73.9851,
  id,
  5.2,
  15,
  true
FROM safe_zones WHERE name = 'Central Emergency Shelter' LIMIT 1;