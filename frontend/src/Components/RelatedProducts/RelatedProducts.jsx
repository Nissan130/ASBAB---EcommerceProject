import React, { useContext } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { GlobalContext } from '../../Context/GlobalContext'

const RelatedProducts = () => {
  const {products} = useContext(GlobalContext);
  return (
    <div className='related-products'>
        <div className="related-products-title">
            <h2>RELATED PRODUCTS</h2>
            <hr />
        </div>
        <div className="related-product-items">
               { products.map((item) => {
                    return (
                      <Item 
                      key={item.product_id} // Ensure you have a unique identifier in your product data
                      product_id={item.product_id}
                      title={item.title} // Adjust property names based on your API response
                      main_image={item.main_image} // Adjust to match your API response
                      new_price={item.new_price}
                      old_price={item.old_price}
                      discount={item.discount}
                    />
                    )
                })}
        </div>
      
    </div>
  )
}

export default RelatedProducts
