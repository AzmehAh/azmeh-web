import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, CheckCircle } from 'lucide-react';
import { supabase, FAQCategory, FAQItem } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { category } = useParams<{ category?: string }>();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [faqCategories, setFaqCategories] = useState<(FAQCategory & { faq_items: FAQItem[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language; // "ar" or "en"

  useEffect(() => {
    fetchFAQData();
  }, []);

  const fetchFAQData = async () => {
    try {
      const { data, error } = await supabase
        .from('faq_categories')
        .select(`
          *,
          faq_items (*)
        `)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFaqCategories(data || []);
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getField = (item: any, field: string) => {
    if (currentLang === 'ar' && item[`${field}_ar`]) return item[`${field}_ar`];
    return item[`${field}_en`] || item[field];
  };

  const currentCategory = category ? faqCategories.find(cat => cat.id === category) : null;

  if (!category) {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
        </div>
      );
    }

return (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          {t('faq.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t('faq.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {faqCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/faq/${cat.id}`}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex mb-4">
                <div className="w-12 h-12 flex-shrink-0 bg-[#0055A3] rounded-xl flex items-center justify-center mr-4">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0055A3] min-h-[64px] transition-colors leading-snug">
                  {getField(cat, 'name')}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                {getField(cat, 'description')}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center text-[#0055A3] font-semibold group-hover:translate-x-2 transition-transform">
                  <span>{t('faq.viewQuestions')}</span>
                  <ChevronDown className={`w-4 h-4 ml-2 ${ isRTL ? 'rotate-[90deg]' : 'rotate-[-90deg]'}`} />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {cat.faq_items.length} {t('faq.questionsAvailable')}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
     
  }

  const filteredFAQs = currentCategory
    ? currentCategory.faq_items.filter(faq =>
        getField(faq, 'question').toLowerCase().includes(searchTerm.toLowerCase()) ||
        getField(faq, 'answer').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  if (!loading && category && !currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('faq.notFoundTitle')}</h1>
          <p className="text-gray-600 mb-8">{t('faq.notFoundDesc')}</p>
          <Link to="/faq" className="bg-[#0055A3] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {t('faq.backToCategories')}
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`flex items-center text-sm text-gray-600 ${currentLang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Link to="/" className="hover:text-[#0055A3] transition-colors">{t('faq.home')}</Link>
            <span className="mx-2">/</span>
            <Link to="/faq" className="hover:text-[#0055A3] transition-colors">{t('faq.title')}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{getField(currentCategory, 'name')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {getField(currentCategory, 'name')}
        </h1>

        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Search className={`absolute ${currentLang === 'ar' ? 'right-4' : 'left-4'} top-3.5 w-5 h-5 text-gray-400`} />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${currentLang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0055A3] focus:ring-2 focus:ring-[#0055A3]/20 transition-all`}
            />
          </div>
          {searchTerm && (
            <p className="text-center text-gray-600 mt-4">
              {filteredFAQs.length} {t('faq.resultsFound')} "{searchTerm}"
            </p>
          )}
        </div>

        <div className="space-y-4 text-left">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('faq.noQuestions')}</h3>
              <p className="text-gray-600">{t('faq.trySearch')}</p>
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
                      <div className="w-8 h-8 bg-gradient-to-br from-[#0055A3] to-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0055A3] transition-colors leading-relaxed">
                      {getField(item, 'question')}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#0055A3]" />
                  </motion.div>
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
                      <div className="px-6 pb-6 pl-12">
                        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-[#0055A3]">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[#0055A3] mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 leading-relaxed">
                              {getField(item, 'answer')}
                            </p>
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

        <div className="mt-16 text-center">
          <div className="bg-[#0055A3] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('faq.stillHaveQuestions')}</h3>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              {t('faq.supportText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-[#0055A3] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors block text-center"
              >
                {t('faq.contactSupport')}
              </Link>
              <Link
                to="/contact"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm block text-center"
              >
                {t('faq.scheduleConsultation')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
