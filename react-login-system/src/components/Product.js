import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartBtn from "./cartBtn";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as hollowStar } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../store/zusStore";
import toast from "react-hot-toast";

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
}) => {
  const [currImage, setcurrImage] = useState(thumbnail);
  // const setCartData = useCart((state) => state.setCartData);
  const cartDataLocal = useCart((state) => state.cartDataLocal);
  const ids = useCart((state) => state.id);
  const addID = useCart((state) => state.addID);
  const setCartDataLocal = useCart((state) => state.setCartDataLocal);
  const removeItem = useCart((state) => state.removeItem);

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
        <CartBtn
          func={() => {
            if (!inCart) {
              if (ids.includes(id)) {
                toast.error("already added to cart");
              } else {
                addID(id);
                setCartDataLocal(product);
              }
            } else {
              removeItem(id);
              console.log(cartDataLocal);
            }
          }}
          i={id}
          inCart={inCart}
        />
      </div>
    </div>
  );
};

Product.propTypes = {
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
};

export default Product;
