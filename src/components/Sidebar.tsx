import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedCategory } from '../store/categorySlice';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const categories = ['全部', '主菜', '素菜', '海鲜', '主食'];

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => dispatch(setSelectedCategory(category))}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;