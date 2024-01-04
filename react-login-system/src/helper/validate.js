import { toast } from "react-hot-toast";

export async function usernameValidate(values) {
  const errors = verify({}, values);
  return errors;
}

function verify(errors = {}, values) {
  // const specialChar = /[`!@#$%^&*()_+-=\[\]{}';:"\\|,.<>\/?~]/;
  // const numbers = /\d/;

  if (!values.username) {
    errors.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    errors.username = toast.error("Invalid username");
  } else if (!values.password) {
    errors.password = toast.error("Password Required!!!");
  } else if (values.password[0] === "" || values.password[0] === " ") {
    errors.password = toast.error("Please Enter password!!!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("password cannot include spaces!!!");
  }
  // else if (values.password.length < 6) {
  //   errors.password = toast.error("Password must be at least 6 characters");
  // } else if (!specialChar.test(values.password)) {
  //   errors.password = toast.error(
  //     "Password must have at least one Special characters... "
  //   );
  // } else if (!numbers.test(values.password)) {
  //   errors.password = toast.error(
  //     "Password must have at least one numbers... "
  //   );
  // }
  return errors;
}
