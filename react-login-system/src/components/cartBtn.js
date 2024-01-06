import React, { useEffect, useState } from "react";
import "../styles/cartbtn.css";
import { useCart } from "../store/zusStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";

function CartBtn({ func, temp, i, inCart }) {
  const ids = useCart((state) => state.id);
  const [cartStatus, setCartStatus] = useState(false);
  const [btnValue, setbtnValue] = useState("");
  useEffect(() => {
    if (ids.includes(i)) {
      setCartStatus(true);
    }
    if (inCart) {
      setbtnValue("remove ");
    } else {
      if (cartStatus) {
        setbtnValue("added to cart");
      } else {
        setbtnValue("add to cart");
      }
    }
  }, [ids, cartStatus, i, inCart]);

  return (
    <div>
      <button className="CartBtn" onClick={func}>
        <span className="IconContainer">
          {cartStatus ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCartShopping} className="cart" />
          )}
        </span>
        <p className="text">{btnValue}</p>
      </button>
    </div>
  );
}

export default CartBtn;
