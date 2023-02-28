import React from "react";
import "./Category.scss";
import Products from "../../components/Products/Products";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Category = ({ innerPage }) => {
  const { id } = useParams();
  const { data } = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );

  return (
    <>
      <div className="category">
        <div className="layout">
          <div className="title">
            {
              data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.Title
            }
          </div>

          <Products innerPage={true} products={data} />
        </div>
      </div>
    </>
  );
};

export default Category;
