import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data to send to backend
    const formDataToSend = new FormData();
    formDataToSend.append("product_title", formData.product_title);
    formDataToSend.append("product_keyword", formData.product_keyword);
    formDataToSend.append("product_short_description", formData.product_short_description);
    formDataToSend.append("product_full_description", formData.product_full_description);
    formDataToSend.append("old_price", formData.old_price);
    formDataToSend.append("new_price", formData.new_price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("sub_category", formData.sub_category);
    formDataToSend.append("product_brand", formData.product_brand);
    formDataToSend.append("discount_offer", formData.discount_offer);
    formDataToSend.append("main_img", formData.main_img);

    // Add other images
    formData.other_images.forEach((image, index) => {
      if (image) formDataToSend.append(`other_images`, image); // Correct field for file array
    });

    // Send the product data to the backend using fetch
    fetch("http://localhost:5002/add-product", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Product added successfully");

        // Reset form data and image previews after submission
        setFormData({
          product_title: "",
          product_keyword: "",
          product_short_description: "",
          product_full_description: "",
          old_price: "",
          new_price: "",
          category: "",
          sub_category: "",
          product_brand:"",
          discount_offer: "",
          main_img: null,
          other_images: [null, null, null, null], // Reset other images to null
        });

        setMainImagePreview(null); // Clear main image preview
        setOtherImagesPreview([null, null, null, null]); // Clear other images preview
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
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
         {/* Product description Input */}
         <div className="addproduct-format">
          <div className="product-short-description">
            <label className="label" htmlFor="product_short_description">Short Description</label>
            <textarea
            name="product_short_description"
            placeholder="Product short description"
            value={formData.product_short_description}
            onChange={handleChange}
          />
          </div>
        </div>
        {/* Product description Input */}
        <div className="addproduct-format">
          <div className="product-full-description">
            <label className="label" htmlFor="product_full_description">Full Description</label>
            <textarea
            name="product_full_description"
            placeholder="Product full description"
            value={formData.product_full_description}
            onChange={handleChange}
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
