import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, removeFromCart, deleteFromCart } from '../store/cartSlice';
import { Trash2 } from 'lucide-react';

interface CartPanelProps {
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ onClose }) => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40 transition-opacity duration-300">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transform transition-transform duration-300 ease-out z-50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">购物车</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              关闭
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
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(deleteFromCart(item.id))}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPanel;