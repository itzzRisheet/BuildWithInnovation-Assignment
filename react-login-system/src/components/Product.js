import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartBtn from "./cartBtn";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as hollowStar } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../store/zusStore";
import AddItem from "./addItem.js";
import toast from "react-hot-toast";
import { Minus, MinusCircle, Plus, PlusCircle } from "lucide-react";

const Product = ({
  id,
  title,
  description,
  thumbnail,
  price,
  discount,
  rating,
  stock,
  brand,
  category,
  images,
  inCart,
  total,
}) => {
  const [currImage, setcurrImage] = useState(thumbnail);
  // const setCartData = useCart((state) => state.setCartData);

  const { cartDataLocal, setCartDataLocal, removeItem, addID } = useCart();

  const ids = useCart((state) => state.id);
  const [addStatus, setAddStatus] = useState(false);
  const incrementItem = useCart((state) => state.incrementItem);
  const decrementItem = useCart((state) => state.decrementItem);
  const product = {
    id,
    title,
    description,
    thumbnail,
    price,
    discount,
    rating,
    stock,
    brand,
    category,
    images,
    inCart,
    total: 1,
  };

  const printTotalItem = () => {
    const obj = cartDataLocal.find((product) => product.id === id);
    // return <p>wait</p>;
    return <p className="add">{obj.total}</p>;
  };

  const isRemovable = () => {
    const obj = cartDataLocal.find((product) => product.id === id);
    return obj.total > 1;
  };

  return (
    <div className="amazon-product-card">
      <div className="amazon-product-images">
        <img
          src={currImage || images[Math.floor(Math.random() * images.length)]}
          alt={title}
          className="amazon-product-main-image"
        />
        <div className="moreImages">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Extra image ${index + 1}`}
              className="amazon-product-extra-image"
              onClick={() => {
                setcurrImage(img);
              }}
            />
          ))}
        </div>
      </div>
      <h2 className="amazon-product-title">{title}</h2>
      <p className="amazon-product-description">{description}</p>
      <div className="amazon-product-price-info">
        <span className="amazon-product-price">
          <span>&#8377;</span>
          {price}
        </span>
        {discount && (
          <span className="amazon-product-discount">{discount}% off</span>
        )}
      </div>

      <div className="amazon-product-rating-info">
        <div className="amazon-product-rating">
          {Array.from({ length: 5 }, (_, i) => i).map((i) => (
            <span key={i}>
              {i + 1 < rating ? (
                <FontAwesomeIcon icon={solidStar} />
              ) : (
                <FontAwesomeIcon icon={hollowStar} />
              )}
            </span>
          ))}
        </div>
        <div className="amazon-product-stock">
          {stock > 0 ? `In stock` : `Out of stock`}
        </div>
      </div>
      <div className="amazon-product-info">
        <span className="amazon-product-info-item">By {brand}</span>
        <span className="amazon-product-info-item">In {category}</span>
      </div>
      <div className="addToCartBtn">
        {inCart ? (
          <span>
            <MinusCircle
              onClick={() => {
                const obj = cartDataLocal.find((product) => product.id === id);
                if (obj.total > 1) {
                  setAddStatus(true);
                  decrementItem(id);
                } else {
                  removeItem(id);
                }
              }}
              className="itmbtn"
            />
          </span>
        ) : (
          ""
        )}

        {addStatus ? (
          printTotalItem()
        ) : (
          <CartBtn
            func={() => {
              if (!inCart) {
                if (ids.includes(id)) {
                  toast.error("want to add more go to Cart");
                } else {
                  addID(id);
                  setCartDataLocal(product);
                }
              } else {
                removeItem(id);
              }
            }}
            i={id}
            inCart={inCart}
          />
        )}

        {inCart ? (
          <span>
            <PlusCircle
              onClick={() => {
                const obj = cartDataLocal.find((product) => product.id === id);
                console.log(obj.total, addStatus, isRemovable());
                setAddStatus(true);
                incrementItem(id);
              }}
              className="itmbtn"
            />
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  rating: PropTypes.number,
  stock: PropTypes.number,
  brand: PropTypes.string,
  category: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  inCart: PropTypes.bool,
  total: PropTypes.number,
};

export default Product;
