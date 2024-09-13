import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ProductList from '../../Components/ProductList/ProductList'
import AddCategory from '../../Components/AddCategory/AddCategory'
import CategoryList from '../../Components/CategoryList/CategoryList'
import AddSubCategory from '../../Components/AddSubCategory/AddSubCategory'
import SubCategoryList from '../../Components/SubCategoryList/SubCategoryList'
import UsersList from '../../Components/UsersList/UsersList'

const Admin = () => {
  return (
    <div className='admin-container'>
      <Sidebar />
      <Routes>
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/product-list' element={<ProductList />} />
        <Route path='/add-category' element={<AddCategory />} />
        <Route path='/category-list' element={<CategoryList />} />
        <Route path='/add-sub-category' element={<AddSubCategory />} />
        <Route path='/sub-category-list' element={<SubCategoryList />} />
        <Route path='/users-list' element={<UsersList />} />
      </Routes>
    </div>
  )
}

export default Admin
