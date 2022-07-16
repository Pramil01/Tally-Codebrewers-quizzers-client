import React, { useState } from "react";
import { Navigate } from "react-router-dom";

//Style Sheet
import "./style.css";

//Toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//api
import api from "../../service/api";

const Auth = () => {
  const [toggler, setToggler] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");

  const toastId = React.useRef(null);
  const toggle = () => {
    setToggler(!toggler);
    setUsername("");
    setPassword("");
    setEmail("");
    setCPassword("");
  };

  //SignUp
  const signUp = () => {
    if (!email || !password || !username || !cpassword) {
      showToast("Please fill all the fields!");
      return;
    }
    if (password !== cpassword) {
      showToast("Password and confirm password do not match!");
      return;
    }
    if (password.length < 8) {
      showToast("Password must be 8 characters long.");
      return;
    }
    var emailcheck = /^[A-Za-z0-9]{3,}[@]{1}[A-Za-z]{3,}[.]{1}[A-Za-z]{2,6}$/;
    if (!emailcheck.test(email)) {
      showToast("Invalid Email Address !!");
      return;
    }

    api
      .post("auth/", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setRedirect(true);
        localStorage.setItem("Admin", username);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          showToast(err.response.data.msg);
        } else {
          showToast("Some error occurred, try again");
        }
      });
  };

  //logIn
  const logIn = () => {
    if (!password || !username) {
      showToast("Please fill all the fields!");
      return;
    }
    if (password.length < 8) {
      showToast("Password must be 8 characters long.");
      return;
    }

    api
      .post("auth/login/", {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        setRedirect(true);
        localStorage.setItem("Admin", username);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          showToast(err.response.data.msg);
        } else {
          showToast("Some error occurred, try again");
        }
      });
  };

  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };
  return (
    <>
      {redirect && <Navigate to="/adminWindow" />}
      <div className="outerContainer">
        <div className="content">
          <div className="container cont1"></div>
          <div className="container cont2">
            {toggler && (
              <div className="login" id="loginid">
                <h1>LOGIN</h1>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <br />
                {/* <div className="enquire">
            <a href="/">
              <input type="checkbox" />
              Remember me
            </a>
            <a href="/">Forgot Password?</a>
          </div> */}
                <button className="btn btn1" onClick={logIn}>
                  LOGIN
                </button>
                <br />
                {/* <div className="or">
            <h1>OR</h1>
          </div> */}
                {/* <div className="option">
            <button className="media media1">Login with Facebook</button>
            <br />
            <button className="media media2">Login with Google</button>
            <br />
            <button className="media media3">Login with Github</button>
            <br />
          </div> */}
                <div className="ask" onClick={toggle}>
                  No account? Create one, Click Here !!!
                </div>
                <br />
              </div>
            )}
            {!toggler && (
              <div className="signup" id="signupid">
                <h1>Create Account</h1>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <br />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <br />
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                />
                <br />
                {/* <a href="/">
            <input type="checkbox" /> I agree to Terms and Conditions and
            Privacy Policy.
          </a> */}
                <br />
                <button className="btn btn3" onClick={signUp}>
                  CREATE ACCOUNT
                </button>
                <br />
                <div className="ask" onClick={toggle}>
                  Already have an account. Click Here !!!
                </div>
                {/* <div className="or">
            <h1>OR</h1>
          </div>
          <div className="option">
            <button className="media media1">Login with Facebook</button>
            <br />
            <button className="media media2">Login with Google</button>
            <br />
            <button className="media media3">Login with Github</button>
            <br /> 
          </div>*/}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
};

export default Auth;
