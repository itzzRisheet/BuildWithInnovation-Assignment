import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";
// import { Home } from "lucide-react";
import { useCart, useLocalStorage } from "../store/zusStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHouse } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { token } = useLocalStorage((state) => state.tokenData);
  const setToken = useLocalStorage((state) => state.setToken);
  const cartDataLocal = useCart((state) => state.cartDataLocal);

  useEffect(() => {}, [token]);
  const [hovered, setHovered] = useState(false);
  return (
    <div className="nav">
      <ul>
        <div className="left">
          <li>
            <Link to={"/"} className="icon">
              <FontAwesomeIcon
                icon={faHouse}
                size="xl"
                bounce={hovered}
                onMouseEnter={() => {
                  setHovered(true);
                }}
                onMouseLeave={() => {
                  setHovered(false);
                }}
              />
            </Link>
          </li>
        </div>

        <div className="right">
          {
            <li>
              <Link
                to={"/login"}
                id="login"
                onClick={() => {
                  if (token) {
                    localStorage.removeItem("token");
                    setToken(false);
                  }
                }}
              >
                {token ? "logout" : "Login"}
              </Link>
            </li>
          }
          <li>
            <Link to={"/cart"} className="icon">
              <FontAwesomeIcon icon={faCartShopping} />
              <span>{cartDataLocal.length}</span>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
