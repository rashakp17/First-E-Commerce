import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {
  // const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',          // final image URL
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImageFile(file || null);
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;
    try {
      setUploading(true);
      setError('');
      setSuccess('');

      const data = new FormData();
      data.append('image', imageFile);

      const res = await axios.post(
        'http://localhost:5000/api/products/uploadimage',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setForm((prev) => ({ ...prev, image: res.data.imageUrl }));
      setSuccess('Image uploaded successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      setError('Please upload an image first');
      return;
    }
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const body = {
        title: form.title,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        image: form.image,
      };

      await axios.post('http://localhost:5000/api/products', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Product created successfully');
      setForm({
        title: '',
        price: '',
        category: '',
        description: '',
        image: '',
      });
      setImageFile(null);

      // optional redirect
      // navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Product create failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

        {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}
        {success && <p className="mb-3 text-green-400 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-700 text-sm"
              placeholder="Product title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-700 text-sm"
                placeholder="Price"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-700 text-sm"
                placeholder="Category (e.g. shoes, hoodie)"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-700 text-sm h-24"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Product Image</label>
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="text-sm"
              />
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={!imageFile || uploading}
                className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-3 h-32 object-contain rounded-lg border border-zinc-700 bg-black"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full mt-4 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
