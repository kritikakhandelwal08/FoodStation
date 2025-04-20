import React, {useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Menu from '/src/pages/Menu/Menu';
import Partner from '/src/pages/Partner/Partner';
import KitchenItems from '/src/pages/Menu/KitchenItems';
import Cart from '/src/pages/Cart/Cart';
import LogInPopUp from '/src/pages/Login/LogInPopUp';
import Payment from './pages/Payment/Payment';
import KitchenPage from './pages/Recommend/KitchenPage';
import { CartProvider } from './pages/Cart/cartContext';
import Profile from './components/Navbar/Profile';

const App = () => {
  const [showLogin,setShowLogin]=useState(false)

  const handleLoginClick =()=> {
    setShowLogin(true)
  }
  
  return (
    <CartProvider>
      {showLogin?<LogInPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>

      <Router>
        <Navbar  onLoginClick={handleLoginClick}/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/kitchen-items/:category" element={<KitchenItems />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LogInPopUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/recommend" element={<KitchenPage/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
        <Footer />
      </Router>
        </div>
    </CartProvider>
  );
};

export default App;
