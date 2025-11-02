'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Shield, Phone } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface DisasterMapProps {
  alerts: any[];
  sosRequests: any[];
  safeZones: any[];
  loading: boolean;
}

export function DisasterMap({ alerts, sosRequests, safeZones, loading }: DisasterMapProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Disaster Map</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[600px]" />
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'High':
        return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Disaster Map
        </CardTitle>
        <p className="text-sm text-slate-600">
          Real-time visualization of disasters, SOS requests, and safe zones
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-100 to-blue-50 rounded-lg border-2 border-slate-200 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200 max-w-xs z-10">
            <h3 className="font-semibold text-sm mb-3">Map Legend</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Disaster Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>SOS Request</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Safe Zone</span>
              </div>
            </div>
          </div>

          <div className="relative h-full p-8 overflow-auto">
            {alerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`absolute ${getSeverityColor(alert.severity_level)} p-4 rounded-lg shadow-lg border-2 max-w-xs cursor-pointer hover:scale-105 transition-transform`}
                style={{
                  top: `${20 + index * 120}px`,
                  left: `${50 + (index % 3) * 280}px`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/50 rounded-full">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{alert.disaster_type}</h4>
                    <p className="text-xs mb-2">{alert.title}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {alert.probability}% probability
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {alert.affected_radius_km}km radius
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {sosRequests.slice(0, 5).map((sos, index) => (
              <div
                key={sos.id}
                className="absolute bg-blue-100 border-2 border-blue-500 p-4 rounded-lg shadow-lg max-w-xs cursor-pointer hover:scale-105 transition-transform"
                style={{
                  top: `${100 + index * 100}px`,
                  right: `${50 + (index % 2) * 200}px`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/50 rounded-full animate-pulse">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-blue-800">SOS Request</h4>
                    <p className="text-xs text-blue-700 mb-1">{sos.emergency_type}</p>
                    <p className="text-xs text-blue-600">{sos.user_name}</p>
                    <Badge variant="destructive" className="text-xs mt-2">
                      {sos.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

            {safeZones.slice(0, 4).map((zone, index) => (
              <div
                key={zone.id}
                className="absolute bg-green-100 border-2 border-green-500 p-4 rounded-lg shadow-lg max-w-xs cursor-pointer hover:scale-105 transition-transform"
                style={{
                  bottom: `${50 + index * 120}px`,
                  left: `${100 + (index % 3) * 250}px`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/50 rounded-full">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-green-800">{zone.name}</h4>
                    <p className="text-xs text-green-700 mb-2">{zone.type}</p>
                    <div className="text-xs text-green-600">
                      Capacity: {zone.current_occupancy}/{zone.capacity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-slate-200">
            <p className="text-xs text-slate-600">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
