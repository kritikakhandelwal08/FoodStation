import React, { useState } from 'react';
import AddItem from "./components/AddItem";
import ListItems from "./components/ListItems";
import AdminPanel from "./page/AdminPanel";
import Order from "./components/Order";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPanel />}>
          <Route path="/add-items" element={<AddItem addItem={addItem} />} />
          <Route path="/list-items" element={<ListItems items={items} removeItem={removeItem} />} />
          <Route path="/orders" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
