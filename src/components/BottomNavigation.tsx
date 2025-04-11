import React from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { RootState } from '../store/store';

interface BottomNavigationProps {
  onCartToggle: () => void;
  onOrderSubmit: () => void;
  isOrderDisabled: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  onCartToggle, 
  onOrderSubmit, 
  isOrderDisabled 
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 bg-transparent pb-4">
      <div className="max-w-7xl mx-auto">
        <div className="mx-4 flex items-center justify-between bg-white rounded-full shadow-lg px-4 py-3">
          <button 
            onClick={onCartToggle} 
            className="relative flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {totalQuantity > 0 && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                {totalQuantity}
              </div>
            )}
          </button>
          <button
            onClick={onOrderSubmit}
            className={`px-8 py-2.5 rounded-full transition-colors shadow-sm ${
              isOrderDisabled 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
            disabled={isOrderDisabled}
          >
            老板 请下单
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;