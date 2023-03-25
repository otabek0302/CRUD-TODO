import React, { useState } from "react";
import "./AuthPage.scss";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    };
    const registerHandler = async (e) => {

        try {
            await axios.post('/api/auth/registration', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="auth-page">
                <h3>Registration</h3>
                <form className="form form-login" onSubmit={(e) =>  e.preventDefault() }>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="email" name="email" className="validate" onChange={changeHandler} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="password" name="password" className="validate" onChange={changeHandler} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="wawes-effect wawes-light btn btn blue" onClick={registerHandler}>
                            Register
                        </button>
                        <Link to="/login" className="btn-outline btn-reg">
                            Already Registered
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
