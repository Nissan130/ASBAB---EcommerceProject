import React from "react";
import "./ProductReview.css";
import { IoStar } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

const ProductReview = (product) => {
  return (
    <div className="Product-Review-Rating-Container">
      {/* product rating container start  */}
      <div className="product-rating-container">
        <div className="overall-rating-container">
          <div className="rating-title">Overall Rating</div>
          <div className="overall-rating">
            <div className="number-rating">
              <span style={{ color: "#ff4141", fontWeight: "600" }}>4.3 </span>/
              5
            </div>
            <div className="star-rating">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar style={{ color: "#ccc" }} />
            </div>
            <div className="rating-count">410 ratings</div>
          </div>
        </div>
        <div className="rating-breakdown-container">
          <div className="rating-breakdown-title">Rating Breakdown</div>
          <div className="rating-breakdown">
            <div className="rating-row">
              <div className="side">
                5 <IoStar />
              </div>
              <div className="middle">
                <div className="bar-container">
                  <div className="bar-five"></div>
                </div>
              </div>
              <div className="side right">160</div>
            </div>
            <div className="rating-row">
              <div className="side">
                4 <IoStar />
              </div>
              <div className="middle">
                <div className="bar-container">
                  <div className="bar-four"></div>
                </div>
              </div>
              <div className="side right">100</div>
            </div>
            <div className="rating-row">
              <div className="side">
                3 <IoStar />
              </div>
              <div className="middle">
                <div className="bar-container">
                  <div className="bar-three"></div>
                </div>
              </div>
              <div className="side right">80</div>
            </div>
            <div className="rating-row">
              <div className="side">
                2 <IoStar />
              </div>
              <div className="middle">
                <div className="bar-container">
                  <div className="bar-two"></div>
                </div>
              </div>
              <div className="side right">30</div>
            </div>
            <div className="rating-row">
              <div className="side">
                1 <IoStar />
              </div>
              <div className="middle">
                <div className="bar-container">
                  <div className="bar-one"></div>
                </div>
              </div>
              <div className="side right">40</div>
            </div>
          </div>
        </div>
      </div>
      {/* product rating container end  */}

      {/* product-review-container start  */}
      <div className="product-all-review-container">
        <div className="review-title">
          <h2>All Review <span>(200)</span></h2>
        </div>
        <div className="reviews-container">
          <div className="reviewer-name-date">
            <div className="reviewer-name">
              <FaCircleUser style={{ marginRight: "5px" }} />
              <p>Nissan Ali,</p>
            </div>
            <div className="review-date">2 days ago</div>
          </div>
          <div className="review">This is very good product</div>

          <div className="like-dislike-container">
            <div className="like">
              
                <BiSolidLike /> <p>12</p>
            </div>
            <div className="dislike">
              <BiSolidDislike />
            </div>
          </div>
        </div>

        <div className="reviews-container">
          <div className="reviewer-name-date">
            <div className="reviewer-name">
              <FaCircleUser style={{ marginRight: "5px" }} />
              <p>John Doe,</p>
            </div>
            <div className="review-date">30 OCt, 2024</div>
          </div>
          <div className="review">This is absolutely very good product. You can use it.</div>

          <div className="like-dislike-container">
            <div className="like">
              
                <BiSolidLike /> <p>1k</p>
            </div>
            <div className="dislike">
              <BiSolidDislike />
            </div>
          </div>
        </div>

       
      </div>
      {/* product-review-container start  */}

      <div className="product-review-write-container">
        <div className="review-title">
          <h2>Your Review</h2>
        </div>
        <div className="review-write-container">
          <div className="give-rating">
            <p>Give your rating:</p>
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
          </div>
        </div>
        <form className="review-write-form">
          <div className="review-write">
            <input type="text" placeholder="Your name" required />
            <textarea name="" id="" placeholder="Type your review" required></textarea>
          </div>
          <div className="submit-review">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReview;
