import React, { useEffect, useState } from "react";
import Product from "./Product";
import "../styles/home.css";
import { motion } from "framer-motion";
import Slider from "@mui/material/Slider";
import { useLocalStorage } from "../store/zusStore";
import SearchBar from "./search";
import NoProductFound from "./NoProductFound";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faXmark } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [range, setRange] = useState([0, 0]);

  const {
    isLoading,
    productData,
    searchedData,
    filterData,
    setProductData,
    setSearchedData,
    filterDataWithPrice,
  } = useLocalStorage();

  const [filterStatus, setFilterStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = () => {
    setSearchStatus(true);
    setSearchedData(searchQuery);
  };
  const onPriceChange = (event, newValue) => {
    event.preventDefault();
    setRange(newValue);
  };

  const applyFilters = () => {
    setFilterStatus(true);
    filterDataWithPrice(range);
  };

  //   setFilterProcuts(fp);
  //   setFilterApplied(true);
  //   toast.success(productData.length);
  // };

  const printProducts = (pds) => {
    return (
      <div className="products">
        {pds.map((productDetails, key) => {
          return (
            <Product
              key={key}
              className="grid-item"
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
    );
  };

  useEffect(() => {
    setProductData();
  }, []);

  return (
    <motion.div
      className="grid-filter-column"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0% " }}
    >
      <div className="actions">
        <p>Price</p>
        <p>
          <span>&#8377;</span>
          {range[0]} -<span>&#8377;</span>
          {range[1]}
        </p>
        <Slider
          value={range}
          max={2000}
          min={0}
          onChange={onPriceChange}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
        <div className="btnBox">
          <button className="btn" onClick={applyFilters}>
            Apply
          </button>
          <button
            className="btn"
            onClick={() => {
              setFilterStatus(false);
            }}
          >
            clear
          </button>
        </div>
      </div>
      <div className="productSearch">
        <p style={{ color: "white", position: "absolute", margin: "2rem" }}>
          {searchStatus
            ? searchedData.length
            : filterStatus
            ? filterData.length
            : ""}{" "}
          {!(searchStatus || filterStatus)
            ? ""
            : `found out of ${productData.length}`}
        </p>
        <div className="searchBar">
          <SearchBar
            onSearch={onSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              setSearchStatus(false);
              setSearchQuery("");
            }}
          >
            <FontAwesomeIcon icon={faXmark} style={{ color: "white" }} />
          </div>
        </div>

        {searchStatus ? (
          searchedData.length === 0 ? (
            <NoProductFound />
          ) : (
            printProducts(searchedData)
          )
        ) : filterStatus ? (
          filterData.length === 0 ? (
            <NoProductFound />
          ) : (
            printProducts(filterData)
          )
        ) : (
          printProducts(productData)
        )}
      </div>
    </motion.div>
  );
}

export default Home;
