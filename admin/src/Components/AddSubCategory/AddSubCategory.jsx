import React from 'react'
import './AddSubCategory.css'

const AddSubCategory = () => {
  return (
    <div className="add-subCategory-container">
      <div className="add-subCategories">
        <h2>Add Sub Category</h2>
        <form action="">
          <div className="input-box">
            <input className="input-field" type="text" required />
            <div className="label-line">Enter Sub Category</div>
          </div>

          <div className="category-insert">
            <input type="submit" value="Insert" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubCategory
