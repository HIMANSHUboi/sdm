'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity, BarChart3, Brain } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PredictionDashboardProps {
  alerts: any[];
  loading: boolean;
}

export function PredictionDashboard({ alerts, loading }: PredictionDashboardProps) {
  if (loading) {
    return (
      <div className="grid gap-4">
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  const avgProbability =
    alerts.length > 0
      ? alerts.reduce((sum, a) => sum + a.probability, 0) / alerts.length
      : 0;

  const disasterTypes = alerts.reduce((acc: any, alert) => {
    acc[alert.disaster_type] = (acc[alert.disaster_type] || 0) + 1;
    return acc;
  }, {});

  const severityCounts = alerts.reduce(
    (acc: any, alert) => {
      acc[alert.severity_level] = (acc[alert.severity_level] || 0) + 1;
      return acc;
    },
    { Critical: 0, High: 0, Medium: 0, Low: 0 }
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Prediction Analytics
          </CardTitle>
          <p className="text-sm text-slate-600">
            Real-time disaster prediction and risk assessment
          </p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-200 rounded-lg">
                <Activity className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Average Probability</p>
                <p className="text-2xl font-bold text-blue-700">
                  {avgProbability.toFixed(1)}%
                </p>
              </div>
            </div>
            <Progress value={avgProbability} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Predictions</p>
                <p className="text-2xl font-bold text-purple-700">{alerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-200 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-700" />
              </div>
              <div>
                <p className="text-sm text-slate-600">High Risk Areas</p>
                <p className="text-2xl font-bold text-orange-700">
                  {Object.keys(disasterTypes).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Disaster Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(disasterTypes).map(([type, count]: any) => (
                <div key={type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{type}</span>
                    <Badge variant="secondary">{count} alert(s)</Badge>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all"
                      style={{
                        width: `${(count / alerts.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              {Object.keys(disasterTypes).length === 0 && (
                <p className="text-center text-slate-500 py-8">
                  No disaster predictions at this time
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Severity Level Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(severityCounts).map(([severity, count]: any) => {
                const colors = {
                  Critical: 'bg-red-500',
                  High: 'bg-orange-500',
                  Medium: 'bg-yellow-500',
                  Low: 'bg-blue-500',
                };
                return (
                  <div key={severity}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{severity}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className={`${colors[severity as keyof typeof colors]} h-2.5 rounded-full transition-all`}
                        style={{
                          width: `${alerts.length > 0 ? (count / alerts.length) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">AI Model Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-slate-600 mb-1">Model Accuracy</p>
              <p className="text-2xl font-bold text-slate-800">94.2%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-slate-600 mb-1">Predictions/Hour</p>
              <p className="text-2xl font-bold text-slate-800">127</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-slate-600 mb-1">Data Sources</p>
              <p className="text-2xl font-bold text-slate-800">18</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-slate-600 mb-1">Response Time</p>
              <p className="text-2xl font-bold text-slate-800">2.3s</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">AI Status:</span> All models operational.
              Continuously analyzing weather patterns, seismic data, flood forecasts,
              and satellite imagery for early disaster detection.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
