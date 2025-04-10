import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart } from '../store/cartSlice';
import { MenuItem } from '../types';

const MenuGrid: React.FC = () => {
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const itemCounts = useSelector((state: RootState) => state.cart.itemCounts);
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const filteredItems = menuItems.filter(item => 
    selectedCategory === '全部' || item.category === selectedCategory
  );

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex relative h-32">
            <img src={item.image} alt={item.name} className="w-1/4 object-cover" />
            <div className="w-3/4 p-4 flex flex-col justify-between overflow-hidden">
              <div className="overflow-hidden">
                <h3 className="text-lg font-medium mb-2 truncate">{item.name}</h3>
                <div className="flex flex-wrap gap-1 overflow-hidden max-h-6">
                  {item.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 relative">
                <span className="text-sm text-gray-500">{item.category}</span>
                <div className="relative">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    添加
                  </button>
                  {itemCounts[item.id] > 0 && (
                    <div className="absolute -top-3 -right-3 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                      {itemCounts[item.id]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;