import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, FileText } from 'lucide-react';
import DOMPurify from 'dompurify';
import { Bulletin } from '../lib/supabase';
import { api } from '../lib/supabase';

const BulletinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const [relatedBulletins, setRelatedBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBulletin(id);
    }
  }, [id]);

  const fetchBulletin = async (bulletinId: string) => {
    try {
      setLoading(true);
      const data = await api.getBulletin(bulletinId);
      if (!data) {
        setBulletin(null);
        return;
      }
      setBulletin(data);

      // ✅ جلب المقالات المرتبطة مباشرة من قاعدة البيانات
      const related = await api.getRelatedBulletins(bulletinId, data.category, data.subcategory);
      setRelatedBulletins(related);
    } catch (error) {
      console.error('Error fetching bulletin:', error);
      setBulletin(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div>
      </div>
    );
  }

  if (!bulletin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bulletin Not Found</h1>
          <p className="text-gray-600 mb-8">The technical bulletin you're looking for doesn't exist.</p>
          <Link to="/systems" className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Systems
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
            <Link to="/" className="hover:text-[#2C5DB6] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/systems" className="hover:text-[#2C5DB6] transition-colors">Systems</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{bulletin.subcategory}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{bulletin.title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/systems')}
            className="inline-flex items-center text-blue-100 hover:text-white font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Systems
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {bulletin.category}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {bulletin.subcategory}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {bulletin.title}
          </h1>

          <p className="text-xl text-blue-100 leading-relaxed">
            {bulletin.shortDescription}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bulletin.content)
              }}
            />
          </article>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 text-[#2C5DB6] mr-3" />
              Related Technical Bulletins
            </h3>

            {relatedBulletins.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {relatedBulletins.map((relatedBulletin) => (
                  <div
                    key={relatedBulletin.id}
                    onClick={() => navigate(`/bulletin/${relatedBulletin.id}`)}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={relatedBulletin.coverImage || '/placeholder-image.jpg'}
                        alt={relatedBulletin.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-blue-50 text-[#2C5DB6] text-xs font-medium rounded-full mb-2">
                        {relatedBulletin.subcategory}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#2C5DB6] transition-colors mb-2 line-clamp-2">
                        {relatedBulletin.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedBulletin.shortDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 italic">No related bulletins available at this time.</p>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Need Technical Consultation?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Our technical experts are ready to help you implement these solutions in your specific application requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#2C5DB6] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                    Contact Technical Team
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                    Download PDF Version
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinDetail;