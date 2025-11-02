'use client';

import { AlertTriangle, Phone, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  alerts: any[];
  sosRequests: any[];
  safeZones: any[];
}

export function StatsCards({ alerts, sosRequests, safeZones }: StatsCardsProps) {
  const activeAlerts = alerts.filter(a => a.status === 'Active').length;
  const criticalAlerts = alerts.filter(a => a.severity_level === 'Critical').length;
  const pendingSOS = sosRequests.length;
  const availableSafeZones = safeZones.filter(s => s.is_active).length;

  const stats = [
    {
      title: 'Active Alerts',
      value: activeAlerts,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      title: 'Critical Threats',
      value: criticalAlerts,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      title: 'Pending SOS',
      value: pendingSOS,
      icon: Phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Safe Zones',
      value: availableSafeZones,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className={`border-2 ${stat.borderColor} hover:shadow-lg transition-all duration-300`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
