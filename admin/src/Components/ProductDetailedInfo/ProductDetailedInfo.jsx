import React, { useEffect, useState } from "react";
import "./ProductDetailedInfo.css";
import laptop_image1 from "../../assets/laptop_image1.jpeg";
import { CiEdit } from "react-icons/ci";
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailedInfo = () => {
  const [products, setProducts] = useState([]); // State to hold product list
  const { product_id } = useParams(); // Get product_id from URL params
  const navigate = useNavigate();

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5002/products"); // Fetch products
        setProducts(response.data); // Set product list
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []);

  

  // Find the selected product
  const product = products.find((e) => e.product_id === parseInt(product_id));

  // Show loading message if product is not yet loaded
  if (!product) {
    return <div>Loading product details...</div>;
  }
  //   console.log(product.other_images);

  const otherImages =
    typeof product.other_images === "string"
      ? JSON.parse(product.other_images)
      : product.other_images;

  return (
    <div>
      <div className="product-detailed-info-container">
        <form action="" className="form">
          <h2 className="heading">Product Detailed Information</h2>
          <div className="edit-info">
            <button
              type="button"
              onClick={() => navigate(`/product-list/product-detailed-info/${product_id}/edit-product-info`)}

            >
              <span>
                <CiEdit style={{ strokeWidth: "1.4" }} />
              </span>
              <span>Edit</span>
            </button>
          </div>

          <div className="product-detailed-info">
            <div className="product-detailed-info-row">
              <div className="product-info">
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" value={product.title} readOnly />
              </div>
            </div>

            <div className="product-detailed-info-row">
              <div className="product-info">
                <label htmlFor="description">Description</label>
                <br />
                <textarea
                  name="description"
                  id=""
                  value={product.product_description}
                  readOnly
                ></textarea>
              </div>
            </div>

            <div className="product-detailed-info-row">
              <div className="product-info">
                <label htmlFor="keywords">Keywords</label>
                <br />
                <input type="text" value={product.product_keyword} readOnly />
              </div>
            </div>

            <div className="product-detailed-info-row">
              <div className="product-info">
                <label htmlFor="old_price">
                  Old Price (<TbCurrencyTaka />)
                </label>
                <br />
                <input type="text" value={product.old_price} readOnly />
              </div>
              <div className="product-info">
                <label htmlFor="new_price">
                  New Price (<TbCurrencyTaka />)
                </label>
                <br />
                <input type="text" value={product.new_price} readOnly />
              </div>
            </div>

            <div className="product-detailed-info-row">
              <div className="product-info">
                <label htmlFor="main_category">Main Category</label>
                <br />
                <input type="text" value={product.category} readOnly />
              </div>
              <div className="product-info">
                <label htmlFor="sub_category">Sub Category</label>
                <br />
                <input type="text" value={product.sub_category} readOnly />
              </div>
            </div>

            <div className="product-detailed-info-row">
              <div className="product-info">
                <label htmlFor="brand">Brand</label>
                <br />
                <input type="text" value={product.product_brand} readOnly />
              </div>
              <div className="product-info">
                <label htmlFor="discount">Discount</label>
                <br />
                <input type="text" value={product.discount} readOnly />
              </div>
            </div>

            <div className="product-detailed-info-row">
              <div className="product-images">
                <label htmlFor="main_image">Main Image</label>
                <br />
                <img
                  src={`http://localhost:5002/${product.main_image}`}
                  alt={product.title}
                />
              </div>

              {otherImages &&
                otherImages.length > 0 &&
                otherImages.map((image, index) => (
                  <div className="product-images" key={index}>
                    <label htmlFor={`other_image${index + 1}`}>
                      Other Image {index + 1}
                    </label>
                    <br />
                    <img
                      src={`http://localhost:5002/${image}`}
                      alt={`${product.title} Other ${index + 1}`}
                    />
                  </div>
                ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailedInfo;
