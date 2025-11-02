'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, MapPin, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface AlertsPanelProps {
  alerts: any[];
  loading: boolean;
}

export function AlertsPanel({ alerts, loading }: AlertsPanelProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="w-full h-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-50 border-red-300';
      case 'High':
        return 'bg-orange-50 border-orange-300';
      case 'Medium':
        return 'bg-yellow-50 border-yellow-300';
      default:
        return 'bg-blue-50 border-blue-300';
    }
  };

  const getDisasterIcon = (type: string) => {
    return AlertTriangle;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Disaster Alerts
          </CardTitle>
          <p className="text-sm text-slate-600">
            AI-detected threats and ongoing emergencies
          </p>
        </CardHeader>
      </Card>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600">No active alerts at this time</p>
            <p className="text-sm text-slate-500 mt-2">
              The system is monitoring for potential disasters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {alerts.map((alert) => {
            const Icon = getDisasterIcon(alert.disaster_type);
            return (
              <Card
                key={alert.id}
                className={`border-2 ${getSeverityBg(alert.severity_level)} hover:shadow-lg transition-shadow`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-3 rounded-lg ${alert.severity_level === 'Critical' ? 'bg-red-200' : alert.severity_level === 'High' ? 'bg-orange-200' : 'bg-yellow-200'}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{alert.title}</h3>
                            <Badge variant={getSeverityColor(alert.severity_level)}>
                              {alert.severity_level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {alert.disaster_type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {format(new Date(alert.created_at), 'MMM dd, HH:mm')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-700 mb-4 leading-relaxed">
                        {alert.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white/50 p-3 rounded-lg border border-slate-200">
                          <p className="text-xs text-slate-600 mb-1">AI Probability</p>
                          <p className="text-lg font-bold text-slate-800">
                            {alert.probability}%
                          </p>
                        </div>
                        <div className="bg-white/50 p-3 rounded-lg border border-slate-200">
                          <p className="text-xs text-slate-600 mb-1">Affected Radius</p>
                          <p className="text-lg font-bold text-slate-800">
                            {alert.affected_radius_km} km
                          </p>
                        </div>
                        <div className="bg-white/50 p-3 rounded-lg border border-slate-200">
                          <p className="text-xs text-slate-600 mb-1">Status</p>
                          <Badge variant="outline" className="text-xs">
                            {alert.status}
                          </Badge>
                        </div>
                        <div className="bg-white/50 p-3 rounded-lg border border-slate-200">
                          <p className="text-xs text-slate-600 mb-1">Location</p>
                          <p className="text-xs font-medium text-slate-800 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.latitude.toFixed(2)}, {alert.longitude.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {alert.predicted_impact_time && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-amber-800 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Expected Impact:</span>
                            {format(new Date(alert.predicted_impact_time), 'MMM dd, yyyy HH:mm')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
