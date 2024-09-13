import React from "react";
import "./AddProduct.css";

const AddProduct = () => {
  return (
    <div className="addproduct-container">
      <h2>Add New Product</h2>
      <div className="addproduct-format-main">
        <div className="addproduct-format">
          <div className="product-title">
            <label className="label" htmlFor="product_title">Product Title</label><br />
            <input type="text" name="product_title" placeholder="Type here" required />
          </div>
          
        </div>

        <div className="addproduct-format">
          <div className="product-price">
            <div className="product-old_price">
              <label className="label" htmlFor="old_price">Old Price</label>
              <input type="text" name="old_price"placeholder="Type here" required/>
            </div>
            <div className="product-new_price">
              <label className="label" htmlFor="new_price">New Price</label>
              <input type="text" name="new_price"placeholder="Type here" required />
            </div>
          </div>
        </div>

        <div className="addproduct-format">
          <div className="category">
            <label className="label" htmlFor="category">Select Category</label>
            <select name="category">
              <option value="electronics">Electronics</option>
              <option value="groceries">Groceries</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>

          <div className="sub_category">
            <label className="label" htmlFor="sub_category">Select Sub Category</label>
            <select name="sub_category">
              <option value="electronics">Electronics</option>
              <option value="groceries">Groceries</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
        </div>

        <div className="addproduct-format">
          <div className="discount_offer">
            <label className="label" htmlFor="discount_offer">Discount</label>
            <input type="text" name="discount_offer" placeholder="Type here" required/>
          </div>
          <div className="product-main_img">
            <label className="label" htmlFor="main_img">Product Main Image</label>
            <input type="file" name="main_img" />
          </div>
        </div>

        <div className="addproduct-format">
          <div className="other_img12">
            <div className="other_img1">
              <label className="label" htmlFor="other_img1">Other Image 1</label>
              <input type="file" name="other_img1" id="" />
            </div>
            <div className="other_img2">
            <label className="label" htmlFor="other_img2">Other Image 2</label>
              <input type="file" name="other_img2" id="" />
            </div>
          </div>
          <div className="other_img34">
            <div className="other_img3">
            <label className="label" htmlFor="other_img3">Other Image 3</label>
              <input type="file" name="other_img3" id="" />
            </div>
            <div className="other_img4">
            <label className="label" htmlFor="other_img4">Other Image 4</label>
              <input type="file" name="other_img4" id="" />
            </div>
          </div>
        </div>

          <div className="add">
              <button>ADD PRODUCT</button>
          </div>
          

      </div>
    </div>
  );
};

export default AddProduct;
