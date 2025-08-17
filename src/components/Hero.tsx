import React, { useState } from "react";
import { motion } from "framer-motion";

const TiltedSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative h-screen bg-gray-900 overflow-hidden flex items-center justify-center"
    >
      <motion.div
        className="relative w-3/4 h-3/4 bg-cover bg-center rounded-xl overflow-hidden cursor-pointer"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg")`,
          transform: "skewY(-8deg)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          scale: hovered ? 1.05 : 1,
          skewY: hovered ? 0 : -8,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* الكلمة المائلة */}
        <motion.h1
          className="absolute top-1/2 left-1/2 text-white font-bold text-6xl transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ writingMode: "vertical-rl", transform: "rotate(-20deg)" }}
        >
          داخلي
        </motion.h1>

        {/* المحتوى عند الاقتراب */}
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">تشطيبات أنيقة وعصرية</h2>
            <p className="text-lg mb-6 text-center max-w-md">
              نقدم لك حلول طلاء داخلية تجمع بين الجمال والعملية لتناسب كل المساحات.
            </p>
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all">
              اكتشف المزيد
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TiltedSection;

