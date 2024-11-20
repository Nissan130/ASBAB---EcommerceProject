import React from "react";
import "./AddCategory.css";

const AddCategory = () => {
  return (
    <div className="add-category-container">
      <div className="add-categories">
        <h2>Add Main Category</h2>
        <form action="">
          <div className="input-box">
            <input className="input-field" type="text" required />
            <div className="label-line">Enter Main Category</div>
          </div>

          <div className="category-insert">
            <input type="submit" value="Insert" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
