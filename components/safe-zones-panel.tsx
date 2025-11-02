'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Phone, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

interface SafeZonesPanelProps {
  safeZones: any[];
  loading: boolean;
}

export function SafeZonesPanel({ safeZones, loading }: SafeZonesPanelProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="w-full h-40" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Shelter':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Hospital':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Relief Center':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Available Safe Zones
          </CardTitle>
          <p className="text-sm text-slate-600">
            Emergency shelters, hospitals, and relief centers in your area
          </p>
        </CardHeader>
      </Card>

      {safeZones.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600">No safe zones available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {safeZones.map((zone) => {
            const occupancyPercentage =
              (zone.current_occupancy / zone.capacity) * 100;
            return (
              <Card
                key={zone.id}
                className="border-2 border-green-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Shield className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{zone.name}</h3>
                          <Badge
                            className={`text-xs ${getTypeColor(zone.type)}`}
                          >
                            {zone.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {zone.is_active && (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Capacity Status</span>
                      <span
                        className={`font-bold ${getOccupancyColor(zone.current_occupancy, zone.capacity)}`}
                      >
                        {zone.current_occupancy} / {zone.capacity}
                      </span>
                    </div>
                    <Progress
                      value={occupancyPercentage}
                      className="h-2"
                    />

                    {zone.facilities && zone.facilities.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                        <p className="text-xs text-slate-600 mb-2">
                          Available Facilities:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {zone.facilities.map((facility: string) => (
                            <Badge
                              key={facility}
                              variant="outline"
                              className="text-xs"
                            >
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span>
                          {zone.latitude.toFixed(4)}, {zone.longitude.toFixed(4)}
                        </span>
                      </div>
                      {zone.contact_number && (
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <span className="font-medium">{zone.contact_number}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3">
                      <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Evacuation Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <p className="text-slate-700">
                Stay calm and gather essential items: ID, medications, water, and phone charger
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <p className="text-slate-700">
                Follow official evacuation routes and avoid flooded or blocked areas
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <p className="text-slate-700">
                Head to the nearest available safe zone with capacity
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <p className="text-slate-700">
                Register at the safe zone and follow staff instructions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
