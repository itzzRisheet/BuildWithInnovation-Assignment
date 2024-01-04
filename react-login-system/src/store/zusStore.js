import { create } from "zustand";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.BASEURL,
});
const temp = {
  productData: async () => {
    await axiosConfig
      .get("https://dummyjson.com/products")
      .then((res) => {
        return res.data.products;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  },
};

export const useLocalStorage = create((set) => ({
  tokenData: {
    token: false,
  },

  setToken: () => {
    set((state) => ({
      tokenData: { token: localStorage.getItem("token") ? true : false },
    }));
  },
}));

export const useCart = create((set) => ({
  // cartData: [],
  id: [],
  cartDataLocal: [],

  // setCartData: (id) => {
  //   set((state) => ({
  //     cartData: [...state.cartData, `https://dummyjson.com/products/${id}`],
  //   }));
  // },
  setCartDataLocal: (product) => {
    set((state) => ({
      cartDataLocal: [...state.cartDataLocal, product],
    }));
  },
  removeItem: (i) =>
    set((state) => ({
      cartDataLocal: state.cartDataLocal.filter((item) => item.id !== i),
      id: state.id.filter((item) => item !== i),
    })),
  addID: (i) => {
    set((state) => ({
      id: [...state.id, i],
    }));
  },
}));
