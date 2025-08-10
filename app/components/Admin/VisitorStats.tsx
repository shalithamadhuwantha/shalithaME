'use client'
import React, { useEffect, useState, useRef } from 'react';
import { BarChart3, Users, Eye, Calendar, PieChart, TrendingUp, Filter, Download, RefreshCw } from 'lucide-react';
import Chart from 'chart.js/auto';

interface StatData {
  period: string;
  endpoint?: string;
  views: number;
  unique_visitors: number;
  endpoints_count?: number;
}

interface StatsResponse {
  success: boolean;
  period: string;
  data: StatData[];
  total_records: number;
}

interface ChartData {
  endpoint: string;
  views: number;
  unique_visitors: number;
}

export default function VisitorStats() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState('daily');
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [endpoints, setEndpoints] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [chartType, setChartType] = useState('both'); // 'pie', 'bar', 'both'
  
  // Chart refs
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const trendChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartInstance = useRef<Chart | null>(null);
  const barChartInstance = useRef<Chart | null>(null);
  const trendChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchStats();
    fetchEndpoints();
  }, [period, selectedEndpoint, dateRange]);

  useEffect(() => {
    if (stats.length > 0 && !loading) {
      createCharts();
    }
    
    // Cleanup charts on unmount
    return () => {
      if (pieChartInstance.current) pieChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (trendChartInstance.current) trendChartInstance.current.destroy();
    };
  }, [stats, loading, chartType]);

  const fetchStats = async () => {
    try {
      if (!refreshing) setLoading(true);
      const params = new URLSearchParams({
        period,
        limit: '30',
        ...(selectedEndpoint && { endpoint: selectedEndpoint })
      });

      const response = await fetch(`/api/settings/track-visit?${params}`);
      const data: StatsResponse = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchEndpoints = async () => {
    try {
      const response = await fetch('/api/settings/track-visit?period=daily&limit=1000');
      const data: StatsResponse = await response.json();

      if (data.success) {
const uniqueEndpoints = [...new Set(
  data.data
    .map(item => item.endpoint)
    .filter((endpoint): endpoint is string => Boolean(endpoint))
)];
setEndpoints(uniqueEndpoints);

      }
    } catch (error) {
      console.error('Failed to fetch endpoints:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Period,Endpoint,Views,Unique Visitors\n" +
      stats.map(stat => `${stat.period},${stat.endpoint || 'All'},${stat.views},${stat.unique_visitors}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `visitor_stats_${period}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createCharts = () => {
    // Cleanup existing charts
    if (pieChartInstance.current) pieChartInstance.current.destroy();
    if (barChartInstance.current) barChartInstance.current.destroy();
    if (trendChartInstance.current) trendChartInstance.current.destroy();

    // Aggregate data for charts
    const chartData = aggregateDataForCharts();
    
    // Create Pie Chart for Views Distribution
    if ((chartType === 'pie' || chartType === 'both') && pieChartRef.current && period === 'daily') {
      const ctx = pieChartRef.current.getContext('2d');
      if (ctx) {
        pieChartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: chartData.map(d => d.endpoint),
            datasets: [{
              data: chartData.map(d => d.views),
              backgroundColor: [
                '#FBBF24', // yellow-400
                '#10B981', // emerald-500  
                '#3B82F6', // blue-500
                '#EF4444', // red-500
                '#8B5CF6', // violet-500
                '#F59E0B', // amber-500
                '#14B8A6', // teal-500
                '#F97316', // orange-500
              ],
              borderColor: '#1F2937',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#FBBF24', font: { family: 'monospace' } }
              },
              title: {
                display: true,
                text: 'Page Views Distribution',
                color: '#FBBF24',
                font: { family: 'monospace', size: 16 }
              }
            }
          }
        });
      }
    }

    // Create Bar Chart for Unique Visitors
    if ((chartType === 'bar' || chartType === 'both') && barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');
      if (ctx) {
        barChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartData.map(d => d.endpoint),
            datasets: [{
              label: 'Views',
              data: chartData.map(d => d.views),
              backgroundColor: '#FBBF24',
              borderColor: '#F59E0B',
              borderWidth: 1
            }, {
              label: 'Unique Visitors',
              data: chartData.map(d => d.unique_visitors),
              backgroundColor: '#10B981',
              borderColor: '#059669',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#FBBF24', font: { family: 'monospace' } }
              },
              title: {
                display: true,
                text: 'Views vs Unique Visitors',
                color: '#FBBF24',
                font: { family: 'monospace', size: 16 }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#FBBF24', font: { family: 'monospace' } },
                grid: { color: '#374151' }
              },
              x: {
                ticks: { color: '#FBBF24', font: { family: 'monospace' } },
                grid: { color: '#374151' }
              }
            }
          }
        });
      }
    }

    // Create Trend Line Chart
    if (trendChartRef.current && period === 'daily' && stats.length > 1) {
      const ctx = trendChartRef.current.getContext('2d');
      if (ctx) {
        const sortedStats = [...stats].sort((a, b) => new Date(a.period).getTime() - new Date(b.period).getTime());
        
        trendChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: sortedStats.map(d => new Date(d.period).toLocaleDateString()),
            datasets: [{
              label: 'Total Views',
              data: sortedStats.map(d => d.views),
              borderColor: '#FBBF24',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              fill: true,
              tension: 0.4
            }, {
              label: 'Unique Visitors',
              data: sortedStats.map(d => d.unique_visitors),
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#FBBF24', font: { family: 'monospace' } }
              },
              title: {
                display: true,
                text: 'Traffic Trend Over Time',
                color: '#FBBF24',
                font: { family: 'monospace', size: 16 }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#FBBF24', font: { family: 'monospace' } },
                grid: { color: '#374151' }
              },
              x: {
                ticks: { color: '#FBBF24', font: { family: 'monospace' } },
                grid: { color: '#374151' }
              }
            }
          }
        });
      }
    }
  };

  const aggregateDataForCharts = (): ChartData[] => {
    if (period !== 'daily') {
      return [{
        endpoint: 'All Pages',
        views: getTotalViews(),
        unique_visitors: getTotalUniqueVisitors()
      }];
    }

    const aggregated = stats.reduce((acc, stat) => {
      const endpoint = stat.endpoint || 'Unknown';
      if (!acc[endpoint]) {
        acc[endpoint] = { endpoint, views: 0, unique_visitors: 0 };
      }
      acc[endpoint].views += stat.views;
      acc[endpoint].unique_visitors += stat.unique_visitors;
      return acc;
    }, {} as Record<string, ChartData>);

    return Object.values(aggregated).sort((a, b) => b.views - a.views).slice(0, 8);
  };

  const getTotalViews = () => stats.reduce((sum, item) => sum + item.views, 0);
  const getTotalUniqueVisitors = () => stats.reduce((sum, item) => sum + item.unique_visitors, 0);
  const getAverageViews = () => stats.length > 0 ? Math.round(getTotalViews() / stats.length) : 0;
  const getBounceRate = () => Math.round(Math.random() * 30 + 40); // Placeholder

  return (
    <div className="min-h-screen bg-black text-yellow-500 font-mono p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
              <BarChart3 className="h-6 w-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl font-playfair text-yellow-500">Analytics Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            
            <button
              onClick={exportData}
              className="flex items-center space-x-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-yellow-500/80 mb-2">Time Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-500/80 mb-2">Endpoint Filter</label>
            <select
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500"
            >
              <option value="">All Endpoints</option>
              {endpoints.map(endpoint => (
                <option key={endpoint} value={endpoint}>{endpoint}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-500/80 mb-2">Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full bg-black border border-yellow-500/30 rounded-lg p-3 text-yellow-500"
            >
              <option value="both">Both Charts</option>
              <option value="pie">Pie Chart Only</option>
              <option value="bar">Bar Chart Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-500/80 mb-2">Date Range</label>
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="flex-1 bg-black border border-yellow-500/30 rounded px-2 py-1 text-yellow-500 text-xs"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="flex-1 bg-black border border-yellow-500/30 rounded px-2 py-1 text-yellow-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-500/70 text-sm">Total Views</p>
                <p className="text-2xl font-playfair text-yellow-500">
                  {loading ? '...' : getTotalViews().toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-500/70 text-sm">Unique Visitors</p>
                <p className="text-2xl font-playfair text-yellow-500">
                  {loading ? '...' : getTotalUniqueVisitors().toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-500/70 text-sm">Avg. Daily Views</p>
                <p className="text-2xl font-playfair text-yellow-500">
                  {loading ? '...' : getAverageViews().toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-500/70 text-sm">Pages Tracked</p>
                <p className="text-2xl font-playfair text-yellow-500">
                  {loading ? '...' : endpoints.length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          {(chartType === 'pie' || chartType === 'both') && period === 'daily' && (
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-playfair text-yellow-500 flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Page Views Distribution
                </h2>
              </div>
              <div className="h-80">
                <canvas ref={pieChartRef}></canvas>
              </div>
            </div>
          )}

          {/* Bar Chart */}
          {(chartType === 'bar' || chartType === 'both') && (
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-playfair text-yellow-500 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Views vs Unique Visitors
                </h2>
              </div>
              <div className="h-80">
                <canvas ref={barChartRef}></canvas>
              </div>
            </div>
          )}
        </div>

        {/* Trend Chart */}
        {period === 'daily' && stats.length > 1 && (
          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-playfair text-yellow-500 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Traffic Trend Over Time
              </h2>
            </div>
            <div className="h-64">
              <canvas ref={trendChartRef}></canvas>
            </div>
          </div>
        )}

        {/* Statistics Table */}
        <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
          <h2 className="text-lg font-playfair text-yellow-500 mb-4 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            {period.charAt(0).toUpperCase() + period.slice(1)} Statistics
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
              <p className="text-yellow-500/70 mt-2">Loading statistics...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-3 px-4 text-yellow-500">Period</th>
                    {period === 'daily' && <th className="text-left py-3 px-4 text-yellow-500">Endpoint</th>}
                    <th className="text-left py-3 px-4 text-yellow-500">Views</th>
                    <th className="text-left py-3 px-4 text-yellow-500">Unique Visitors</th>
                    <th className="text-left py-3 px-4 text-yellow-500">Conversion Rate</th>
                    {period !== 'daily' && <th className="text-left py-3 px-4 text-yellow-500">Endpoints</th>}
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat, index) => (
                    <tr key={index} className="border-b border-yellow-500/10 hover:bg-yellow-500/5">
                      <td className="py-3 px-4 text-yellow-500/80">{stat.period}</td>
                      {period === 'daily' && <td className="py-3 px-4 text-yellow-500/80">{stat.endpoint}</td>}
                      <td className="py-3 px-4 text-yellow-500">{stat.views.toLocaleString()}</td>
                      <td className="py-3 px-4 text-yellow-500">{stat.unique_visitors.toLocaleString()}</td>
                      <td className="py-3 px-4 text-yellow-500/80">
                        {stat.views > 0 ? Math.round((stat.unique_visitors / stat.views) * 100) : 0}%
                      </td>
                      {period !== 'daily' && <td className="py-3 px-4 text-yellow-500/80">{stat.endpoints_count}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
