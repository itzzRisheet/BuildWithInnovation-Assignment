import axios from "axios";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import toast from "react-hot-toast";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../store/zusStore";
import { motion } from "framer-motion";

function Login() {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  const setToken = useLocalStorage((state) => state.setToken);

  const navigate = useNavigate();

  const uniqueID = uuid();

  const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
  });

  const formik = useFormik({
    initialValues: {
      username: "rshawe2",
      password: "OWsTbMUgFc",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: usernameValidate,

    onSubmit: async (values) => {
      const toastID = toast.loading("Connecting...");
      await axiosConfig
        .post("/auth/login", JSON.stringify(values), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.success("loggedIn successfully");
          toast.remove(toastID);
          localStorage.setItem("token", uniqueID);
          setToken(true);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    },
  });

  return (
    <motion.div
      className="logincontainer"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0% " }}
    >
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="logincard">
          <a href="" className="login">
            Login
          </a>
          <div className="inputBox">
            <input {...formik.getFieldProps("username")} type="text" />
            <span className="user">Username</span>
          </div>
          <div className="inputBox">
            <input {...formik.getFieldProps("password")} type="password" />
            <span>Password</span>
          </div>
          <button className="enter" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Login;
