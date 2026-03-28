/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    const{ SignIn} = UseAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // const loginData = { email, password };
    // console.log(loginData);
    SignIn(email, password)
    .then((result) =>{
        const user = result.user;
        // console.log(user)
        alert("Sign In Successfully");
        navigate("/");

    })
    .catch(error =>{
        alert(error.message);
    })

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-secondary mb-4">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="input w-full input-bordered focus:outline-accent"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input w-full input-bordered focus:outline-accent"
                required
              />
            </div>

            {/* Forgot password */}
            <div className="text-right text-sm">
              <a className="text-accent hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <div className="form-control mt-4">
              <button className="btn flex mx-auto w-full bg-accent text-white hover:bg-secondary border-none">
                Login
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-accent cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;