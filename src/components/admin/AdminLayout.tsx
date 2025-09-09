import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Home, 
  Package, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Users, 
  Settings,
  Layout,
  Tags,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { auth } from '../../lib/auth';

interface AdminLayoutProps {
  onLogout?: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    if (onLogout) onLogout();
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Bulletins', href: '/admin/bulletins', icon: FileText },
    { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
    { name: 'Troubleshooting', href: '/admin/troubleshooting', icon: Settings },
    { name: 'Content', href: '/admin/content', icon: Layout },
    { name: 'Contact Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Job Applications', href: '/admin/applications', icon: Users },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <img
              src="/images/Azmeh-Paints-Logo.png"
              alt="Al Azmeh Paints"
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-600 mb-2">Admin Panel</div>
          <div className="text-xs text-gray-500">Al Azmeh Paints</div>
        </div>

        <nav className="px-4 pb-6">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-[#2C5DB6] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md w-full transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">Administrator</div>
                <div className="text-xs text-gray-500">Authenticated</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;