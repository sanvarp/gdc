/**
 * Admin Page - Ultra Premium Dark Theme Dashboard
 * Professional admin panel with glassmorphism and animations
 */

import { useState } from 'react';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics' | 'settings'>('overview');

  // Mock data for stats
  const stats = [
    {
      label: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: '👥',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      label: 'Active Sessions',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: '🔥',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      label: 'Revenue',
      value: '$45.2k',
      change: '+23.1%',
      trend: 'up',
      icon: '💰',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: '⚡',
      gradient: 'from-blue-500 to-cyan-600',
    },
  ];

  const recentActivity = [
    { user: 'María García', action: 'Created new document', time: '2 min ago', avatar: '🧑‍💼' },
    { user: 'Juan Pérez', action: 'Updated profile', time: '5 min ago', avatar: '👨‍💻' },
    { user: 'Ana López', action: 'Submitted form', time: '12 min ago', avatar: '👩‍🔬' },
    { user: 'Carlos Ruiz', action: 'Logged in', time: '15 min ago', avatar: '👨‍🎨' },
    { user: 'Laura Martín', action: 'Downloaded report', time: '20 min ago', avatar: '👩‍💼' },
  ];

  const systemMetrics = [
    { name: 'CPU Usage', value: 45, color: 'bg-violet-500' },
    { name: 'Memory', value: 68, color: 'bg-blue-500' },
    { name: 'Storage', value: 32, color: 'bg-emerald-500' },
    { name: 'Network', value: 89, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-lg">Welcome back, Administrator</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 backdrop-blur-sm">
                <span className="mr-2">🔔</span>
                Notifications
              </button>
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all duration-200 shadow-lg shadow-purple-500/30">
                Settings
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 p-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 w-fit">
            {(['overview', 'users', 'analytics', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{stat.icon}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    stat.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>

              {/* Animated border gradient */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-20 blur-xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/20 group"
                >
                  <div className="text-3xl bg-gradient-to-br from-violet-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {activity.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.user}</div>
                    <div className="text-sm text-gray-400">{activity.action}</div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Metrics */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/[0.07] transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">System Metrics</h2>
            <div className="space-y-6">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300 font-medium">{metric.name}</span>
                    <span className="text-white font-semibold">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: `${metric.value}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 hover:from-violet-600/30 hover:to-purple-600/30 border border-violet-500/30 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30">
                Generate Report
              </button>
              <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
                Backup Data
              </button>
              <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/30 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30">
                System Health Check
              </button>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'User Management', icon: '👥', desc: 'Manage users and roles', gradient: 'from-violet-500 to-purple-600' },
            { title: 'Security', icon: '🔐', desc: 'Configure security settings', gradient: 'from-orange-500 to-red-600' },
            { title: 'Analytics', icon: '📊', desc: 'View detailed analytics', gradient: 'from-blue-500 to-cyan-600' },
            { title: 'Configuration', icon: '⚙️', desc: 'System configuration', gradient: 'from-emerald-500 to-teal-600' },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
                <div className="mt-4 flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">System Status: Operational</h3>
              <p className="text-sm text-gray-400">All systems are running smoothly. Last updated: just now</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
