import React, { useEffect, useRef, useState } from 'react';

const Brands = () => {
  const brands = [
    { name: 'Azmeh Paints', logo: '/images/Azmeh-Paints-Logo.png' },
    { name: 'SRT', logo: '/images/SRT-.gif' },
    { name: 'Original', logo: '/images/Original.gif' },
    { name: 'Omegan', logo: '/images/Omegan.gif' },
    { name: 'Mlonati', logo: '/images/Mlonati.gif' },
    { name: 'Jupiter', logo: '/images/Jupiter.gif' },
    { name: 'COPRAbEL', logo: '/images/COPRAbEL.jpg' },
    { name: 'Capric', logo: '/images/Capric.gif' },
    { name: 'Azur', logo: '/images/Azur-.png' },
    { name: 'AlDahab', logo: '/images/AlDahab.png' },
  ];

  const repeatedBrands = [...brands, ...brands];

  // حالة للكشف عن "الـ zoom" (تقريباً عبر devicePixelRatio)
  const [isZoomed, setIsZoomed] = useState(false);
  const initialDPR = useRef(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

  useEffect(() => {
    function checkZoom() {
      const dpr = window.devicePixelRatio || 1;
      // إذا اختلف الـ DPR عن القيمة الابتدائية => اعتبرنا صار zoom
      setIsZoomed(Math.abs(dpr - initialDPR.current) > 0.01);
    }

    // نفعل الفحص عند تغيير الحجم وتكراراً (بعض المتصفحات تغير DPR بدون حدث resize)
    window.addEventListener('resize', checkZoom);
    window.addEventListener('orientationchange', checkZoom);
    const interval = setInterval(checkZoom, 400);

    return () => {
      window.removeEventListener('resize', checkZoom);
      window.removeEventListener('orientationchange', checkZoom);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Trusted by Leading Brands
        </h2>
      </div>

      {/* نبدّل بين overflow-visible و overflow-hidden بناءً على حالة isZoomed */}
      <div className={`relative w-full ${isZoomed ? 'clipper' : 'no-clip'}`}>
        <div className="flex w-[200%] animate-scroll">
          {repeatedBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-6
                         cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          /* حركة التمرير */
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            animation: scroll 20s linear infinite;
          }

          /* الwrapper لما يكون في zoom نطبق القص (قص حاد) */
          .clipper {
            overflow: hidden;
            position: relative;
          }

          /* الوضع العادي: نسمح بأن يمتد العنصر خارج الحاوية
             حتى يظهر الشعارات "من الحواف" كما طلبت */
          .no-clip {
            overflow: visible;
          }

          /* تحسينات لتجنب خروج العناصر بسبب التحويل */
          .clipper, .clipper .animate-scroll {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            will-change: transform;
          }

          /* --- اختياري: لو بدك تآثير تلاشي ناعم على الحواف بدل القص الحاد
             ازل التعليقات عن الأسطر التالية --- */
          /*
          .clipper::before, .clipper::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 6%;
            pointer-events: none;
            z-index: 10;
          }
          .clipper::before { left: 0; background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)); }
          .clipper::after  { right:0;  background: linear-gradient(to left,  rgba(255,255,255,1), rgba(255,255,255,0)); }
          */
        `}
      </style>
    </section>
  );
};

export default Brands;
