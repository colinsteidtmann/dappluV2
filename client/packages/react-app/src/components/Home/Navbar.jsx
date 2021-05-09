import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header>
      <nav className="navbar navbar-dark py-3">
        <div className="container-fluid">
          <div className="row d-flex align-items-center w-100 gx-0">
            <div className="col-4 ps-3 ps-sm-5">
              <Link className="navbar-brand" to="/">
                Dapplu
              </Link>
            </div>
            <div className="col-8 pe-0 pe-sm-5">
              <div className="navbar-nav flex-row float-end">
                <NavLink activeClassName="active" className="link-light nav-link mx-3" to="/hub">
                  Hub
                </NavLink>
                <NavLink activeClassName="active" className="nav-link link-light mx-3" to="/contracts">
                  Contracts
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
