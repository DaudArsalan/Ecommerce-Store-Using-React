import React from "react";
import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ innerPage, headingText, products }) => {
  return (
    <>
      <div className="container">
        {!innerPage && <div className="heading">{headingText}</div>}
        <div className="products">
          {products?.data?.map((item) => {
            return (
              <Product key={item.id} id={item.id} data={item.attributes} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
