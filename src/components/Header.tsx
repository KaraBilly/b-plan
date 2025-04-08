import React from 'react';
import { ChefHat, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  totalQuantity: number;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalQuantity, onCartToggle }) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <ChefHat className="h-6 w-6 text-orange-500" />
        <h1 className="text-xl font-bold text-gray-800">美味厨房</h1>
      </div>
      <button 
        onClick={onCartToggle}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ShoppingCart className="h-6 w-6 text-gray-600" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
            {totalQuantity}
          </span>
        )}
      </button>
    </div>
  </header>
);

export default Header;