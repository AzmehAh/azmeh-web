import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Package, Info, FileText, CheckCircle, Wrench, Shield } from "lucide-react";
import { supabase } from "../lib/supabase";

const brands = [
  { name: "Azmeh Paints", logo: "/images/Azmeh-Paints-Logo.png" },
  { name: "SRT", logo: "/images/SRT-.gif" },
  { name: "Original", logo: "/images/Original.gif" },
  { name: "Omegan", logo: "/images/Omegan.gif" },
  { name: "Mlonati", logo: "/images/Mlonati.gif" },
  { name: "Jupiter", logo: "/images/Jupiter.gif" },
  { name: "COPRAbEL", logo: "/images/COPRAbEL.jpg" },
  { name: "Capric", logo: "/images/Capric.gif" },
  { name: "Azur", logo: "/images/Azur-.png" },
  { name: "AlDahab", logo: "/images/AlDahab.png" },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // جلب البيانات من Supabase
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setProduct(null);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  // تغيير الصور تلقائياً
  useEffect(() => {
    if (product && product.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product]);

  const handleDownloadDatasheet = () => {
    alert(`Downloading datasheet for ${product?.name}`);
  };

  // شعار البراند
  const brandLogo =
    product &&
    brands.find((b) =>
      product.brand ? product.brand.toLowerCase().includes(b.name.toLowerCase()) : false
    )?.logo;

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="bg-[#2C5DB6] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#2C5DB6] to-[#1e4080] text-white">
        <div className="container mx-auto px-20">
          {/* Breadcrumb Navigation */}
          <div className="relative z-50 mb-8">
            <div className="flex items-center text-sm text-white">
              <Link to="/" className="nav-link">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="nav-link">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
              <p className="text-xl text-blue-100 mb-4 leading-relaxed">{product.description}</p>

              {/* Properties under title */}
              <div className="flex flex-wrap gap-4 mb-8">
                {["type", "material", "usage"].map((key) =>
                  product[key] ? (
                    <span key={key} className="px-4 py-2 bg-white/20 rounded-full text-white font-medium">
                      {product[key]}
                    </span>
                  ) : null
                )}
              </div>

              <p className="text-blue-100/90 mb-6 leading-relaxed">{product.technicalDescription}</p>

              {/* Packaging */}
              {product.packaging?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Package className="w-5 h-5 text-white mr-2" />
                    Packaging & Sizes
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {product.packaging.map((pack: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center w-28"
                      >
                        <h4 className="text-sm font-bold text-white">{pack.size}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleDownloadDatasheet}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
              >
                <Download className="w-6 h-6 mr-3" />
                Download Technical Datasheet
              </button>
            </div>

            {/* Right Column */}
            <div className="relative">
              {brandLogo && (
                <div className="mb-4 text-right">
                  <img src={brandLogo} alt={product.brand || "Brand"} className="w-24 h-auto object-contain inline-block" />
                </div>
              )}
              {product.images?.length > 0 && (
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-80 lg:h-96 object-cover rounded-2xl"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                />
              )}
              {/* Image Indicators */}
              {product.images?.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Table */}
      {product.technicalSpecs?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-20">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
              <div className="bg-[#2C5DB6] px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FileText className="w-6 h-6 mr-3" />
                  Technical Specifications
                </h2>
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
                    {product.technicalSpecs.map((spec: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
      )}

      {/* Features */}
      {product.features?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-20">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  Key Features
                </h2>
                <div className="space-y-4">
                  {product.features.map((feature: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <Wrench className="w-8 h-8 text-[#2C5DB6] mr-3" />
                  Applications
                </h2>
                <div className="space-y-4">
                  {product.applications.map((application: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-3 h-3 bg-[#2C5DB6] rounded-full mr-4 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{application}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Instructions */}
      {product.instructions?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Application Instructions
            </h2>
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2C5DB6] to-blue-300" />
              {product.instructions.map((instruction: string, index: number) => (
                <motion.div
                  key={index}
                  className="relative flex items-start mb-12 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute left-4 w-8 h-8 bg-[#2C5DB6] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {index + 1}
                  </div>
                  <div className="ml-20 bg-gray-50 rounded-xl p-6 flex-1">
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Storage */}
      {product.storage?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              Storage Requirements
            </h2>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {product.storage.map((requirement: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Safety */}
      {product.safety && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-500 mr-3" />
              Safety Information
            </h2>
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
              {/* Precautions */}
              {product.safety.precautions?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-red-500 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Safety Precautions</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {product.safety.precautions.map((precaution: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                        <p className="text-gray-700">{precaution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* First Aid */}
              {product.safety.firstAid?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-orange-500 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">First Aid</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {product.safety.firstAid.map((aid: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                        <p className="text-gray-700">{aid}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-[#2C5DB6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need Technical Support?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our technical experts are ready to help you with product selection, application guidance, and troubleshooting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadDatasheet}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Datasheet
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition-colors backdrop-blur-sm">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
