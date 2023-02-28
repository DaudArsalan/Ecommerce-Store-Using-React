import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";

const Category = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-category-section">
        <div className="heading">Categories</div>
        <div className="categories">
          {categories?.data?.map((item) => {
            return (
              <div
                key={item.id}
                className="category"
                onClick={() => navigate(`/category/${item.id}`)}
              >
                <img
                  src={
                    process.env.REACT_APP_URL +
                    item?.attributes?.Image?.data?.attributes?.url
                  }
                  alt="categories"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Category;
