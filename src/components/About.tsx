import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  MapPin, 
  Calendar, 
  Target, 
  Heart, 
  Users, 
  Award, 
  Palette, 
  Shield, 
  Lightbulb, 
  Globe,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Factory,
  Eye,
  Handshake
} from 'lucide-react';

const About = () => {
  const [experienceCount, setExperienceCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  // Animated counters
  useEffect(() => {
    if (isStatsInView) {
      const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(current));
          }
        }, 16);
      };

      animateCounter(setExperienceCount, 50, 2000);
      animateCounter(setProjectsCount, 5000, 2500);
      animateCounter(setClientsCount, 1200, 2000);
      animateCounter(setCountriesCount, 25, 1500);
    }
  }, [isStatsInView]);

  const companyValues = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Unwavering commitment to delivering the highest quality paint systems and technical solutions.',
      color: 'text-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuous research and development to create cutting-edge coating technologies.',
      color: 'text-yellow-600'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Environmental responsibility through eco-friendly formulations and sustainable practices.',
      color: 'text-green-600'
    },
    {
      icon: Handshake,
      title: 'Customer Focus',
      description: 'Building lasting relationships through exceptional service and technical support.',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Setting industry standards through superior performance and reliability.',
      color: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Teamwork',
      description: 'Collaborative approach ensuring every project benefits from our collective expertise.',
      color: 'text-indigo-600'
    }
  ];

  const achievements = [
    'Premium Paint Systems',
    'ISO 9001 & ISO 14001 Certified',
    'Technical Excellence Certified',
    'Over 50 Years of Excellence',
    'Trusted Globally for Quality',
    'Advanced R&D Capabilities'
  ];

  const goals = [
    {
      icon: TrendingUp,
      title: 'Market Leadership',
      description: 'To become the leading paint manufacturer in the Middle East and expand globally.',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Factory,
      title: 'Innovation Hub',
      description: 'Establish world-class R&D facilities for next-generation coating technologies.',
      gradient: 'from-green-500 to-green-700'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Achieve carbon neutrality and develop 100% eco-friendly product lines by 2030.',
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      icon: Users,
      title: 'Customer Excellence',
      description: 'Provide unparalleled customer service and technical support worldwide.',
      gradient: 'from-orange-500 to-orange-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section - Company Overview */}
      <section className="py-20 bg-gradient-to-br from-[#2C5DB6] via-blue-600 to-blue-800 text-white overflow-hidden relative">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Company Logo and Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="relative mb-8">
                {/* Year Badge */}
                <div className="absolute -top-4 -left-4 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg transform rotate-12">
                  EST. 1975
                </div>
                
                {/* Company Logo */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <img
                    src="/images/Azmeh-Paints-Logo-White.png"
                    alt="Al Azmeh Paints"
                    className="h-24 w-auto mx-auto lg:mx-0"
                  />
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-green-400">Al Azmeh Paints</p>
                    <p className="text-blue-200 italic">Excellence in Every Drop</p>
                  </div>
                </div>
              </div>

              {/* Location and Vision */}
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <MapPin className="w-6 h-6 text-green-400" />
                  <span className="text-xl">Damascus, Syria</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Calendar className="w-6 h-6 text-green-400" />
                  <span className="text-xl">Founded in 1975</span>
                </div>
                <div className="flex items-start justify-center lg:justify-start space-x-3">
                  <Eye className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <p className="text-lg font-semibold mb-2">Our Vision</p>
                    <p className="text-blue-100 leading-relaxed">
                      To be the leading innovator in paint and coating technologies, 
                      providing sustainable solutions that protect and beautify the world.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Company Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                About Us
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Al Azmeh Paints Company Founded in 1975 in Damascus, Syria
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Al Azmeh has set its sights on delivering the highest quality paint systems and 
                protective coatings. With decades of excellence and expertise, and through constant 
                commitment to quality, the company has become one of the leading brands in the 
                paint industry both locally and globally.
              </p>

              {/* Experience Hexagon */}
              <div className="flex items-center space-x-8 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 transform rotate-12 rounded-2xl flex items-center justify-center shadow-2xl">
                    <div className="text-center transform -rotate-12">
                      <div className="text-3xl font-bold text-white">50Y+</div>
                      <div className="text-sm text-orange-100 font-medium">Proven Experience</div>
                    </div>
                  </div>
                </div>
                
                {/* Achievements List */}
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-blue-100">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-[#2C5DB6] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Statistics */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Excellence in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our journey of success is reflected in these milestones that showcase our commitment to quality and innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { count: experienceCount, label: 'Years of Experience', suffix: '+', icon: Calendar, color: 'blue' },
              { count: projectsCount, label: 'Projects Completed', suffix: '+', icon: Factory, color: 'green' },
              { count: clientsCount, label: 'Satisfied Clients', suffix: '+', icon: Users, color: 'purple' },
              { count: countriesCount, label: 'Countries Served', suffix: '+', icon: Globe, color: 'orange' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-700 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.count}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Goals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Strategic Goals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving innovation and excellence in every aspect of our business to shape the future of the paint industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${goal.gradient}`}></div>
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <goal.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{goal.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every solution we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-[#2C5DB6]/20"
              >
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${value.color === 'text-blue-600' ? 'from-blue-500 to-blue-700' : 
                    value.color === 'text-yellow-600' ? 'from-yellow-400 to-yellow-600' :
                    value.color === 'text-green-600' ? 'from-green-500 to-green-700' :
                    value.color === 'text-purple-600' ? 'from-purple-500 to-purple-700' :
                    value.color === 'text-red-600' ? 'from-red-500 to-red-700' :
                    'from-indigo-500 to-indigo-700'} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Founder */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#2C5DB6] to-blue-700 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-[#2C5DB6] to-blue-800 rounded-3xl p-8 shadow-2xl">
                  <div className="w-64 h-64 mx-auto bg-gray-300 rounded-2xl flex items-center justify-center">
                    <Users className="w-32 h-32 text-gray-500" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Ahmed Al Azmeh</h3>
                    <p className="text-blue-200">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Founder Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Visionary Leadership
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Ahmed Al Azmeh founded the company in 1975 with a simple vision: to create 
                  the highest quality paint systems that would protect and beautify structures 
                  for generations to come.
                </p>
                <p>
                  With over four decades of experience in chemical engineering and paint 
                  technology, Ahmed has led the company through continuous innovation, 
                  establishing Al Azmeh Paints as a trusted name in the industry.
                </p>
                <p>
                  Under his leadership, the company has expanded from a small local operation 
                  to an internationally recognized manufacturer, serving clients across multiple 
                  continents while maintaining the highest standards of quality and service.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                  <div className="text-gray-400">Years Leading</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">25+</div>
                  <div className="text-gray-400">Countries Reached</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Achievements */}
      <section className="py-20 bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Achievements
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Recognition and certifications that validate our commitment to excellence and quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-white">{achievement}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#2C5DB6] to-blue-700 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Let our 50+ years of experience and innovative solutions bring your vision to life. 
              Contact us today to discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#2C5DB6] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300"
              >
                Get In Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                View Our Products
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;