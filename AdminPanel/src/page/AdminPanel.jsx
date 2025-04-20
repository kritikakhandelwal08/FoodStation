// import React, { useState } from 'react'
// import './AdminPanel.css'
// import add from '../assets/Add.png'
// import list from '../assets/Bullet List.png'
// import order from '../assets/Order Completed.png'
// import { Link, Outlet } from 'react-router-dom'

// const AdminPanel = () => {

//     const [color,SetColor] = useState("menu");

//     return (
//         <>
//             <div className='container'>
//                 <header>
//                     <h1>The Mom’s Kitchen <span>Admin Panel</span></h1>
//                 </header>
//                 <hr />
//                 <div className='panel'>
//                     <div className='choice'>
//                         <div className='choices'>
//                             <Link to="/add-items">
//                             <div  onClick={()=>SetColor('/add-items')} className={color=="/add-items"?"active":"add-item"}>
//                                 <img src={add} alt="" />
//                                 <h3>Add Items</h3>
//                             </div>
//                             </Link>
//                             <Link to="/list-items">
//                             <div onClick={()=>SetColor('/list-items')} className={color=="/list-items"?"active":"list-item"}>
//                                 <img src={list} alt="" />
//                                 <h3>List Items</h3>
//                             </div>
//                             </Link>
//                             <Link to="/orders">
//                             <div onClick={()=>SetColor('/orders')} className={color=="/orders"?"active":"order"}>
//                                 <img src={order} alt="" />
//                                 <h3>Orders</h3>
//                             </div>
//                             </Link>
//                         </div>
//                     </div>
//                     <div className='choice-detail'>
//                         <Outlet/>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AdminPanel   


import React, { useState } from 'react';
import './AdminPanel.css';
import add from '../assets/Add.png';
import list from '../assets/Bullet List.png';
import order from '../assets/Order Completed.png';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
    // State to keep track of the active menu item
    const [activeMenu, setActiveMenu] = useState(''); // Default active is 'add-items'

    return (
        <div className="container">
            <header>
                <h1>The Mom’s Kitchen <span>Admin Panel</span></h1>
            </header>
            <hr />
            <div className="panel">
                <div className="choice">
                    <div className="choices">
                        <Link to="/add-items">
                            <div
                                onClick={() => setActiveMenu('/add-items')}
                                className={`menu-item ${activeMenu === '/add-items' ? 'active' : ''}`} // Apply 'active' class if this is the active menu item
                            >
                                <img src={add} alt="Add" />
                                <h3>Add Items</h3>
                            </div>
                        </Link>
                        <Link to="/list-items">
                            <div
                                onClick={() => setActiveMenu('/list-items')}
                                className={`menu-item ${activeMenu === '/list-items' ? 'active' : ''}`}
                            >
                                <img src={list} alt="List" />
                                <h3>List Items</h3>
                            </div>
                        </Link>
                        <Link to="/orders">
                            <div
                                onClick={() => setActiveMenu('/orders')}
                                className={`menu-item ${activeMenu === '/orders' ? 'active' : ''}`}
                            >
                                <img src={order} alt="Orders" />
                                <h3>Orders</h3>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="choice-detail">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
