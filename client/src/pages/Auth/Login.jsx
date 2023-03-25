import React, { useState, useContext } from "react";
import "./AuthPage.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext)

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const loginHandler = async () => {
    try {
      await axios.post("/api/auth/login",{ ...form }, {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => login(res.data.token, res.data.userId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="auth-page">
        <h3>Login</h3>
        <form className="form form-login" onSubmit={(e) =>  e.preventDefault() }>
          <div className="row">
            <div className="input-field col s12">
              <input type="email" name="email" className="validate" onChange={changeHandler}/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input type="password" name="password" className="validate" onChange={changeHandler}/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <button className="wawes-effect wawes-light btn btn blue" onClick={loginHandler}>
              Enter
            </button>
            <Link to="/registration" className="btn-outline btn-reg">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
