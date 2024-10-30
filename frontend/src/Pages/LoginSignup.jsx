import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

const LoginSignup = () => {
  const [state, setState] = useState("Login"); // Switch between Login and SignUp
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState(""); // Full name state for signup
  const [email, setEmail] = useState(""); // Email state for both login and signup
  const [mobile, setMobile] = useState(""); // Mobile state for signup
  const [password, setPassword] = useState(""); // Password state for both login and signup
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  const { loginUser } = useContext(GlobalContext);

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = {fullname, username, email, mobile, password }; // Collect user data

    try {
      const response = await fetch("http://localhost:5002/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Send user data in JSON format
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Notify user of successful signup
        setState("Login"); // Switch to login screen after signup
        resetForm(); // Clear input fields after successful signup
      } else {
        setErrorMessage(data.error); // Display error message
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  // Handle Login
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const loginData = { email, password }; // Collect login data

  //   try {
  //     const response = await fetch("http://localhost:5002/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginData), // Send login data in JSON format
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to login");
  //     }

  //     const data = await response.json();


  //     if (response.ok) {
  //       localStorage.setItem("userToken", data.userToken); // Store JWT userToken in localStorage
  //       alert("Login successful");
  //       navigate('/');
  //       // Redirect to a protected/authenticated route (if needed)
  //     } else {
  //       setErrorMessage(data.error); // Show login error message
  //     }
  //   } catch (error) {
  //     setErrorMessage("Something went wrong. Please try again.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to login");
      }
  
      const data = await response.json();
      loginUser(data.userToken); // Call loginUser with the token after successful login
      alert("Login successful!");
      navigate('/');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setUsername("");
    setFullname("");
    setEmail("");
    setMobile("");
    setPassword("");
  };

  return (
    <div className="loginSignup-container">
      {state === "SignUp" ? <h2>Sign Up</h2> : <h2>Login</h2>}

      <form onSubmit={state === "SignUp" ? handleSignup : handleLogin} className="form">
        {state === "SignUp" ? (
          <>
          <div className="input-box">
              <input
                className="input-field"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="label-line">Enter Your Username</div>
            </div>

            <div className="input-box">
              <input
                className="input-field"
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <div className="label-line">Enter Your Fullname</div>
            </div>
            <div className="input-box">
              <input
                className="input-field"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="label-line">Enter Your Email</div>
            </div>
            <div className="input-box">
              <input
                className="input-field"
                type="text"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div className="label-line">Enter Your Mobile Number</div>
            </div>
            <div className="input-box">
              <input
                className="input-field"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="label-line">Enter Your Password</div>
            </div>
          </>
        ) : (
          <>
            <div className="input-box">
              <input
                className="input-field"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="label-line">Enter Your Email</div>
            </div>
            <div className="input-box">
              <input
                className="input-field"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="label-line">Enter Your Password</div>
            </div>
          </>
        )}

        <div className="checkbox">
          <div className="check-have-account">
            {state === "SignUp" ? (
              <>
                <p>
                  Already have an account?{" "}
                  <span onClick={() => setState("Login")} className="signInLink">
                    Login
                  </span>
                </p>
                <div className="termscondition-check">
                  <input type="checkbox" required />
                  <p>
                    By continuing, I agree with the{" "}
                    <span className="termsCondition">terms & conditions</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <p>
                  Don't have an account?{" "}
                  <span onClick={() => setState("SignUp")} className="signInLink">
                    SignUp
                  </span>
                </p>
              </>
            )}
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {state === "SignUp" ? (
          <>
            <input type="submit" value="Sign Up" className="submit-btn" />

            <div className="or">OR</div>

            <div className="signup-google">
              <button>
                <FcGoogle />
                Sign Up With Google
              </button>
            </div>
          </>
        ) : (
          <>
            <input type="submit" value="Login" className="submit-btn" />

            <div className="or">OR</div>

            <div className="signup-google">
              <button>
                <FcGoogle />
                Login With Google
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginSignup;
