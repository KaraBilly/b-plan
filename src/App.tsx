import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MenuGrid from './components/MenuGrid';
import CartPanel from './components/CartPanel';
import BottomNavigation from './components/BottomNavigation';
import TabBar from './components/TabBar';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 pb-32 text-sm relative">
        <Header totalQuantity={0} onCartToggle={() => setIsCartOpen(!isCartOpen)} />
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
          <Sidebar className="w-1/6" />
          <MenuGrid />
        </div>
        {isCartOpen && (
          <CartPanel onClose={() => setIsCartOpen(false)} />
        )}
        <BottomNavigation 
          onCartToggle={() => setIsCartOpen(true)}
          onOrderSubmit={() => alert('订单已提交！')}
          isOrderDisabled={false}
        />
        <TabBar />
      </div>
    </Provider>
  );
}

export default App;