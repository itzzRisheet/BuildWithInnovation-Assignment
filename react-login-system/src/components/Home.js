import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import "../styles/home.css";
import { motion } from "framer-motion";

function Home() {
  const axiosConfig = axios.create({
    baseURL: process.env.BASEURL,
  });

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axiosConfig
        .get("https://dummyjson.com/products?limit=0")
        .then((res) => {
          setProductData(res.data.products);
        })
        .catch((err) => {});
    };
    getData();
  }, [productData]);

  return (
    <motion.div
      className="homeContainer"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0% " }}
    >
      <div className="actions"></div>
      <div className="products">
        {productData.map((productDetails) => {
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
            />
          );
        })}
      </div>
    </motion.div>
  );
}

export default Home;
