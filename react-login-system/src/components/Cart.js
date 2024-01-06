import React, { useEffect, useState } from "react";
import { useCart } from "../store/zusStore";
import axios from "axios";
import Product from "./Product";
import { motion } from "framer-motion";

function Cart() {
  const { cartDataLocal, total } = useCart();

  return (
    <motion.div
      className="products"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0% " }}
    >
      {cartDataLocal.map((productDetails) => {
        return (
          <Product
            id={productDetails.id}
            title={productDetails.title}
            description={productDetails.description}
            price={productDetails.price}
            discount={productDetails.discountPercentage}
            rating={productDetails.rating}
            stock={productDetails.stock}
            brand={productDetails.brand}
            category={productDetails.category}
            thumbnail={productDetails.thumbnail}
            images={productDetails.images}
            inCart={true}
            total={0}
          />
        );
      })}
    </motion.div>
  );
}

export default Cart;
