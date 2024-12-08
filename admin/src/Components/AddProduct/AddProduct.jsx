import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill's CSS
import {useNavigate} from 'react-router-dom'
import "./AddProduct.css";

const AddProduct = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_title: "",
    product_keyword: "",
    product_short_description: "",
    product_full_description: "",
    old_price: "",
    new_price: "",
    category: "electronics",
    sub_category: "electronics",
    product_brand: "",
    discount_offer: "",
    main_img: null,
    other_images: [null, null, null, null],
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [otherImagesPreview, setOtherImagesPreview] = useState([null, null, null, null]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Quill editor changes
  const handleShortDescriptionChange = (value) => {
    setFormData({ ...formData, product_short_description: value });
  };

  const handleFullDescriptionChange = (value) => {
    setFormData({ ...formData, product_full_description: value });
  };

  // Handle main image change
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, main_img: file });
    }
  };

  // Handle other images change
  const handleOtherImagesChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newPreviews = [...otherImagesPreview];
      const newImages = [...formData.other_images];
      newPreviews[index] = URL.createObjectURL(file);
      newImages[index] = file;
      setOtherImagesPreview(newPreviews);
      setFormData({ ...formData, other_images: newImages });
    }
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to backend
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "other_images") {
        formData[key].forEach((file) => {
          if (file) formDataToSend.append("other_images", file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Debug the formData
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch("http://localhost:5002/add-product", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product inserted successfully");
      } else {
        console.error(data.error);
        alert("Error inserting product: " + data.error);
      }
    } catch (error) {
      console.error("Error inserting product:", error);
    }
    navigate('/product-list');
    
  };

  return (
    <div className="addproduct-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="addproduct-format-main">
        {/* Product Title Input */}
        <div className="addproduct-format">
          <div className="product-title">
            <label className="label" htmlFor="product_title">Product Title</label>
            <input
              type="text"
              name="product_title"
              placeholder="Type here"
              value={formData.product_title}
              onChange={handleChange}
              required
            />
          </div>
        </div>
         {/* Product keywords Input */}
         <div className="addproduct-format">
          <div className="product-keyword">
            <label className="label" htmlFor="product_keyword">Product Keywords</label>
            <input
              type="text"
              name="product_keyword"
              placeholder="Type here"
              value={formData.product_keyword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
         
        {/* Short Description using Quill */}
        <div className="addproduct-format">
          <div className="product-short-description">
            <label className="label" htmlFor="product_short_description">
              Short Description
            </label>
            <ReactQuill
              value={formData.product_short_description}
              onChange={handleShortDescriptionChange}
              placeholder="Product short description"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
            />
          </div>
        </div>

        {/* Full Description using Quill */}
        <div className="addproduct-format">
          <div className="product-full-description">
            <label className="label" htmlFor="product_full_description">
              Full Description
            </label>
            <ReactQuill
              value={formData.product_full_description}
              onChange={handleFullDescriptionChange}
              placeholder="Product full description"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
            />
          </div>
        </div>
        
        {/* Price Inputs */}
        <div className="addproduct-format">
          <div className="product-price">
            <div className="product-old_price">
              <label className="label" htmlFor="old_price">Old Price</label>
              <input
                type="text"
                name="old_price"
                placeholder="Type here"
                value={formData.old_price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="product-new_price">
              <label className="label" htmlFor="new_price">New Price</label>
              <input
                type="text"
                name="new_price"
                placeholder="Type here"
                value={formData.new_price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Category and Subcategory */}
        <div className="addproduct-format">
          <div className="category">
            <label className="label" htmlFor="category">Select Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Electronics & Gadgets">Electronics & Gadgets</option>
              <option value="furniture">Beauty & Wellness</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Groceries & Food">Groceries & Food</option>
              <option value="Baby & Kids">Baby & Kids</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Books, Art & Hobbies">Books, Art & Hobbies</option>
              <option value="Seasonal & Gifts
">Seasonal & Gifts
              </option>

            </select>
          </div>

          <div className="sub_category">
            <label className="label" htmlFor="sub_category">Select Sub Category</label>
            <select name="sub_category" value={formData.sub_category} onChange={handleChange}>
              <option value="Smartphones">Smartphones</option>
              <option value="Tablets">Tablets</option>
              <option value="Laptops">Laptops</option>
              <option value="Computers">Computers</option>
              <option value="Gaming Consoles">Gaming Consoles</option>
              <option value="Smartwatches">Smartwatches</option>
              <option value="Cameras">Cameras</option>
              <option value="Drones">Drones</option>
              <option value="Headphones">Headphones</option>
              <option value="Computer Accessories">Computer Accessories</option>
              <option value="onu">onu</option>
              <option value="girls-hand-bag">girls-hand-bag</option>
              <option value="tshirt">tshirt</option>
              <option value="Calculator">Calculator</option>
              <option value="Printer">Printer</option>
              <option value="Keyboard">Keyboard</option>
            </select>
          </div>
        </div>

        {/* Discount, Main Image, and Other Images */}
        <div className="addproduct-format">
        <div className="product-brand">
            <label className="label" htmlFor="product_brand">Select Brand</label>
            <select name="product_brand" value={formData.product_brand} onChange={handleChange}>
              <option value="HP">HP</option>
              <option value="ASUS">ASUS</option>
              <option value="DELL">DELL</option>
              <option value="ACER">ACER</option>
              <option value="MAC">MAC</option>
              <option value="Naviforce">Naviforce</option>
              <option value="Colmi">Colmi</option>
              <option value="BODCOM">BODCOM</option>
              <option value="Zaaliqa">Zaaliqa</option>
              <option value="GESPO">GESPO</option>
              <option value="Casio">Casio</option>
              <option value="Epson">Epson</option>
              <option value="Keychron">Keychron</option>
            </select>
          </div>
          <div className="discount_offer">
            <label className="label" htmlFor="discount_offer">Discount</label>
            <input
              type="text"
              name="discount_offer"
              placeholder="Type here"
              value={formData.discount_offer}
              onChange={handleChange}
              required
            />
          </div>
          
        </div>

        <div className="addproduct-format">
        <div className="product-main_img">
            <label className="label" htmlFor="main_img">Product Main Image</label>
            <input
              type="file"
              name="main_img"
              onChange={handleMainImageChange}
              required
            />
            {mainImagePreview && <img src={mainImagePreview} alt="Main Preview" className="image-preview" />}
          </div>
        </div>

        {/* Other Images */}
        <div className="addproduct-format">
          {/* Handle the other images */}
          <div className="other_img1">
            <label className="label" htmlFor="other_img1">Other Image 1</label>
            <input
              type="file"
              name="other_img1"
              onChange={(e) => handleOtherImagesChange(0, e)}
            />
            {otherImagesPreview[0] && <img src={otherImagesPreview[0]} alt="Other Preview 1" className="image-preview" />}
          </div>
          <div className="other_img2">
            <label className="label" htmlFor="other_img2">Other Image 2</label>
            <input
              type="file"
              name="other_img2"
              onChange={(e) => handleOtherImagesChange(1, e)}
            />
            {otherImagesPreview[1] && <img src={otherImagesPreview[1]} alt="Other Preview 2" className="image-preview" />}
          </div>
        </div>

        {/* Other Images 3 4 */}
        <div className="addproduct-format">
          {/* Handle the other images */}
          <div className="other_img3">
            <label className="label" htmlFor="other_img3">Other Image 3</label>
            <input
              type="file"
              name="other_img3"
              onChange={(e) => handleOtherImagesChange(2, e)}
            />
            {otherImagesPreview[2] && <img src={otherImagesPreview[2]} alt="Other Preview 3" className="image-preview" />}
          </div>
          <div className="other_img4">
            <label className="label" htmlFor="other_img4">Other Image 4</label>
            <input
              type="file"
              name="other_img4"
              onChange={(e) => handleOtherImagesChange(3, e)}
            />
            {otherImagesPreview[3] && <img src={otherImagesPreview[3]} alt="Other Preview 4" className="image-preview" />}
          </div>
        </div>

        {/* Submit Button */}
        <div className="add">
          <button type="submit">ADD PRODUCT</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;