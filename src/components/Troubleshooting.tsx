import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft, Search, AlertTriangle, CheckCircle, Wrench, AlertCircle } from 'lucide-react';
import { supabase, TroubleshootingCategory, TroubleshootingItem } from '../lib/supabase';

const Troubleshooting = () => {
  const { category } = useParams<{ category?: string }>();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [troubleshootingCategories, setTroubleshootingCategories] = useState<(TroubleshootingCategory & { troubleshooting_items: TroubleshootingItem[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTroubleshootingData();
  }, []);

  const fetchTroubleshootingData = async () => {
    try {
      const { data, error } = await supabase
        .from('troubleshooting_categories')
        .select(`
          *,
          troubleshooting_items (*)
        `)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTroubleshootingCategories(data || []);
    } catch (error) {
      console.error('Error fetching troubleshooting data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get the current category data
  const currentCategory = category 
    ? troubleshootingCategories.find(cat => cat.id === category)
    : null;

  // If no category is specified, show category selection
  if (!category) {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-[#0055A3]"></div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Troubleshooting Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find solutions to common coating problems and application defects. Our comprehensive guides help you identify, prevent, and resolve coating issues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {troubleshootingCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/troubleshooting/${cat.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
<div className="flex mb-4">

  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
    <Wrench className="w-6 h-6 text-white" />
  </div>


  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
    {cat.name}
  </h3>
</div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>View Solutions</span>
                    <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    {cat.troubleshooting_items.length} issues covered
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Filter issues based on search
  const filteredIssues = currentCategory 
    ? currentCategory.troubleshooting_items.filter(issue => 
        issue.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.solution.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      case 'Medium': return <AlertCircle className="w-4 h-4" />;
      case 'Low': return <CheckCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

 // بعد جلب البيانات، إذا انتهى التحميل ومافي فئة مطابقة
if (!loading && category && !currentCategory) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-8">The troubleshooting category you're looking for doesn't exist.</p>
        <Link to="/troubleshooting" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
          Back to Troubleshooting
        </Link>
      </div>
    </div>
  );
}

// أثناء التحميل، حتى لو category موجود، لا تعرض Not Found
if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-[#0055A3]"></div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/troubleshooting" className="hover:text-orange-600 transition-colors">Troubleshooting</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{currentCategory.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
    
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentCategory.title}
          </h1>
         
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all"
            />
          </div>
          {searchTerm && (
            <p className="text-center text-gray-600 mt-4">
              {filteredIssues.length} result(s) found for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredIssues.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors leading-relaxed mb-2">
                        {item.problem}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                          {getSeverityIcon(item.severity)}
                          <span>{item.severity} Priority</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <motion.div
                      animate={{ rotate: openItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-12 pr-4">
                          <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                                <p className="text-gray-700 leading-relaxed">
                                  {item.solution}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Additional Technical Support?</h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Our technical experts are available to help you resolve complex coating issues and provide personalized solutions for your specific applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Technical Support
              </button>
              <button className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
                Schedule Expert Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Troubleshooting;