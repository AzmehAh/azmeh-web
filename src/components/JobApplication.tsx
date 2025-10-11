import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, FileText, Send, CheckCircle, AlertCircle, Upload as UploadIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvFile: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  coverLetter?: string;
  cvFile?: string;
}

const JobApplication = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cvFile: null
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\s()-]+$/;
    return phoneRegex.test(phone.trim()) && phone.replace(/[^0-9]/g, '').length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('jobApplication.validation.fullNameRequired');
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = t('jobApplication.validation.fullNameMinLength');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('jobApplication.validation.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('jobApplication.validation.emailInvalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('jobApplication.validation.phoneRequired');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('jobApplication.validation.phoneInvalid');
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = t('jobApplication.validation.coverLetterRequired');
    } else if (formData.coverLetter.trim().length < 10) {
      newErrors.coverLetter = t('jobApplication.validation.coverLetterMinLength');
    }

    if (!formData.cvFile) {
      newErrors.cvFile = t('jobApplication.validation.cvRequired');
    } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(formData.cvFile.type)) {
      newErrors.cvFile = t('jobApplication.validation.cvInvalidType');
    } else if (formData.cvFile.size > 5 * 1024 * 1024) {
      newErrors.cvFile = t('jobApplication.validation.cvSizeExceeded');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cvFile: file }));
    
    if (errors.cvFile) {
      setErrors(prev => ({ ...prev, cvFile: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let resumeUrl = null;
      
      if (formData.cvFile) {
        try {
          const fileExt = formData.cvFile.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `job-applications/resumes/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('system-media')
            .upload(filePath, formData.cvFile);

          if (uploadError) {
            throw uploadError;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('system-media')
            .getPublicUrl(filePath);
          
          resumeUrl = publicUrl;
        } catch (uploadError) {
          console.error('CV upload failed:', uploadError);
          alert(t('jobApplication.errorMessage'));
          setIsSubmitting(false);
          return;
        }
      }

      const { error } = await supabase
        .from('job_applications')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          cover_letter: formData.coverLetter,
          resume_url: resumeUrl
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ fullName: '', email: '', phone: '', coverLetter: '', cvFile: null });
      setErrors({});
      
      const fileInput = document.getElementById('cvFile') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting job application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section */}
     <div className=" text-logo pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
       
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('jobApplication.title')}
            </h1>
            
        
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('jobApplication.whyWorkWithUs')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-logo rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t('jobApplication.excellenceSince1955')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('jobApplication.excellenceDescription')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-logo rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t('jobApplication.careerGrowth')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('jobApplication.careerGrowthDescription')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-logo rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t('jobApplication.innovation')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('jobApplication.innovationDescription')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            {t('jobApplication.submitApplication')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {t('jobApplication.fullName')} *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                  errors.fullName 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-logo focus:ring-2 focus:ring-logo/20'
                }`}
                placeholder={t('jobApplication.fullName')}
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {t('jobApplication.emailAddress')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-logo focus:ring-2 focus:ring-logo/20'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                {t('jobApplication.phoneNumber')} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                  errors.phone 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-logo focus:ring-2 focus:ring-logo/20'
                }`}
                placeholder="+963**********"
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                {t('jobApplication.coverLetter')} *
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all resize-vertical ${
                  errors.coverLetter 
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gray-200 focus:border-logo focus:ring-2 focus:ring-logo/20'
                }`}
                placeholder={t('jobApplication.coverLetter')}
              />
              {errors.coverLetter && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.coverLetter}
                </motion.p>
              )}
            </div>

            {/* CV Upload */}
            <div>
              <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700 mb-2">
                <UploadIcon className="w-4 h-4 inline mr-2" />
                {t('jobApplication.uploadCV')} *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-logo transition-colors">
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="cvFile"
                      className="relative cursor-pointer rounded-md font-medium text-logo hover:text-blue-700 focus-within:outline-none"
                    >
                      <span>{t('jobApplication.uploadFile')}</span>
                      <input
                        id="cvFile"
                        name="cvFile"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">{t('jobApplication.dragAndDrop')}</p>
                  </div>
                  <p className="text-xs text-gray-500">{t('jobApplication.fileTypes')}</p>
                  {formData.cvFile && (
                    <p className="text-sm text-green-600 mt-2">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      {formData.cvFile.name}
                    </p>
                  )}
                </div>
              </div>
              {errors.cvFile && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.cvFile}
                </motion.p>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-green-800">
                      {t('jobApplication.applicationSubmitted')}
                    </h3>
                    <p className="text-green-700 text-sm mt-1">
                      {t('jobApplication.successMessage')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && Object.keys(errors).length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-red-800">
                      {t('jobApplication.submissionFailed')}
                    </h3>
                    <p className="text-red-700 text-sm mt-1">
                      {t('jobApplication.errorMessage')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-logo to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-logo/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('jobApplication.submitting')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {t('jobApplication.submitButton')}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>
              {t('jobApplication.privacyNotice')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobApplication;