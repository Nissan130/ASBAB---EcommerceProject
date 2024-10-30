import React from "react";
import "./AddCategory.css";

const AddCategory = () => {
  return (
    <div className="add-category-container">

      <div className="add-categories">
        <h2>Add Main Category</h2>
        <form action="">
        <div className="category-input-box">
          <label htmlFor="">Main Category</label>
          <br />
          <input type="text" placeholder="Type here" />
        </div>
          <div className="category-insert">
            <input type="submit" value='Insert'/>
          </div>
        </form>
       
      </div>

    </div>
  );
};

export default AddCategory;
