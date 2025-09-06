import React, { useState, useEffect,useRef  } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, Target, Heart, ArrowRight,
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
const AboutSection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null)];

  const cards = [
    {
      id: 1,
      title: 'Vision',
      image: 'https://m.media-amazon.com/images/I/71wqob-X0nL._UF894%2C1000_QL80_.jpg',
      description: 'To be the leading innovator in paint and coating technologies, providing sustainable solutions that protect and beautify homes, furniture, vehicles, and industrial facilities worldwide.',
      icon: Eye
    },
    {
      id: 2,
      title: 'Mission',
      image: 'https://com.bimago.media/media/catalog/image/view/product/127492/role/image/size/1500x2240/type/ft-osmr-wiz1/61b99cf5ba9560c800f08e85e8e3f534.webp',
      description: 'To provide superior paint and coating solutions that protect, beautify, and enhance every surface we touch. We are committed to innovation, quality, and customer satisfaction while maintaining our responsibility to the environment.',
      icon: Target
    },
    {
      id: 3,
      title: 'Values',
      image: 'https://com.bimago.media/media/catalog/image/view/product/127492/role/image/size/1500x2240/type/ft-osmr-wiz1/61b99cf5ba9560c800f08e85e8e3f534.webp',
      description: 'Quality Excellence, Innovation, Environmental Responsibility, Customer Trust, Employee Growth, and Industry Leadership guide every decision we make and every solution we create.',
      icon: Heart
    }
  ];
  // Calculate years since 1955
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 1955;

  // Company achievements
  const achievements = [
    "Leading paint manufacturer in the Middle East",
    "Premium quality products for over 69 years",
    "Serving residential, automotive, and industrial markets",
    "Innovative eco-friendly paint solutions",
    "Trusted by thousands of customers worldwide",
    "Comprehensive product range for all applications"
  ];

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
 




    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0055A3]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#0055A3] rounded-3xl p-10 shadow-xl flex flex-col justify-center text-white relative overflow-hidden"
          >
            {/* Background decorative circles */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>

            {/* Content with flex column */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                {/* Company Logo */}
                <div className="mb-8 flex justify-center lg:justify-start">
                  <img
                    src="/images/Azmeh-Paints-Logo.png"
                    alt="Al Azmeh Paints"
                    className="h-16 w-auto brightness-0 invert"
                  />
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl md:text-4xl font-semboid text-white mb-6 leading-tight">
                  Al Azmeh Paints – Excellence Since 1955
                </h2>

                {/* Description */}
                <p className="text-blue-100 mb-8 leading-relaxed text-lg">
                  Al Azmeh has set its sights on delivering the highest quality paint systems and coatings. 
                  With decades of excellence and expertise, we have become one of the leading brands in the paint industry.
                </p>

                {/* Features */}
                <div className="text-white/90 mb-8 text-sm uppercase tracking-wide font-medium">
                  PREMIUM QUALITY • INNOVATIVE SOLUTIONS • TRUSTED WORLDWIDE
                </div>
              </div>

              {/* Read More Button */}
              <motion.button
                onClick={() => navigate('/about')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 self-center group inline-flex items-center justify-center space-x-3 px-6 py-2 border-2 border-gray-300 text-white font-semibold rounded-lg hover:border-[#2C5DB6] transition-all duration-300"
              >
                <span>READ MORE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-6 h-full"
          >
            {cards.map((card, index) => (
           <motion.div
  key={card.id} 
  ref={cardRefs[index]}
  className="relative flex-1 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group flex flex-col"
  onHoverStart={() => setHoveredCard(card.id)}
  onHoverEnd={() => setHoveredCard(null)}
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3 }}
>
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src={card.image}
      alt={card.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
  </div>

  {/* Circle Effect */}
  <motion.div
    className="absolute inset-0 rounded-full bg-[#0055A3] origin-center"
    initial={{ scale: 0, opacity: 0.3 }}
    animate={{
      scale: hoveredCard === card.id ? 3 : 0,
      opacity: hoveredCard === card.id ? 1 : 0
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    style={{
      width: "125%",
      height: "400%",
      top: "auto",
      bottom: "-400%",
      left: "auto",
      right: "-16px"
    }}
  />

  {/* Content */}
  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
    {/* Title */}
    <h3 className="text-2xl font-bold text-white">{card.title}</h3>

    {/* Description (fade in/out without changing card height) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: hoveredCard === card.id ? 1 : 0,
        y: hoveredCard === card.id ? 0 : 20
      }}
      transition={{ duration: 0.4 }}
      className="mt-3"
    >
      <p className="text-white text-sm leading-relaxed">
        {card.description}
      </p>
    </motion.div>
  </div>
</motion.div>

                    
               
              
            ))}
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