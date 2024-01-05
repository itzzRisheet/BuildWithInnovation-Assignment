import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../store/zusStore";
import axios from "axios";

const useFilterWithPrice = ([min, max]) => {
  const productData = useLocalStorage((state) => state.productData);
  const [filterData, setFilterData] = useState();

  useEffect(() => {
    const tempdata = productData.map((item) => {
      return item.price > min && item.price < max;
    });
    console.log("useEffect in usefilter hook");
  }, [productData]);

  return productData;
};

export default useFilterWithPrice;
