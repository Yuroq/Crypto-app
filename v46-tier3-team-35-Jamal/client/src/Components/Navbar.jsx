import "../App.css";
import { NavLink } from "react-router-dom";
import { BiHomeAlt2, BiSolidDashboard } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
function NavBar({ auth, setSearch }) {
  const { isAuthenticated, logout } = auth;
  const [input, setInput] = useState("");
  function setInputHandler(e) {
    setInput(e.target.value);
  }

  function setSearchHandler() {
    setSearch(input);
  }

  function submitHandler(e) {
    if (e.key === "Enter") {
      setSearch(input);
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {auth.isAuthenticated() ? (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "profile-nav-Active" : "profile-nav-non-Active"
                  }
                >
                  Profile
                </NavLink>
              </li>
            ) : (
              <button onClick={auth.login}>Log In</button>
            )}
            {isAuthenticated() ? (
              <li>
                <button onClick={logout}>{"Log Out"}</button>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <NavLink to="/dashboard">
          <a className="App-name">Crypto App</a>
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="search">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={setInputHandler}
            onKeyDown={submitHandler}
          />
          <button onClick={setSearchHandler} className="Search-handler">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "Active2" : "non-Active2"
              }
            >
              <AiOutlineSearch className="search-icon" />
            </NavLink>
          </button>
        </div>
        {/* <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "Active2" : "non-Active2")}
        >
          <button className="btn btn-ghost btn-circle">
            <BiHomeAlt2 />
          </button>
        </NavLink> */}

        <NavLink
          to="/dashboard"
          style={{ marginRight: -40 }}
          className={({ isActive }) => (isActive ? "Active2" : "non-Active2")}
        >
          <button className="btn btn-ghost btn-circle">
            <BiSolidDashboard />
          </button>
        </NavLink>
        <NavLink
          to="/favorite"
          className={({ isActive }) => (isActive ? "Active2" : "non-Active2")}
        >
          <button className="btn btn-ghost btn-circle">
            <AiOutlineHeart />
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
