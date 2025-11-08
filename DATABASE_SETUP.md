# Supabase Database Setup - Smart Disaster Management System

## Connection Status ✅

Your Supabase database is now connected and configured:

- **Project URL**: https://ckxxcejejvcmjpsmrqiy.supabase.co
- **Environment**: Configured in `.env.local`

## Database Tables

The following tables are ready to be created in your Supabase project:

### 1. `disaster_alerts`
Stores AI-predicted disaster threats and alerts

**Columns:**
- `id` (UUID) - Primary key
- `disaster_type` (text) - Flood, Earthquake, Wildfire, etc.
- `severity_level` (text) - Critical, High, Medium, Low
- `probability` (numeric) - AI prediction confidence (0-100%)
- `title` (text) - Alert headline
- `description` (text) - Detailed information
- `latitude` / `longitude` (numeric) - Location coordinates
- `affected_radius_km` (numeric) - Impact radius
- `status` (text) - Active, Resolved, Monitoring
- `predicted_impact_time` (timestamptz) - Expected disaster time
- `created_at` / `updated_at` (timestamptz) - Timestamps

### 2. `sos_requests`
Emergency requests from users in distress

**Columns:**
- `id` (UUID) - Primary key
- `user_name` (text) - Name of person requesting help
- `phone_number` (text) - Contact number
- `latitude` / `longitude` (numeric) - GPS location
- `emergency_type` (text) - Medical, Trapped, Injured, Fire, Flood, Other
- `people_count` (integer) - Number of people needing help
- `description` (text) - Emergency details
- `status` (text) - Pending, InProgress, Resolved
- `priority` (text) - Critical, High, Medium, Low
- `created_at` (timestamptz) - Request time
- `resolved_at` (timestamptz) - Resolution time

### 3. `affected_areas`
Tracks specific areas impacted by disasters

**Columns:**
- `id` (UUID) - Primary key
- `alert_id` (UUID) - Reference to disaster_alerts
- `area_name` (text) - Location name
- `latitude` / `longitude` (numeric) - Center coordinates
- `radius_km` (numeric) - Affected radius
- `population_affected` (integer) - Estimated people count
- `damage_level` (text) - Severe, Moderate, Minor
- `evacuation_required` (boolean) - Evacuation needed flag
- `created_at` (timestamptz) - Record creation time

### 4. `safe_zones`
Emergency shelters, hospitals, and relief centers

**Columns:**
- `id` (UUID) - Primary key
- `name` (text) - Zone name
- `type` (text) - Shelter, Hospital, Relief Center
- `latitude` / `longitude` (numeric) - Location coordinates
- `capacity` (integer) - Maximum occupancy
- `current_occupancy` (integer) - Current people count
- `facilities` (text[]) - Array of available facilities
- `contact_number` (text) - Emergency contact
- `is_active` (boolean) - Operational status
- `created_at` (timestamptz) - Record creation time

### 5. `evacuation_routes`
Planned routes to safety zones

**Columns:**
- `id` (UUID) - Primary key
- `name` (text) - Route identifier
- `from_latitude` / `from_longitude` (numeric) - Start point
- `to_latitude` / `to_longitude` (numeric) - Destination
- `safe_zone_id` (UUID) - Reference to safe_zones
- `distance_km` (numeric) - Route distance
- `estimated_time_minutes` (integer) - Travel time
- `is_clear` (boolean) - Route accessibility status
- `created_at` (timestamptz) - Record creation time

## Security (Row Level Security)

All tables have RLS enabled with the following policies:

### Public Access (No Authentication Required)
- ✅ View all disaster alerts
- ✅ View all SOS requests
- ✅ View all affected areas
- ✅ View all safe zones
- ✅ View all evacuation routes
- ✅ Create new SOS requests

### Authenticated Access (Admin/Operators)
- ✅ Create and update disaster alerts
- ✅ Update SOS request status
- ✅ Manage affected areas
- ✅ Update safe zone information
- ✅ Manage evacuation routes

## Sample Data

The migration includes sample data:

1. **3 Active Disaster Alerts**
   - Flash Flood Warning (87.5% probability)
   - Seismic Activity (72.3% probability)
   - Wildfire Risk (68.9% probability)

2. **3 Safe Zones**
   - Central Emergency Shelter (NYC)
   - City General Hospital (SF)
   - Community Relief Center (LA)

## Creating Tables in Supabase

To create the database schema, you have two options:

### Option 1: Using Supabase Dashboard
1. Go to https://app.supabase.com
2. Select your project "bolt-native-database-59583993"
3. Navigate to SQL Editor
4. Copy the migration SQL from the project files
5. Execute the SQL

### Option 2: Using Supabase CLI
```bash
supabase migration up
```

## Testing the Connection

The application will automatically connect to Supabase when you:
1. Update `.env.local` with credentials (already done)
2. Run the development server: `npm run dev`
3. Navigate to http://localhost:3000

The app will immediately start:
- Fetching live disaster alerts
- Displaying SOS requests
- Showing available safe zones
- Listening for real-time updates

## Real-Time Features

Once tables are created, the application will automatically:
- Listen for new disaster alerts
- Update SOS request statuses
- Sync safe zone occupancy
- Refresh affected areas

## Next Steps

1. **Execute the migration** to create tables in Supabase
2. **Run the app** with `npm run dev`
3. **Test functionality** by:
   - Viewing live alerts on the dashboard
   - Clicking "Emergency SOS" to submit a test request
   - Checking different tabs (Map, Alerts, Predictions, Safe Zones)
   - Verifying real-time data updates

## Frontend Features Ready

All frontend components are ready to use:
- ✅ Real-time alert dashboard
- ✅ Interactive disaster map
- ✅ SOS emergency request form
- ✅ AI prediction analytics
- ✅ Safe zones directory
- ✅ Evacuation route planner
- ✅ Live statistics
- ✅ Toast notifications

## Troubleshooting

If you encounter connection issues:
1. Verify `.env.local` has the correct credentials
2. Check your Supabase project is active
3. Ensure RLS policies are enabled
4. Check browser console for any errors
5. Verify CORS settings in Supabase

Your database is ready! Execute the migration to start using the Disaster Management System.
