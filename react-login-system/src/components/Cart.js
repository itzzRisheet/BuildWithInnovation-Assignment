import React, { useEffect, useState } from "react";
import { useCart } from "../store/zusStore";
import axios from "axios";
import Product from "./Product";
import { motion } from "framer-motion";

function Cart() {
  // const cartData = useCart((state) => state.cartData);
  const cartDataLocal = useCart((state) => state.cartDataLocal);
  // const [productData, setProductData] = useState([]);

  const axiosConfig = axios.create({
    baseURL: process.env.BASEURL,
  });

  // useEffect(() => {
  //   cartData.map(async (url) => {
  //     await axiosConfig.get(url).then((res) => {
  //       setProductData((prev) => [...prev, res.data]);
  //     });
  //   });
  // }, []);

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
          />
        );
      })}
    </motion.div>
  );
}

export default Cart;
