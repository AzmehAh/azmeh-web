import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              {t('contact.heroDescription')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('contact.getInTouch')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t('contact.contactDescription')}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#2C5DB6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t('contact.emailUs')}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {t('contact.emailDescription')}
                    </p>
                    <a href="mailto:manager@dkl-syria.com" className="text-[#2C5DB6] font-medium hover:underline">
                      manager@dkl-syria.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#2C5DB6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t('contact.callUs')}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {t('contact.callDescription')}
                    </p>
                    <a href="tel:+963988691712" className="text-[#2C5DB6] font-medium hover:underline">
                      (+963) 988 691 712
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#2C5DB6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t('contact.visitUs')}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {t('contact.visitDescription')}
                    </p>
                    <p className="text-gray-700">
                      {t('contact.location')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}