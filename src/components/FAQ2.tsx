import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'What services does Al Azmeh Paints offer for residential properties?',
      answer: 'Al Azmeh Paints specializes in a wide range of residential services, including precision interior painting, exterior facade restoration, color consultation and design, and custom finishes. We bring expertise and creativity to transform your home into a personalized masterpiece.'
    },
    {
      question: 'How can Al Azmeh Paints enhance the protection of commercial spaces?',
      answer: 'We offer comprehensive commercial painting solutions including industrial coatings, protective finishes for high-traffic areas, specialized floor coatings, and maintenance programs designed to protect and enhance your business environment while minimizing downtime.'
    },
    {
      question: 'Do you offer eco-friendly painting options?',
      answer: 'Yes, we are committed to environmental responsibility. Our eco-friendly paint options include low-VOC and zero-VOC formulations, sustainable painting practices, and environmentally conscious disposal methods to ensure healthier indoor air quality for you and your family.'
    },
    {
      question: 'What is your warranty policy and after-service support?',
      answer: 'We stand behind our work with comprehensive warranties on both materials and workmanship. Our after-service support includes regular maintenance consultations, touch-up services, and technical support to ensure your painted surfaces maintain their beauty and protection for years to come.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Questions */}
          <div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItem === index ? (
                        <ChevronUp className="w-5 h-5 text-[#2C5DB6]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {openItem === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button className="text-[#2C5DB6] font-semibold hover:underline transition-all duration-200">
                Show more questions →
              </button>
            </div>
          </div>

          {/* Right Side - Title */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our answers to your questions
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get instant answers to the most commonly asked questions about our paint systems, application processes, and service offerings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;