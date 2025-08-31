import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import { blogPosts, BlogPost as BlogPostType } from '../data/blogsData';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = blogPosts.find(p => p.id === id);
      setPost(foundPost || null);
    }
  }, [id]);

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-[#2C5DB6] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/systems" className="hover:text-[#2C5DB6] transition-colors">Systems</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link
          to="/systems"
          className="inline-flex items-center text-[#2C5DB6] hover:text-blue-700 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Systems
        </Link>

        {/* Header */}
        <header className="mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {post.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {post.description}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-[#2C5DB6]" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#2C5DB6]" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#2C5DB6]" />
              <span>{post.readTime}</span>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#2C5DB6] rounded-full text-sm font-medium"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </motion.div>
        </header>

        {/* Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className="article-content"
            dangerouslySetInnerHTML={createMarkup(post.content)}
          />
        </motion.div>

        {/* Share Section */}
        <motion.div
          className="mt-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Found this article helpful?</h3>
              <p className="text-gray-600">Share it with your network or save it for later reference.</p>
            </div>
            <button className="flex items-center space-x-2 bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share Article</span>
            </button>
          </div>
        </motion.div>
      </article>

      {/* Styles for article content */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .article-content h2 {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1f2937;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.2;
          }
          
          .article-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            line-height: 1.3;
          }
          
          .article-content h4 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #374151;
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
            line-height: 1.4;
          }
          
          .article-content p {
            color: #4b5563;
            line-height: 1.7;
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
          }
          
          .article-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            background: white;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
          
          .article-content th {
            background: #2C5DB6;
            color: white;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .article-content td {
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
            color: #374151;
          }
          
          .article-content tr:last-child td {
            border-bottom: none;
          }
          
          .article-content tr:nth-child(even) {
            background: #f9fafb;
          }
          
          .article-content img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 1rem;
            margin: 2rem 0;
            box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
    </div>
  );
};

export default BlogPost;