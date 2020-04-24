import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios';

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

// const initialState = {
//   username: "",
//   password: "",
//   isFetching: false,
// };

const Login = (props) => {
  const [login, setLogin] = useState({
    username: '',
    password:'',
    isFetching: false
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login, isFetching: true });
    // axios.post('http://localhost:5000/api/login')

    axiosWithAuth()
      .post('/api/login', login)
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", res.data.payload);
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
