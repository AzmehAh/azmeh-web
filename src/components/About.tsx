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
  Handshake,
  Star,
  Building
} from 'lucide-react';

const About = () => {
  const [experienceCount, setExperienceCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  // Calculate years since 1955
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 1955;

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

      animateCounter(setExperienceCount, yearsOfExperience, 2000);
      animateCounter(setProjectsCount, 8000, 2500);
      animateCounter(setClientsCount, 2000, 2000);
      animateCounter(setCountriesCount, 35, 1500);
    }
  }, [isStatsInView, yearsOfExperience]);

  const companyValues = [
    {
      icon: Shield,
      title: 'Quality Excellence',
      description: 'Unwavering commitment to delivering the highest quality paint systems across all product lines.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuous research and development to create cutting-edge coating technologies and solutions.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Globe,
      title: 'Social Responsibility',
      description: 'Environmental stewardship through eco-friendly formulations and sustainable business practices.',
      color: 'from-green-500 to-green-700'
    },
    {
      icon: Users,
      title: 'Employee Growth',
      description: 'Investing in our team through continuous training, development, and career advancement opportunities.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: Handshake,
      title: 'Customer Trust',
      description: 'Building lasting relationships through exceptional service, technical support, and reliable products.',
      color: 'from-red-500 to-red-700'
    },
    {
      icon: Award,
      title: 'Industry Leadership',
      description: 'Setting standards for excellence and innovation in the paint and coatings industry.',
      color: 'from-indigo-500 to-indigo-700'
    }
  ];

  const goals = [
    {
      icon: TrendingUp,
      title: 'Market Expansion',
      description: 'Strengthen our position as the leading paint manufacturer in the Middle East and expand to new international markets.',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Factory,
      title: 'Production Excellence',
      description: 'Modernize manufacturing facilities and implement Industry 4.0 technologies for enhanced efficiency.',
      gradient: 'from-green-500 to-green-700'
    },
    {
      icon: Globe,
      title: 'Sustainability Goals',
      description: 'Achieve carbon neutrality by 2030 and develop comprehensive eco-friendly product lines.',
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      icon: Users,
      title: 'Customer Excellence',
      description: 'Provide world-class customer service and technical support across all markets we serve.',
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
                  EST. 1955
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
                  <span className="text-xl">Founded in 1955</span>
                </div>
                <div className="flex items-start justify-center lg:justify-start space-x-3">
                  <Eye className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <p className="text-lg font-semibold mb-2">Our Vision</p>
                    <p className="text-blue-100 leading-relaxed">
                      To be the leading innovator in paint and coating technologies, providing sustainable 
                      solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Company Description */}
            
          {/* Right Side - Company Information (6 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
            
          >
            {/* About Us Label */}
            <span className=" self-start inline-block px-4 py-2 bg-[#ffffff] text-[#2C5DB6] rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
              About Us
            </span>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8 leading-tight">
              Al Azmeh Paints Company Founded in 1955 in Damascus, Syria
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Al Azmeh has set its sights on delivering the highest quality paint systems and coatings. 
              With decades of excellence and expertise, and through its constant commitment to quality, 
              the company has become one of the leading brands in the paint industry both locally and globally.
            </p>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 font-medium">{achievement}</span>
                </motion.div>
              ))}
            </div>
 
            {/* Read More Button */}
            <motion.button
              onClick={() => navigate('/about')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className=" self-start group inline-flex items-center space-x-3 px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#2C5DB6] hover:text-[#2C5DB6] transition-all duration-300"
            >
              <span>READ MORE</span>
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

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-[#2C5DB6] to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
                To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. 
                We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility 
                to the environment and society.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {['Quality Products', 'Innovation Focus', 'Customer Trust', 'Environmental Care'].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors duration-300"
                  >
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">{value}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
                    <p className="text-blue-200">Founder & Visionary</p>
                    <div className="mt-4 space-y-1 text-sm text-blue-200">
                      <p>Born: 1918, Damascus</p>
                      <p>Started Business: 1938</p>
                      <p>Founded Al Azmeh Paints: 1955</p>
                      <p>Legacy Continues: 1918 - 1998</p>
                    </div>
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
                  Ahmed Al Azmeh was born in 1918 in Damascus, Syria. He started his entrepreneurial 
                  journey in 1938 and founded Al Azmeh Paints Company in 1955 with a clear vision: 
                  to create the highest quality paint systems for every application.
                </p>
                <p>
                  Throughout his life until 1998, Ahmed led the company with unwavering dedication 
                  to quality and innovation. His vision transformed a small local business into a 
                  respected name in the paint industry, serving customers across multiple sectors 
                  including residential, furniture, automotive, and industrial markets.
                </p>
                <p>
                  His legacy of excellence continues to guide our company today, as we maintain the 
                  same commitment to quality and customer satisfaction that he established nearly 
                  seven decades ago.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">80</div>
                  <div className="text-gray-400">Years of Leadership</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">1955</div>
                  <div className="text-gray-400">Company Founded</div>
                </div>
              </div>
            </motion.div>
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
      className="card-hover group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* الخط العلوي الأزرق لكل كارد */}
      <div className="card-top-line w-full bg-gray-200"></div>

      <div className="p-8">
        {/* أيقونة + عنوان */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300"
          >
            <goal.icon className="w-8 h-8 text-[#0055A3]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{goal.title}</h3>
        </div>

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
              The principles that guide every decision we make and every solution we create for our customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white  shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-[#0055A3]/20"
              >
            <div className="flex flex-col items-start gap-2">
  <div className="flex items-center gap-3">
    <div
      className={`w-16 h-16  flex items-center justify-center   transition-all duration-300`}
    >
      <value.icon className="w-8 h-8 group-hover:text-[#0055A3] text-gray-600" />
    </div>
    <h3 className="text-xl font-bold group-hover:text-[#0055A3] text-gray-900">{value.title}</h3>
  </div>
  <p className="text-gray-600 leading-relaxed">{value.description}</p>
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
              Let our {yearsOfExperience}+ years of experience and innovative solutions bring your vision to life. 
              Whether it's for your home, furniture, vehicle, or industrial facility, we have the perfect paint solution.
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