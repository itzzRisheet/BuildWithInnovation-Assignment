import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import CartBtn from "../components/cartBtn";

const axiosConfig = axios.create({
  baseURL: process.env.BASEURL,
});

export const useLocalStorage = create((set, get) => ({
  tokenData: {
    token: false,
  },
  productData: [],
  searchedData: [],
  filterData: [],
  isLoading: false,

  setProductData: async () => {
    set((state) => ({ isLoading: true }));
    axiosConfig
      .get("https://dummyjson.com/products")
      .then((res) => {
        set((state) => ({ isLoading: false }));
        set((state) => ({
          productData: res.data.products,
        }));
      })
      .catch((err) => console.log(err));
    // set({
    //   productData: products,
    // });
  },
  setToken: () => {
    set({
      tokenData: { token: localStorage.getItem("token") ? true : false },
    });
  },
  setSearchedData: async (query) => {
    const products = get().productData;
    const searchedData = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    set((state) => ({
      searchedData: searchedData,
    }));
    // axiosConfig
    //   .get(`https://dummyjson.com/products/search?q=${query}`)
    //   .then((res) => {
    //     set((state) => ({
    //       searchData: res.data.products,
    //     }));
    //   })
    //   .catch((err) => console.log(err));
  },
  filterDataWithPrice: (range) => {
    const min = range[0];
    const max = range[1];
    const products = get().productData;
    const fp = products.filter((product) => {
      return product.price > min && product.price < max;
    });
    set((state) => ({
      filterData: fp,
    }));
  },
}));

export const useCart = create((set, get) => ({
  id: [],
  cartDataLocal: [],
  total: 0,

  setCartDataLocal: (product) => {
    set((state) => ({
      cartDataLocal: [...state.cartDataLocal, product],
    }));
    set((state) => ({
      total: state.total + 1,
    }));
  },
  removeItem: (i) => {
    set((state) => ({
      cartDataLocal: state.cartDataLocal.filter((item) => item.id !== i),
      id: state.id.filter((item) => item !== i),
    }));
    set((state) => ({
      total: state.total - 1,
    }));
  },
  addID: (i) => {
    set((state) => ({
      id: [...state.id, i],
    }));
  },
  incrementItem: (i) => {
    set((state) => {
      const updatedArray = state.cartDataLocal.map((product) => {
        if (product.id === i) {
          set(
            (state = {
              total: state.total + 1,
            })
          );
          return { ...product, total: product.total + 1 };
        }
        return product;
      });

      return {
        cartDataLocal: updatedArray,
      };
    });
  },
  decrementItem: (i) => {
    set((state) => {
      const updatedArray = state.cartDataLocal.map((product) => {
        if (product.id === i) {
          if (product.total > 1) {
            set(
              (state = {
                total: state.total - 1,
              })
            );
            return { ...product, total: product.total - 1 };
          }
        }
        return product;
      });

      return {
        cartDataLocal: updatedArray,
      };
    });
  },
}));
