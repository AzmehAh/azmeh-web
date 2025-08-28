import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Zap, Droplet, Settings } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const SystemInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'general';

  const systemInfo = {
    title: "Advanced Paint Systems & Technical Solutions",
    subtitle: "Professional-grade coating solutions engineered for exceptional performance and durability",
    description: "Al Azmeh Paints has been at the forefront of paint technology innovation for over decades, delivering comprehensive coating solutions that protect, beautify, and enhance surfaces across residential, commercial, and industrial applications.",
    features: [
      {
        icon: Shield,
        title: "Advanced Protection",
        description: "Our coating systems provide superior protection against environmental factors, UV radiation, moisture, and chemical exposure, ensuring long-lasting performance."
      },
      {
        icon: Zap,
        title: "High Performance",
        description: "Engineered with cutting-edge technology, our paints deliver exceptional coverage, adhesion, and durability for demanding applications."
      },
      {
        icon: Droplet,
        title: "Eco-Friendly Formulations",
        description: "Committed to environmental sustainability, we offer low-VOC and zero-emission paint systems without compromising on quality."
      },
      {
        icon: Settings,
        title: "Custom Solutions",
        description: "Our technical team develops tailored coating solutions to meet specific project requirements and performance specifications."
      }
    ],
    applications: [
      "Concrete Exterior & Interior Protection",
      "Steel & Metal Surface Coatings",
      "Industrial Floor Coatings",
      "Fire Retardant Systems",
      "Waterproofing Solutions",
      "Decorative Finishes",
      "Anti-Corrosion Coatings",
      "Specialized Adhesives & Sealants"
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-24"
      >
        {/* Hero Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-[#2C5DB6] hover:text-blue-700 mb-8 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {systemInfo.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                {systemInfo.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Description */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Engineering Excellence in Every Coat
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {systemInfo.description}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Applications
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {systemInfo.applications.map((application, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center text-gray-600"
                    >
                      <div className="w-2 h-2 bg-[#2C5DB6] rounded-full mr-3 flex-shrink-0"></div>
                      <span>{application}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Why Choose Our Systems
                </h2>
                <div className="space-y-8">
                  {systemInfo.features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#2C5DB6] rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Technical Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our paint systems are developed using advanced chemistry and rigorous testing to ensure optimal performance in diverse environmental conditions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  metric: "99.9%",
                  label: "Adhesion Rate",
                  description: "Superior bonding to various substrates"
                },
                {
                  metric: "25+ Years",
                  label: "Durability",
                  description: "Proven longevity in harsh conditions"
                },
                {
                  metric: "ISO Certified",
                  label: "Quality Standards",
                  description: "Meets international quality benchmarks"
                }
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-8 bg-white rounded-lg shadow-sm"
                >
                  <div className="text-3xl font-bold text-[#2C5DB6] mb-2">
                    {spec.metric}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {spec.label}
                  </h4>
                  <p className="text-gray-600">
                    {spec.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Contact our technical experts to discuss your project requirements and discover the perfect coating solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#2C5DB6] text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                  Contact Technical Support
                </button>
                <button className="border-2 border-[#2C5DB6] text-[#2C5DB6] px-8 py-4 rounded-lg hover:bg-[#2C5DB6] hover:text-white transition-all duration-200 font-semibold">
                  Download Specifications
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default SystemInfo;