import React from 'react'
import './RelatedProducts.css'
import related_product from '../Assets/related_products'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='related-products'>
        <div className="related-products-title">
            <h2>RELATED PRODUCTS</h2>
            <hr />
        </div>
        <div className="related-product-items">
               { related_product.map((item,i) => {
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

export default RelatedProducts
