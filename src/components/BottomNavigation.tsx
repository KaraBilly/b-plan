import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface BottomNavigationProps {
  totalQuantity: number;
  onCartToggle: () => void;
  onOrderSubmit: () => void;
  isOrderDisabled: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ totalQuantity, onCartToggle, onOrderSubmit, isOrderDisabled }) => (
  <div className="fixed bottom-0 left-0 right-0">
    <div className="max-w-7xl mx-auto">
      <div className="mx-4 mb-4 flex items-center justify-between bg-white rounded-full shadow-lg px-4 py-3">
        <button 
          onClick={onCartToggle} 
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart className="h-6 w-6 text-gray-600" />
          {totalQuantity > 0 && (
            <span className="bg-orange-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center shadow-sm">
              {totalQuantity}
            </span>
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
          请下单
        </button>
      </div>
    </div>
  </div>
);

export default BottomNavigation;