import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill's CSS
import { useParams } from "react-router-dom";
import axios from "axios";

import "./EditProductInformation.css";

const EditProductInformation = () => {
  const { product_id } = useParams();
  const [formData, setFormData] = useState({
    product_id: product_id,
    product_title: "",
    product_keyword: "",
    product_short_description: "",
    product_full_description: "",
    old_price: "",
    new_price: "",
    category: "",
    sub_category: "",
    product_brand: "",
    discount: "",
    main_image: null,
    other_images: [null, null, null, null],
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [otherImagesPreview, setOtherImagesPreview] = useState([
    null,
    null,
    null,
    null,
  ]);

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/products/${product_id}`
        );
        const productData = response.data;

        const otherImages = Array.isArray(productData.other_images)
          ? productData.other_images
          : JSON.parse(productData.other_images || "[]");

        setFormData({
          product_id: productData.product_id,
          product_title: productData.title || "",
          product_keyword: productData.product_keyword || "",
          product_short_description:
            productData.product_short_description || "",
          product_full_description: productData.product_full_description || "",
          old_price: productData.old_price || "",
          new_price: productData.new_price || "",
          category: productData.category || "",
          sub_category: productData.sub_category || "",
          product_brand: productData.product_brand || "",
          discount: productData.discount || "",
          main_image: productData.main_image || null,
          other_images: otherImages,
        });

        setMainImagePreview(
          productData.main_image
            ? `http://localhost:5002/${productData.main_image}`
            : null
        );
        setOtherImagesPreview(
          otherImages.map((image) =>
            image ? `http://localhost:5002/${image}` : null
          )
        );
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

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
      setFormData({ ...formData, main_image: file });
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
      const response = await fetch("http://localhost:5002/update-product", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product updated successfully");
      } else {
        console.error(data.error);
        alert("Error updating product: " + data.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Edit Product Information</h2>
      <form onSubmit={handleSubmit} className="addproduct-format-main">
        {/* Product Title Input */}
        <div className="addproduct-format">
          <div className="product-title">
            <label className="label" htmlFor="product_title">
              Product Title
            </label>
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
            <label className="label" htmlFor="product_keyword">
              Product Keywords
            </label>
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
              <label className="label" htmlFor="old_price">
                Old Price
              </label>
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
              <label className="label" htmlFor="new_price">
                New Price
              </label>
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
            <label className="label" htmlFor="category">
              Select Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Electronics & Gadgets">
                Electronics & Gadgets
              </option>
              <option value="furniture">Beauty & Wellness</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Groceries & Food">Groceries & Food</option>
              <option value="Baby & Kids">Baby & Kids</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Books, Art & Hobbies">Books, Art & Hobbies</option>
              <option
                value="Seasonal & Gifts
"
              >
                Seasonal & Gifts
              </option>
            </select>
          </div>

          <div className="sub_category">
            <label className="label" htmlFor="sub_category">
              Select Sub Category
            </label>
            <select
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
            >
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
              <option value="headphones">headphones</option>
              <option value="Music Player">Music Player</option>
            </select>
          </div>
        </div>

        {/* Discount, Main Image, and Other Images */}
        <div className="addproduct-format">
          <div className="product-brand">
            <label className="label" htmlFor="product_brand">
              Select Brand
            </label>
            <select
              name="product_brand"
              value={formData.product_brand}
              onChange={handleChange}
            >
              <option value="HP">HP</option>
              <option value="ASUS">ASUS</option>
              <option value="DELL">DELL</option>
              <option value="ACER">ACER</option>
              <option value="MAC">MAC</option>
              <option value="Naviforce">Naviforce</option>
              <option value="Colmi">Colmi</option>
              <option value="Corsair">Corsair</option>
              <option value="Canoon">Canoon</option>
            </select>
          </div>
          <div className="discount_offer">
            <label className="label" htmlFor="discount_offer">
              Discount
            </label>
            <input
              type="text"
              name="discount_offer"
              placeholder="Type here"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="addproduct-format">
          <div className="product-main_img">
            <label className="label" htmlFor="main_image">
              Product Main Image
            </label>
            <input
              type="file"
              name="main_image"
              onChange={handleMainImageChange}
              required
            />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Main Preview"
                className="image-preview"
              />
            )}
          </div>
        </div>

        {/* Other Images */}
        <div className="other-images-container">
          {otherImagesPreview.map(
            (preview, index) =>
              preview && (
                <div key={index} className="other-image">
                  <label className="label" htmlFor={`other_image${index + 1}`}>
                    Other Image {index + 1}
                  </label>
                  <input
                    type="file"
                    name={`other_image${index + 1}`}
                    onChange={(e) => handleOtherImagesChange(index, e)}
                  />
                  <img
                    src={preview}
                    alt={`Other Preview ${index + 1}`}
                    className="image-preview"
                  />
                </div>
              )
          )}
        </div>

        {/* Submit Button */}
        <div className="add">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductInformation;
