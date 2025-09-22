import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, FileText, Send, CheckCircle, AlertCircle, Upload as UploadIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvFile: File | null; // <-- أضفنا هذا الحقل الجديد
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  coverLetter?: string;
  cvFile?: string; // <-- أضفنا هذا الحقل الجديد
}

const JobApplication = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cvFile: null // <-- تهيئة الحقل الجديد
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

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Cover Letter validation
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter/message is required';
    } else if (formData.coverLetter.trim().length < 10) {
      newErrors.coverLetter = 'Cover letter must be at least 10 characters';
    }

    // CV File validation
    if (!formData.cvFile) {
      newErrors.cvFile = 'Please upload your CV (PDF or DOC)';
    } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(formData.cvFile.type)) {
      newErrors.cvFile = 'Please upload a PDF or Word document';
    } else if (formData.cvFile.size > 5 * 1024 * 1024) { // 5MB limit
      newErrors.cvFile = 'File size must be less than 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // دالة جديدة للتعامل مع تحميل ملف الـ CV
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cvFile: file }));
    
    // Clear error for CV file
    if (errors.cvFile) {
      setErrors(prev => ({ ...prev, cvFile: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // إدخال بيانات الطلب في قاعدة البيانات
      const { error } = await supabase
        .from('job_applications')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          cover_letter: formData.coverLetter,
          resume_url: null // CV storage not configured, saving without file
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ fullName: '', email: '', phone: '', coverLetter: '', cvFile: null });
      setErrors({});
    } catch (error) {
      console.error('Error submitting job application:', error);
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Job Application</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join our team of paint specialists and help us continue our legacy of excellence in the industry.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2C5DB6] rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Excellence Since 1955</h3>
              <p className="text-gray-600 text-sm">Join a company with nearly 70 years of industry leadership</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2C5DB6] rounded-lg flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Growth</h3>
              <p className="text-gray-600 text-sm">Opportunities for professional development and advancement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2C5DB6] rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Work with cutting-edge paint technologies and solutions</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12"> {/* <-- زدنا marginBottom إلى mb-12 لزيادة البادينغ */} 
            Submit Your Application
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8"> {/* <-- زدنا الفاصل بين العناصر إلى space-y-8 */}
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
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
                    : 'border-gray-200 focus:border-[#2C5DB6] focus:ring-2 focus:ring-[#2C5DB6]/20'
                }`}
                placeholder="Enter your full name"
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
                Email Address *
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
                    : 'border-gray-200 focus:border-[#2C5DB6] focus:ring-2 focus:ring-[#2C5DB6]/20'
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
                Phone Number *
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
                    : 'border-gray-200 focus:border-[#2C5DB6] focus:ring-2 focus:ring-[#2C5DB6]/20'
                }`}
                placeholder="+1 (555) 123-4567"
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
                Cover Letter / Message *
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
                    : 'border-gray-200 focus:border-[#2C5DB6] focus:ring-2 focus:ring-[#2C5DB6]/20'
                }`}
                placeholder="Tell us about yourself, your experience, and why you'd like to work with Al Azmeh Paints..."
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

            {/* CV Upload - الحقل الجديد */}
            <div>
              <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700 mb-2">
                <UploadIcon className="w-4 h-4 inline mr-2" />
                Upload Your CV (PDF or DOC) *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#2C5DB6] transition-colors">
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="cvFile"
                      className="relative cursor-pointer rounded-md font-medium text-[#2C5DB6] hover:text-blue-700 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="cvFile"
                        name="cvFile"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF or DOC up to 5MB</p>
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
                    <h3 className="font-semibold text-green-800">Application Submitted Successfully!</h3>
                    <p className="text-green-700 text-sm mt-1">
                      Thank you for your interest in Al Azmeh Paints. We'll review your application and contact you soon.
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
                    <h3 className="font-semibold text-red-800">Submission Failed</h3>
                    <p className="text-red-700 text-sm mt-1">
                      There was an error submitting your application. Please try again.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-[#2C5DB6]/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>
              By submitting this application, you agree to our processing of your personal data for recruitment purposes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobApplication;