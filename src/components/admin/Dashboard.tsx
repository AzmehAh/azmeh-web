import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  FileText, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  products: number;
  bulletins: number;
  messages: number;
  applications: number;
  recentMessages: Array<{
    id: string;
    name: string;
    email: string;
    created_at: string;
  }>;
  recentApplications: Array<{
    id: string;
    full_name: string;
    email: string;
    created_at: string;
  }>;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    bulletins: 0,
    messages: 0,
    applications: 0,
    recentMessages: [],
    recentApplications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        { count: productsCount },
        { count: bulletinsCount },
        { count: messagesCount },
        { count: applicationsCount },
        { data: recentMessages },
        { data: recentApplications }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('bulletins').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('job_applications').select('*', { count: 'exact', head: true }),
        supabase
          .from('contact_messages')
          .select('id, name, email, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('job_applications')
          .select('id, full_name, email, created_at')
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      setStats({
        products: productsCount || 0,
        bulletins: bulletinsCount || 0,
        messages: messagesCount || 0,
        applications: applicationsCount || 0,
        recentMessages: recentMessages || [],
        recentApplications: recentApplications || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Al Azmeh Paints Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.location.href = stat.href}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-[#0055A3]" />
              Recent Messages
            </h3>
          </div>
          <div className="p-6">
            {stats.recentMessages.length > 0 ? (
              <div className="space-y-4">
                {stats.recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#0055A3] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {message.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {message.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{message.email}</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(message.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No messages yet</p>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#0055A3]" />
              Recent Applications
            </h3>
          </div>
          <div className="p-6">
            {stats.recentApplications.length > 0 ? (
              <div className="space-y-4">
                {stats.recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {application.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {application.full_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{application.email}</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(application.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No applications yet</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;