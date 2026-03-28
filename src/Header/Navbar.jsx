import React from "react";
import { Link } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const Navbar = () => {
  const { user, LogOut } = UseAuth();

  const handleSingOut = () => {
    LogOut()
      .then(() => {
        alert("Succesfully Sign Out");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const list = (
    <>
      <Link to="/" className="mr-4 text-secondary">
        Home
      </Link>
      <Link to="/publicHabit" className="mr-4 text-secondary">
        Public Habit
      </Link>
    </>
  );
  const list2 = <></>;
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/60 backdrop-blur-sm shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {list}
            {list2}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-gray-600">
          Habit <span className="text-secondary">Tracker</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {list}
          {list2}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {user && (
          <details className="dropdown relative">
            <summary className="mb-2 list-none">
              <img
                className="w-10 my-auto rounded-4xl h-10"
                src={user?.photoURL}
                alt=""
              />
            </summary>
            <ul className="menu dropdown-content bg-base-100 absolute right-0 mt-2 rounded-box z-50 w-52 p-2 shadow-sm">
              <li>
                <h1 className="font-semibold text-secondary">
                  {user.displayName}
                </h1>
              </li>
              <li>
                <Link to="/addHabit" className="mr-4 text-gray-400">
                  Add Habit
                </Link>
              </li>
              <li>
                <Link to="/myHabit" className="mr-4 text-gray-400">
                  My Habit
                </Link>
              </li>
              <li>
                <button onClick={handleSingOut} className="btn btn-secondary">
                  Log Out
                </button>
              </li>
            </ul>
          </details>
        )}
        {user ? <div></div> : ""}
        {!user ? (
          <Link to="/register" className="btn btn-outline btn-secondary">
            Register
          </Link>
        ) : (
          ""
        )}
        {user ? (
          ""
        ) : (
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
