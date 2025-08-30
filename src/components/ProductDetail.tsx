import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, CheckCircle, Package, ArrowLeft, Shield, Info, FileText, Wrench } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // بيانات المنتج من النشرة
  const product = {
    id: "omegan-sealer",
    name: "OMEGAN Sealer (2K)",
    brand: "Azmeh",
    code: "PU-2K",
    description: "Two-component polyurethane sealer designed mainly to penetrate and seal wooden substrates preserving and enhancing the natural beauty of wood.",
    technicalDescription: "Provides excellent adhesion, flexibility, penetration, sealing and high filling properties with good sandability.",
    images: [
      "https://i.postimg.cc/4dTjTgkG/omegan-sealer-1.jpg",
      "https://i.postimg.cc/NFYn7Xfr/omegan-sealer-2.jpg"
    ],
    type: "Sealer",
    material: "Polyurethane",
    usage: "Wood surfaces",
    features: [
      "Excellent adhesion",
      "Excellent flexibility",
      "Penetrates and seals wooden surfaces",
      "Provides high filling properties",
      "Good sandability"
    ],
    applications: [
      "Penetrating wooden substrates",
      "Sealing wood for finishing",
      "Enhancing natural beauty of wood"
    ],
    instructions: [
      "Method of Application: Conventional spray.",
      "Mixing Ratio (by volume): Comp. A : Comp. B : Thinner = 4:1:2",
      "Stir well before application to ensure uniform consistency.",
      "Pot life: 4 hours (higher temperatures shorten pot life).",
      "Cleaner: Clean tools with thinner S501.",
      "Curing: Maintain temperature ≥10°C for mixture and substrate. Substrate should be ≥3°C above dew point.",
      "Note: Recoating requires attention to drying times. Do not expose coated surfaces to water, chemicals, or mechanical stresses before full curing."
    ],
    technicalSpecs: [
      { property: "Component B", value: "PU(B)", standard: "-" },
      { property: "Color", value: "Hazy", standard: "-" },
      { property: "Volume Solids", value: "30%", standard: "ASTM-D2697" },
      { property: "Flexibility", value: "Excellent", standard: "-" },
      { property: "Recommended Film Thickness", value: "30-50 microns dry", standard: "-" },
      { property: "Theoretical Spreading Rate", value: "7.5 m²/L at 40 microns dry", standard: "-" },
      { property: "Water Resistance", value: "Excellent", standard: "-" },
      { property: "Number of Coats", value: "1-3", standard: "-" },
      { property: "Specific Gravity (mixed)", value: "1 kg/L", standard: "DIN 51757" },
    ],
    packaging: [
      { size: "3.6 L", type: "Comp. A Metal Can", coverage: "-" },
      { size: "0.9 L", type: "Comp. A Metal Can", coverage: "-" },
      { size: "0.9 L", type: "Comp. B Metal Can", coverage: "-" },
      { size: "0.225 L", type: "Comp. B Metal Can", coverage: "-" }
    ],
    storage: [
      "Keep in cool, well-ventilated place.",
      "Protect from heat and direct sunlight.",
      "Shelf life: 1 year from packing date in unopened containers at 10-40°C.",
      "Containers must be tightly closed."
    ],
    safety: {
      precautions: [
        "Provide well-ventilated conditions during application.",
        "Do not breathe or inhale mist.",
        "Wear air mask and avoid skin or eye contact."
      ],
      firstAid: [
        "In case of skin contact: wash immediately with plenty of soap and water.",
        "In case of eye contact: rinse cautiously with water for several minutes and seek medical advice if necessary.",
        "If inhaled: move to fresh air and keep comfortable for breathing."
      ]
    }
  };

  useEffect(() => {
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product.images]);

  const handleDownloadDatasheet = () => {
    alert(`Downloading datasheet for ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-[#2C5DB6]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#2C5DB6]">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#2C5DB6] to-[#1e4080] text-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{product.brand}</span>
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">{product.code}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">{product.name}</h1>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">{product.description}</p>
            <p className="text-blue-100/90 mb-8 leading-relaxed">{product.technicalDescription}</p>
            <button
              onClick={handleDownloadDatasheet}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
            >
              <Download className="w-6 h-6 mr-3" /> Download Datasheet
            </button>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm">
            <motion.img
              key={currentImageIndex}
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-80 lg:h-96 object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-3 h-3 rounded-full ${idx === currentImageIndex ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center"><CheckCircle className="w-8 h-8 text-green-500 mr-3"/>Key Features</h2>
            <div className="space-y-4">
              {product.features.map((f, idx) => (
                <motion.div key={idx} initial={{ opacity:0,x:-20 }} whileInView={{opacity:1,x:0}} transition={{duration:0.4,delay:idx*0.1}} className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center"><Wrench className="w-8 h-8 text-[#2C5DB6] mr-3"/>Applications</h2>
            <div className="space-y-4">
              {product.applications.map((app, idx) => (
                <motion.div key={idx} initial={{ opacity:0,x:20 }} whileInView={{opacity:1,x:0}} transition={{duration:0.4,delay:idx*0.1}} className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-3 h-3 bg-[#2C5DB6] rounded-full mr-4 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{app}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Instructions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Application Instructions</h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2C5DB6] to-blue-300" />
            {product.instructions.map((ins, idx) => (
              <motion.div key={idx} className="relative flex items-start mb-12 last:mb-0" initial={{ opacity:0, y:20 }} whileInView={{opacity:1, y:0}} transition={{duration:0.5,delay:idx*0.2}}>
                <div className="absolute left-4 w-8 h-8 bg-[#2C5DB6] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">{idx+1}</div>
                <div className="ml-20 bg-gray-50 rounded-xl p-6 flex-1">
                  <p className="text-gray-700 leading-relaxed">{ins}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
            <div className="bg-[#2C5DB6] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center"><FileText className="w-6 h-6 mr-3"/>Technical Specifications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-left font-semibold text-gray-800">Property</th>
                    <th className="px-8 py-4 text-left font-semibold text-gray-800">Value</th>
                    <th className="px-8 py-4 text-left font-semibold text-gray-800">Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {product.technicalSpecs.map((spec, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-4 font-medium text-gray-800">{spec.property}</td>
                      <td className="px-8 py-4 text-[#2C5DB6] font-semibold">{spec.value}</td>
                      <td className="px-8 py-4 text-gray-600">{spec.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center"><Package className="w-8 h-8 text-[#2C5DB6] mr-3"/>Packaging & Sizes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {product.packaging.map((pack, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
                <Package className="w-12 h-12 text-[#2C5DB6] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pack.size}</h3>
                <p className="text-gray-600 mb-2">{pack.type}</p>
                <p className="text-[#2C5DB6] font-semibold">{pack.coverage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center"><Shield className="w-8 h-8 text-green-600 mr-3"/>Storage Requirements</h2>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {product.storage.map((req, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                  <p className="text-gray-700">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center"><Shield className="w-8 h-8 text-red-500 mr-3"/>Safety Information</h2>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-red-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Safety Precautions</h3>
              </div>
              <div className="p-6 space-y-3">
                {product.safety.precautions.map((p, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-700">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-orange-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white">First Aid</h3>
              </div>
              <div className="p-6 space-y-3">
                {product.safety.firstAid.map((f, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-700">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
