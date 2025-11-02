'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, MapPin, Users, Shield, Phone } from 'lucide-react';
import { DisasterMap } from '@/components/disaster-map';
import { AlertsPanel } from '@/components/alerts-panel';
import { SOSButton } from '@/components/sos-button';
import { StatsCards } from '@/components/stats-cards';
import { SafeZonesPanel } from '@/components/safe-zones-panel';
import { PredictionDashboard } from '@/components/prediction-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [sosRequests, setSosRequests] = useState<any[]>([]);
  const [safeZones, setSafeZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();

    const alertsChannel = supabase
      .channel('disaster_alerts_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'disaster_alerts' },
        () => {
          loadAlerts();
        }
      )
      .subscribe();

    const sosChannel = supabase
      .channel('sos_requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sos_requests' },
        () => {
          loadSOSRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(alertsChannel);
      supabase.removeChannel(sosChannel);
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadAlerts(), loadSOSRequests(), loadSafeZones()]);
    setLoading(false);
  };

  const loadAlerts = async () => {
    const { data } = await supabase
      .from('disaster_alerts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAlerts(data);
  };

  const loadSOSRequests = async () => {
    const { data } = await supabase
      .from('sos_requests')
      .select('*')
      .eq('status', 'Pending')
      .order('created_at', { ascending: false });
    if (data) setSosRequests(data);
  };

  const loadSafeZones = async () => {
    const { data } = await supabase
      .from('safe_zones')
      .select('*')
      .eq('is_active', true);
    if (data) setSafeZones(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg">
                <AlertTriangle className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Smart Disaster Management
                </h1>
                <p className="text-sm text-slate-600">AI-Powered Emergency Response System</p>
              </div>
            </div>
            <SOSButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <StatsCards alerts={alerts} sosRequests={sosRequests} safeZones={safeZones} />

        <Tabs defaultValue="map" className="mt-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Live Map</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Predictions</span>
            </TabsTrigger>
            <TabsTrigger value="safezones" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Safe Zones</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-6">
            <DisasterMap
              alerts={alerts}
              sosRequests={sosRequests}
              safeZones={safeZones}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <AlertsPanel alerts={alerts} loading={loading} />
          </TabsContent>

          <TabsContent value="predictions" className="mt-6">
            <PredictionDashboard alerts={alerts} loading={loading} />
          </TabsContent>

          <TabsContent value="safezones" className="mt-6">
            <SafeZonesPanel safeZones={safeZones} loading={loading} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
