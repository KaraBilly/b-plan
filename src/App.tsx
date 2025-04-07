import React, { useState } from 'react';
import { ChefHat, ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  image: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "红烧肉",
      category: "主菜",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "清炒时蔬",
      category: "素菜",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "蒜蓉粉丝虾",
      category: "海鲜",
      image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "白米饭",
      category: "主食",
      image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const categories = ['全部', ...new Set(menuItems.map(item => item.category))];

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== itemId);
    });
  };

  const deleteFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">美味厨房</h1>
          </div>
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0">
            <h2 className="text-xl font-semibold mb-4">分类</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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

          {/* Menu Grid */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">菜单</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter(item => selectedCategory === '全部' || item.category === selectedCategory)
                .map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{item.category}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                        >
                          添加
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Details Panel */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40 transition-opacity duration-300">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transform transition-transform duration-300 ease-out z-50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">购物车</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">购物车是空的</p>
              ) : (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                        <div>
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Minus className="h-4 w-4 text-orange-500" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4 text-orange-500" />
                        </button>
                        <button
                          onClick={() => deleteFromCart(item.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto">
          <div className="mx-4 mb-4 flex items-center justify-between bg-white rounded-full shadow-lg px-4 py-3">
            <button 
              onClick={() => setIsCartOpen(true)} 
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
              onClick={() => {
                if (cart.length > 0) {
                  alert('订单已提交！');
                  setCart([]);
                  setIsCartOpen(false);
                }
              }}
              className={`px-8 py-2.5 rounded-full transition-colors shadow-sm ${
                cart.length > 0 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              请下单
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;