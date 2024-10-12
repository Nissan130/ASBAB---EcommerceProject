import React from 'react'
import { MdChevronRight } from "react-icons/md";
import './Breadcrums.css'

const Breadcrums = (props) => {
  const {product} = props;
  return (
    <div className='breadcrums'>
      <span>HOME</span> <MdChevronRight /><span>{product.category}</span> <MdChevronRight /> <span>{product.title}</span> 
    </div>
  )
}

export default Breadcrums
