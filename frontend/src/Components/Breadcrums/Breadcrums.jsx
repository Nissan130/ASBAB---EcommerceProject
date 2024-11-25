import React from "react";
import { MdChevronRight } from "react-icons/md";
import "./Breadcrums.css";

const Breadcrums = (props) => {
  const { product } = props;
  // console.log(product.sub_category);

  return (
    <div className="breadcrums">
      <div className="breadcrums-link">
        <span>HOME</span>
        <span>
          <MdChevronRight />
        </span>
      </div>
      <div className="breadcrums-link">
        <span>{product.category}</span>
        <span>
          <MdChevronRight />
        </span>
      </div>
      <div className="breadcrums-link">
        <span>{product.sub_category}</span>
        <span>
          <MdChevronRight />
        </span>
      </div>
      <div className="breadcrums-link">
        <span>{product.title}</span>
      </div>
    </div>
  );
};

export default Breadcrums;
