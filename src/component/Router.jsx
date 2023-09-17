import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import AdminForm from './AdminForm'
import OrderMenu from './OrderMenu'
import { useState } from 'react'
import Table from './Table'
import EditForm from './EditForm'
import WaiterMenu from './WaiterMenu'
import Chefs from './Chefs'
import ItemPrepared from './ItemPrepared'



export default function Router() {
  const [menuItems, setMenuItems] = useState([  ]);

  const handleAddItem = (newItem) => {
    setMenuItems([...menuItems, newItem]);
  };


  return (
    <div>
        {/* <h1>This is a Router Component</h1> */}
        <BrowserRouter>
            <Routes>
            <Route exact path="/" element={<Home/>} />

            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/menu' element={<Menu/>}/>
            <Route exact path='/admin' element={      <AdminForm onAddItem={handleAddItem} />
}/>
            <Route exact path='/order' element={<OrderMenu/>}/>
            <Route exact path='/table' element={<Table/>}/>
            <Route exact path='/edit/:id' element={<EditForm/>}/>
            <Route exact path='/edit/:id' element={<EditForm/>}/>
            <Route exact path='/waiter' element={<WaiterMenu/>}/>
            <Route exact path='/chefs' element={<Chefs/>}/>
            <Route exact path='/item' element={<ItemPrepared/>}/>





            
            

            </Routes>

        </BrowserRouter>

    </div>
  )
}
