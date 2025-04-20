import React, { useEffect, useState } from "react";
import './Menu.css'
import menuData from "../../api/menuData.json";
import { useNavigate } from 'react-router-dom';

const Menu = () => {

    const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    setMenuItems(menuData.menuItems);
  }, []);

  const navigate = useNavigate();
  const handleMenuItemClick = (id) => {
    // Navigate to kitchen items page, passing the menuItemId in the URL
    navigate(`/kitchen-items/${id}`);
  };

  return (
    <div className="menu">
        <h1>
          Explore Our <span>Delicious Menu</span>
        </h1>
        <p>Explore our delicious menu and find your next favorite meal !</p>
        <div className="menu-item">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-card" onClick={() => handleMenuItemClick(item.id)}>
              <img src={item.image} alt={item.name} className="menu-image" />
              <p className="menu-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Menu