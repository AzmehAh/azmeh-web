import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Trash2, Plus, Save, X } from "lucide-react";

const AdminPaintCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    image_url: "",
    order: 0,
    is_active: true,
  });
  const [message, setMessage] = useState({ text: "", type: "" }); // success/error

  // جلب الفئات عند التحميل
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("paint_categories")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;
      setCategories(data);
    } catch (error) {
      setMessage({ text: "فشل جلب الفئات: " + error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // بدء التعديل
  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ ...category });
  };

  // إلغاء التعديل
  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      id: "",
      title: "",
      description: "",
      image_url: "",
      order: 0,
      is_active: true,
    });
  };

  // تحديث الحقول أثناء الكتابة
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // حفظ التعديل أو الإضافة
  const handleSave = async () => {
    try {
      let result;
      if (editingId) {
        // تعديل
        result = await supabase
          .from("paint_categories")
          .update(formData)
          .eq("id", editingId);
      } else {
        // إضافة جديدة
        result = await supabase.from("paint_categories").insert([formData]);
      }

      if (result.error) throw result.error;

      setMessage({
        text: editingId ? "تم تعديل الفئة بنجاح!" : "تم إضافة الفئة بنجاح!",
        type: "success",
      });

      // إعادة تعيين النموذج وتحديث القائمة
      handleCancel();
      fetchCategories();

      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      setMessage({ text: "خطأ: " + error.message, type: "error" });
    }
  };

  // حذف فئة
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;

    try {
      const { error } = await supabase
        .from("paint_categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMessage({ text: "تم حذف الفئة بنجاح!", type: "success" });
      fetchCategories();

      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      setMessage({ text: "فشل الحذف: " + error.message, type: "error" });
    }
  };

  // بدء إضافة جديدة
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      id: "",
      title: "",
      description: "",
      image_url: "",
      order: categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1,
      is_active: true,
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          جاري التحميل...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          إدارة فئات الطلاء
        </h1>
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة فئة جديدة</span>
        </button>
      </div>

      {/* رسالة النجاح/الخطأ */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* نموذج الإضافة/التعديل */}
      {(editingId || editingId === null) && (
        <div className="bg-white shadow rounded-lg p-6 mb-8 border-2 border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editingId ? "تعديل فئة" : "إضافة فئة جديدة"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المعرف (ID)*
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="مثال: flooring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الترتيب
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              العنوان*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="مثال: Flooring"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الوصف*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="وصف الفئة..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رابط الصورة*
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              id="is_active"
              className="ml-2 h-5 w-5 text-blue-600"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              مفعلة (تظهر في الموقع)
            </label>
          </div>

          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
            >
              <Save className="w-5 h-5" />
              <span>حفظ</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
              <span>إلغاء</span>
            </button>
          </div>
        </div>
      )}

      {/* جدول الفئات */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المعرف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                العنوان
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الترتيب
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                مفعلة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                إجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cat.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {cat.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {cat.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {cat.is_active ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      نعم
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      لا
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-blue-600 hover:text-blue-900 mx-1"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:text-red-900 mx-1"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPaintCategories;