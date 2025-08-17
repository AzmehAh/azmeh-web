import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    id: "interior",
    title: "داخلي",
    description: "دهانات عصرية للمساحات الداخلية تعكس الأناقة والراحة.",
  },
  {
    id: "exterior",
    title: "خارجي",
    description: "طلاءات متينة مقاومة للعوامل الجوية لحماية واجهات المباني.",
  },
  {
    id: "industrial",
    title: "صناعي",
    description: "حلول قوية تناسب البيئات الصناعية القاسية.",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">
      {sections.map((sec, i) => {
        const isActive = active === sec.id;

        return (
          <motion.div
            key={sec.id}
            onMouseEnter={() => setActive(sec.id)}
            onMouseLeave={() => setActive(null)}
            className="relative flex-1 flex items-center justify-center cursor-pointer bg-gray-800 text-white"
            style={{
              clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)", // قص مائل لليسار
            }}
            animate={{
              flex: isActive ? 3 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* الكلمة الكبيرة */}
            <motion.h1
              className="font-bold text-6xl absolute"
              initial={false}
              animate={{
                rotate: isActive ? 0 : -90,
                scale: isActive ? 1.2 : 1,
                y: isActive ? -100 : 0,
              }}
              transition={{ duration: 0.6 }}
              style={{ whiteSpace: "nowrap" }}
            >
              {sec.title}
            </motion.h1>

            {/* الوصف + الزر */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-20 text-center px-4"
                >
                  <p className="text-lg mb-4">{sec.description}</p>
                  <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-200">
                    اكتشف أكثر
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

