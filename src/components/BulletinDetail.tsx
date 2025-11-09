import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Bulletin } from '../lib/supabase';
import { api } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const BulletinDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const [relatedBulletins, setRelatedBulletins] = useState<Bulletin[]>([]);
  const [categoryConfigs, setCategoryConfigs] = useState<Record<string, { name: string; name_ar: string }>>({});
  const [loading, setLoading] = useState(true);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // 1. جلب النشرة
        const bulletinData = await api.getBulletin(id);
        if (!bulletinData) {
          setBulletin(null);
          return;
        }
        setBulletin(bulletinData);

        // 2. جلب تكوين التصنيفات
        const categoriesConfig = await api.getBulletinCategoriesConfig();
        const configMap: Record<string, { name: string; name_ar: string }> = {};
        categoriesConfig.forEach(cat => {
          configMap[cat.name] = { 
            name: cat.name, 
            name_ar: cat.name_ar || cat.name 
          };
        });
        setCategoryConfigs(configMap);

        // 3. جلب النشرات المرتبطة
        if (bulletinData.related_bulletin_ids?.length > 0) {
          const related = await api.getBulletinsByIds(bulletinData.related_bulletin_ids);
          setRelatedBulletins(related);
        } else {
          const autoRelated = await api.getRelatedBulletins(bulletinData.id, bulletinData.category, bulletinData.subcategory);
          setRelatedBulletins(autoRelated);
        }
      } catch (error) {
        console.error('Error fetching bulletin:', error);
        setBulletin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logo"></div>
      </div>
    );
  }

  if (!bulletin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('bulletin.notFoundTitle')}</h1>
        <p className="text-gray-600 mb-8">{t('bulletin.notFoundText')}</p>
        <Link
          to="/blog"
          className="bg-logo text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('bulletin.backToBlog')}
        </Link>
      </div>
    );
  }

  // 🇴 تحديد الحقول حسب اللغة
  const title = isRTL ? bulletin.title_ar || bulletin.title : bulletin.title;
  const shortDescription = isRTL ? bulletin.short_description_ar || bulletin.short_description : bulletin.short_description;
  const content = isRTL ? bulletin.content_ar || bulletin.content : bulletin.content;

  // ✅ حساب اسم التصنيف المعروض (باستخدام التكوين)
  const categoryName = bulletin.category;
  const categoryDisplayName = isRTL
    ? (categoryConfigs[categoryName]?.name_ar || categoryName)
    : categoryName;

  // ✅ حساب اسم التصنيف الفرعي المعروض
  const subcategory = isRTL 
    ? bulletin.subcategory_ar || bulletin.subcategory 
    : bulletin.subcategory;

  return (
    <div className={`min-h-screen bg-gray-50 pt-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'flex-row-reverse gap-reverse' : ''}`}>
            <Link to="/" className="hover:text-logo transition-colors">{t('bulletin.home')}</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-logo transition-colors">{t('bulletin.blog')}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{categoryDisplayName}</span> {/* ✅ هنا تم التعديل */}
            <span className="mx-2">/</span>
            <span className="text-gray-900">{subcategory}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-r from-logo to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-blue-100 hover:text-white font-medium mb-6 transition-colors"
          >
            {isRTL ? null : <ArrowLeft className="w-4 h-4 mr-2" />}
            {t('bulletin.backToBlog')}
            {isRTL ? <ArrowLeft className="w-4 h-4 ml-2 " /> : null}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {categoryDisplayName} {/* ✅ هنا تم التعديل */}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {subcategory}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{title}</h1>
          <p className="text-xl text-blue-100 leading-relaxed">{shortDescription}</p>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`prose ${isRTL ? 'prose-rtl' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content)
              }}
            />
          </article>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 text-logo mr-3" />
              {bulletin?.related_bulletin_ids?.length > 0
                ? t('bulletin.related')
                : t('bulletin.suggestions')}
            </h3>

            {relatedBulletins.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {relatedBulletins.map((related) => {
                  const relTitle = isRTL ? related.title_ar || related.title : related.title;
                  const relShort = isRTL ? related.short_description_ar || related.short_description : related.short_description;
                  const relSub = isRTL ? related.subcategory_ar || related.subcategory : related.subcategory;
                  const relCategory = isRTL
                    ? (categoryConfigs[related.category]?.name_ar || related.category)
                    : related.category;

                  return (
                    <div
                      key={related.id}
                      onClick={() => navigate(`/bulletin/${related.id}`)}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="h-63 overflow-hidden">
                        <img
                          src={related.cover_image || '/placeholder-image.jpg'}
                          alt={relTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-logo text-xs font-medium rounded-full mb-2">
                          {relSub}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-logo transition-colors mb-2 line-clamp-2">
                          {relTitle}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{relShort}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 italic">
                {t('bulletin.noRelated')}
              </p>
            )}
          </div>

          {/* Contact Section */}
        <div className="mt-16">
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
    <h3 className="text-2xl font-bold mb-4">{t('bulletin.needHelpTitle')}</h3>
    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{t('bulletin.needHelpText')}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
      <Link
        to="/contact"
        className=" bg-gradient-to-r from-logo to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-logo/20  text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
      >
        {t('bulletin.contactTeam')}
      </Link>

      <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
        {t('bulletin.downloadPdf')}
      </button>
    </div>
  </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default BulletinDetail;