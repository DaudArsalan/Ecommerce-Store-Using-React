import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import useFetch from "../../hooks/useFetch";
import "./Header.scss";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { data } = useFetch("/api/categories?populate=*");

  const navigate = useNavigate();
  const { cartCount } = useContext(Context);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      if (offset > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  return (
    <>
      <header className={`header ${scroll ? "sticky" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li>
              <span onClick={() => setToggleDropdown(() => !toggleDropdown)}>
                Categories <RiArrowDropDownLine className="dropdownIcon" />
              </span>
              <ul
                className={!toggleDropdown ? "display" : "dropdown"}
                onMouseLeave={() => setToggleDropdown(() => !toggleDropdown)}
              >
                {data?.data?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => navigate(`/category/${item.id}`)}
                    >
                      <span>{item.attributes?.Title}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            KINETIX.
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            <AiOutlineHeart />
            <span className="cart-icon" onClick={() => setToggleCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>

      {toggleCart && <Cart setToggleCart={setToggleCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
