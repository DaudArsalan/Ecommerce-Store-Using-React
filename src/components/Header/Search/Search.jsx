import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import "./Search.scss";

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  let { data } = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${query}`
  );

  if (!query.length) {
    data = null;
  }

  return (
    <>
      <div className="search">
        <div className="form">
          <input
            type="text"
            autoFocus
            placeholder="Search for products"
            value={query}
            onChange={onChange}
          />
          <MdClose
            onClick={() => {
              setShowSearch(false);
            }}
          />
        </div>

        <div className="search-results">
          
          {!data?.data?.length && (
            <div className="start-msg">
              Start typing to see products you are looking for.
            </div>
          )}

          <div className="results">
            {data?.data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="item"
                  onClick={() => {
                    navigate("/product/" + item.id);
                    setShowSearch(false);
                  }}
                >
                  <div className="image">
                    <img
                      src={
                        process.env.REACT_APP_URL +
                        item.attributes.image.data[0].attributes.url
                      }
                      alt="product"
                    />
                  </div>
                  <div className="product-details">
                    <span className="name">{item.attributes.title}</span>
                    <span className="description">
                      {item.attributes.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
