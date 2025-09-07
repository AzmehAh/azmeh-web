import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowLeft, Search, HelpCircle, CheckCircle } from 'lucide-react';
import { faqCategories, FAQItem } from '../data/faqData';

const FAQ = () => {
  const { category } = useParams<{ category?: string }>();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get the current category data
  const currentCategory = category 
    ? faqCategories.find(cat => cat.id === category)
    : null;

  // If no category is specified, show category selection
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our paint systems, application techniques, and technical specifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/faq/${cat.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                <div className="flex mb-4">
  {/* أيقونة ثابتة */}
  <div className="w-12 h-12 flex-shrink-0 bg-[#0055A3] rounded-xl flex items-center justify-center mr-4">
    <HelpCircle className="w-6 h-6 text-white" />
  </div>

  {/* نص العنوان */}
  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0055A3] transition-colors leading-snug">
    {cat.title}
  </h3>
</div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {cat.description}
                  </p>
                  <div className="flex items-center text-[#0055A3] font-semibold group-hover:translate-x-2 transition-transform">
                    <span>View Questions</span>
                    <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    {cat.data.length} questions available
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Filter FAQs based on search
  const filteredFAQs = currentCategory 
    ? currentCategory.data.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The FAQ category you're looking for doesn't exist.</p>
          <Link to="/faq" className="bg-[#0055A3] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to FAQ Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0055A3] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/faq" className="hover:text-[#0055A3] transition-colors">FAQ</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{currentCategory.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link
            to="/faq"
            className="inline-flex items-center text-[#2C5DB6] hover:text-blue-700 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Categories
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentCategory.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {currentCategory.description}
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2C5DB6] focus:ring-2 focus:ring-[#2C5DB6]/20 transition-all"
            />
          </div>
          {searchTerm && (
            <p className="text-center text-gray-600 mt-4">
              {filteredFAQs.length} result(s) found for "{searchTerm}"
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredFAQs.map((item, index) => (
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
                      <div className="w-8 h-8 bg-gradient-to-br from-[#2C5DB6] to-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#2C5DB6] transition-colors leading-relaxed">
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <motion.div
                      animate={{ rotate: openItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#2C5DB6] transition-colors" />
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
                          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-[#2C5DB6]">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-[#2C5DB6] mt-0.5 flex-shrink-0" />
                              <p className="text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
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
          <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our technical experts are ready to help you with any specific questions about our products and applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#2C5DB6] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Technical Support
              </button>
              <button className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30  transition-colors backdrop-blur-sm">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;