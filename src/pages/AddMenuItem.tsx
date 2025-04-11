import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMenuItem } from '../store/menuSlice';
import { MenuItem } from '../types';
import { uploadImage } from '../utils/imageUpload';

const AddMenuItem: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    tags: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) return;

    try {
      // Here you would typically upload the image to your server/storage
      // and get back the URL
      const imageUrl = await uploadImage(imageFile);
      
      const newItem: MenuItem = {
        id: Date.now(), // This should be handled by the backend
        name: formData.name,
        category: formData.category,
        image: imageUrl,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };

      dispatch(addMenuItem(newItem));
      // Reset form
      setFormData({ name: '', category: '', tags: '' });
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Failed to add menu item:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">添加新菜品</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            菜品图片
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  点击上传图片
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              选择图片
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            菜品名称
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            分类
          </label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">选择分类</option>
            <option value="主菜">主菜</option>
            <option value="素菜">素菜</option>
            <option value="海鲜">海鲜</option>
            <option value="主食">主食</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            标签 (用逗号分隔)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="例如: 招牌,辣,健康"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          disabled={!imageFile || !formData.name || !formData.category}
        >
          添加菜品
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;