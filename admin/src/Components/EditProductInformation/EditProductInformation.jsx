import React, { useEffect, useState } from "react";
import "./EditProductInformation.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProductInformation = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    product_title: "",
    product_keyword: "",
    product_description: "",
    old_price: "",
    new_price: "",
    category: "",
    sub_category: "",
    product_brand: "",
    discount_offer: "",
    main_img: null,
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

        const otherImagesPreview =
          typeof productData.other_images === "string"
            ? JSON.parse(productData.other_images)
            : productData.other_images;

        setProduct(productData);

        setFormData({
          product_title: productData.title || "",
          product_keyword: productData.product_keyword || "",
          product_description: productData.product_description || "",
          old_price: productData.old_price || "",
          new_price: productData.new_price || "",
          category: productData.category || "",
          sub_category: productData.sub_category || "",
          product_brand: productData.product_brand || "",
          discount_offer: productData.discount_offer || "",
          main_img: productData.main_img || null, // main image URL or path
          other_images: otherImagesPreview,
        });

        setMainImagePreview(productData.main_img); // Set the main image preview
        setOtherImagesPreview(otherImagesPreview); // Set the other images previews
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, main_img: file });
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "other_images") {
        formData.other_images.forEach((image) => {
          if (image) formDataToSend.append("other_images", image);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    axios
      .post("http://localhost:5002/edit-product", formDataToSend)
      .then(() => {
        alert("Product updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="editproduct-container">
      <h2>Edit Product Information</h2>
      <form onSubmit={handleSubmit} className="editproduct-form">
        {/* Product Title */}
        <div className="form-group">
          <label htmlFor="product_title">Product Title</label>
          <input
            type="text"
            name="product_title"
            value={formData.product_title}
            onChange={(e) =>
              setFormData({ ...formData, product_title: e.target.value })
            }
            required
          />
        </div>

        {/* Product Keywords */}
        <div className="form-group">
          <label htmlFor="product_keyword">Product Keywords</label>
          <input
            type="text"
            name="product_keyword"
            value={formData.product_keyword}
            onChange={(e) =>
              setFormData({ ...formData, product_keyword: e.target.value })
            }
            required
          />
        </div>

        {/* Product Description */}
        <div className="form-group">
          <label htmlFor="product_description">Description</label>
          <textarea
            name="product_description"
            value={formData.product_description}
            onChange={(e) =>
              setFormData({ ...formData, product_description: e.target.value })
            }
            required
          />
        </div>

        {/* Prices */}
        <div className="form-group">
          <label htmlFor="old_price">Old Price</label>
          <input
            type="text"
            name="old_price"
            value={formData.old_price}
            onChange={(e) =>
              setFormData({ ...formData, old_price: e.target.value })
            }
            required
          />
          <label htmlFor="new_price">New Price</label>
          <input
            type="text"
            name="new_price"
            value={formData.new_price}
            onChange={(e) =>
              setFormData({ ...formData, new_price: e.target.value })
            }
            required
          />
        </div>

        {/* Categories and Subcategories */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="Fashion & Apparel">Fashion & Apparel</option>
            <option value="Electronics & Gadgets">Electronics & Gadgets</option>
            <option value="Home & Living">Home & Living</option>
          </select>

          <label htmlFor="sub_category">Sub Category</label>
          <select
            name="sub_category"
            value={formData.sub_category}
            onChange={(e) =>
              setFormData({ ...formData, sub_category: e.target.value })
            }
          >
            <option value="Smartphones">Smartphones</option>
            <option value="Tablets">Tablets</option>
          </select>
        </div>


{/* brand and discount */}
      <div className="form-group">
      <label htmlFor="product_brand">Brand</label>
          <select
            name="product_brand"
            value={formData.product_brand}
            onChange={(e) =>
              setFormData({ ...formData, product_brand: e.target.value })
            }
          >
            <option value="Smartphones">Smartphones</option>
            <option value="Tablets">Tablets</option>
          </select>

          <label htmlFor="dicount_offer">Discount</label>
          <input
            type="text"
            name="dicount_offer"
            value={formData.discount_offer}
            onChange={(e) =>
              setFormData({ ...formData, dicount_offer: e.target.value })
            }
            required
          />

        </div>

        {/* Main Image */}
        <div className="form-group">
          <label htmlFor="main_img">Main Image</label>
          <input type="file" onChange={handleMainImageChange} />
          {mainImagePreview && (
            <img
              src={mainImagePreview}
              alt="Main Preview"
              className="image-preview"
            />
          )}
        </div>

        {/* Other Images */}
        {otherImagesPreview.map((preview, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`other_img${index}`}>Other Image {index + 1}</label>
            <input
              type="file"
              onChange={(e) => handleOtherImagesChange(index, e)}
            />
            {preview && (
              <img
                src={preview}
                alt={`Other Preview ${index + 1}`}
                className="image-preview"
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductInformation;
