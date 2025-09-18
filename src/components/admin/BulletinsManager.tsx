import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Edit, Trash2, Save, X, FileText, Eye, Star 
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';

// --- Register BetterTable dynamically ---
let BetterTable = null;
let Quill = null;

if (typeof window !== 'undefined') {
  import('quill-better-table').then(module => {
    BetterTable = module.default;
    Quill = ReactQuill.Quill || window.Quill;
    if (Quill && BetterTable) {
      Quill.register({
        'modules/better-table': BetterTable
      }, true);
    }
  });
}

const BulletinsManager = () => {
  const [bulletins, setBulletins] = useState([]);
  const [filteredBulletins, setFilteredBulletins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBulletin, setSelectedBulletin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBulletins();
  }, []);

  useEffect(() => {
    let filtered = bulletins;
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(b => b.category === categoryFilter);
    }
    setFilteredBulletins(filtered);
  }, [searchTerm, categoryFilter, bulletins]);

  const fetchBulletins = async () => {
    try {
      const { data, error } = await supabase
        .from('bulletins')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setBulletins(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBulletin = async (id) => {
    if (!confirm('Are you sure you want to delete this bulletin?')) return;
    try {
      const { error } = await supabase.from('bulletins').delete().eq('id', id);
      if (error) throw error;
      setBulletins(bulletins.filter(b => b.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting bulletin');
    }
  };

  const toggleFeatured = async (id, featured) => {
    try {
      const { error } = await supabase
        .from('bulletins')
        .update({ featured: !featured, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      setBulletins(bulletins.map(b => b.id === id ? { ...b, featured: !featured } : b));
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (bulletin = null, editing = false) => {
    setSelectedBulletin(bulletin);
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBulletin(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const categories = [...new Set(bulletins.map(b => b.category))];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0055A3]"></div></div>;

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technical Bulletins</h1>
          <p className="text-gray-600">Manage technical bulletins and system documentation</p>
        </div>
        <button onClick={() => openModal(null, true)} className="flex items-center px-4 py-2 bg-[#0055A3] text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Add Bulletin
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search bulletins..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0055A3]">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Bulletins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBulletins.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05 }} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-gray-100 relative">
              {b.cover_image ? <img src={b.cover_image} alt={b.title} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full"><FileText className="w-12 h-12 text-gray-400" /></div>}
              <div className="absolute top-2 left-2 flex space-x-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${b.status==='published'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'}`}>{b.status}</span>
                {b.featured && <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"><Star className="w-3 h-3 inline" /></span>}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">{b.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{b.subcategory}</p>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{b.short_description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{new Date(b.created_at).toLocaleDateString()}</span>
                <span className="px-2 py-1 bg-gray-100 rounded">{b.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={()=>openModal(b,false)} className="flex-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View"><Eye className="w-4 h-4 mx-auto"/></button>
                <button onClick={()=>toggleFeatured(b.id,b.featured)} className={`p-2 rounded transition-colors ${b.featured?'text-yellow-600 hover:bg-yellow-50':'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'}`} title="Toggle Featured"><Star className={`w-4 h-4 ${b.featured?'fill-current':''}`} /></button>
                <button onClick={()=>openModal(b,true)} className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Edit"><Edit className="w-4 h-4"/></button>
                <button onClick={()=>deleteBulletin(b.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && <BulletinModal bulletin={selectedBulletin} isEditing={isEditing} closeModal={closeModal} refresh={fetchBulletins} />}
    </div>
  );
};

export default BulletinsManager;

// ------------------- BulletinModal -------------------
const BulletinModal = ({ bulletin, isEditing, closeModal, refresh }) => {
  const [title, setTitle] = useState(bulletin?.title || '');
  const [content, setContent] = useState(bulletin?.content || '');
  const [coverImage, setCoverImage] = useState(bulletin?.cover_image || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (bulletin) {
        await supabase.from('bulletins').update({ title, content, cover_image: coverImage }).eq('id', bulletin.id);
      } else {
        await supabase.from('bulletins').insert([{ title, content, cover_image: coverImage }]);
      }
      refresh();
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Error saving bulletin');
    } finally {
      setSaving(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean'],
      ['table'] // quill-better-table button
    ],
    table: BetterTable ? {
      operationMenu: {
        items: {
          insertRowAbove: { text: "Insert row above" },
          insertRowBelow: { text: "Insert row below" },
          insertColumnLeft: { text: "Insert column left" },
          insertColumnRight: { text: "Insert column right" },
          deleteRow: { text: "Delete row" },
          deleteColumn: { text: "Delete column" },
          deleteTable: { text: "Delete table" }
        }
      }
    } : undefined
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl rounded-lg p-6 relative">
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X className="w-5 h-5"/></button>
        <h2 className="text-2xl font-semibold mb-4">{bulletin ? (isEditing ? 'Edit Bulletin' : 'View Bulletin') : 'Add Bulletin'}</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#0055A3]" disabled={!isEditing}/>
          <ReactQuill value={content} onChange={setContent} readOnly={!isEditing} modules={modules} theme="snow" />
          <input type="text" placeholder="Cover image URL" value={coverImage} onChange={e=>setCoverImage(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#0055A3]" disabled={!isEditing}/>
        </div>
        {isEditing && <button onClick={handleSave} disabled={saving} className="mt-4 px-4 py-2 bg-[#0055A3] text-white rounded hover:bg-blue-700">{saving ? 'Saving...' : 'Save'}</button>}
      </div>
    </div>
  );
};
