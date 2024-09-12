import React from 'react'
import './NewCollections.css'
import new_collections_product from '../Assets/new_collections_product'
import Item from '../Item/Item'

const NewCollections = () => {
  return (
    <div className='newCollections-product'>
      <div className="newCollections-product-title">
        <h2>NEW COLLECTIONS</h2>
        <hr />
      </div>
     <div className="newCollections-product-item">
      {new_collections_product.map((item,i) =>{
        return (
          <Item 
          key={i}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}
          />
        )
      })}
     </div>
    </div>
  )
}

export default NewCollections
