import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

const initialState = {
  username: "",
  password: "",
  isFetching: false,
};

const Login = (props) => {
  const [login, setLogin] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login, isFetching: true });
    axiosWithAuth()
      .post("/auth/login", login)
      .then((res) => {
        localStorage.setItem("token", res.data.message);
        props.history.push("/bubble-page");
      })
      .catch((err) => {
        console.log(err, "sorry, an error has occured while logging you in");
      });
  };

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <p>Login!</p>

      <form onSubmit ={handleSubmit}>
      <input
            label="Username"
            type="text"
            name="username"
            placeholder="username"
            value={login.username}
            onChange={handleChange}
          />
          <br />
          <input
            label="Password"
            type="text"
            name="password"
            placeholder="password"
            value={login.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Log In</button>
          {login.isFetching && "Please wait...logging you in"}
      </form>
    </div>
  );
};

export default Login;
