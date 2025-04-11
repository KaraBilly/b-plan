import React from 'react';
import { List, PlusCircle, User } from 'lucide-react';

const TabBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-500">
            <List className="h-6 w-6" />
            <span className="text-xs mt-1">点菜</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-500">
            <PlusCircle className="h-6 w-6" />
            <span className="text-xs mt-1">新品</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-500">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">我的</span>
          </button>
        </div>
      </div>
    </div> 
  );
};

export default TabBar;