import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const SocialMedia = () => {
  // روابط البوستات من صفحة فيسبوك (Embed URL)
  const facebookPosts = [
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid02JwdafQwMtxfNuq767fjKzWeWRf12YYs6giSBtNGDQCHqiDjduh9f7gThS8dhmMtil&show_text=true&width=500",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid0ATvfxNxxxxxxxxxxxxxxxxxxxxxx&show_text=true&width=500",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fazmehpaints%2Fposts%2Fpfbid04xxxxxxx&show_text=true&width=500"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان السكشن */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          آخر بوستاتنا على فيسبوك
        </h2>

        {/* شبكة البوستات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mb-16">
          {facebookPosts.map((link, index) => (
            <iframe
              key={index}
              src={link}
              width="500"
              height="694"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={`Facebook Post ${index + 1}`}
            ></iframe>
          ))}
        </div>

        {/* قسم متابعة الصفحات */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            تابعنا لمزيد من الإلهام
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            ابقَ على اطلاع على أحدث مشاريعنا، اتجاهات الألوان، وأفكار التصميم. انضم لمجتمع العظمة لعشاق الدهانات والمصممين.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/azmehpaints/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">تابعنا على Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/azmehpaints"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-[#1877F2] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">أعجبني على Facebook</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/xxxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-[#25D366] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">دعم WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
