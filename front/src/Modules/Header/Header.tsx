import React from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { OutlineButton } from "../../UI/button/button";
import { MyLinkNS, NavLink } from "../../UI/link/link";
import { deleteCookie, getCookieValue } from "../../helpers/coockie";
import "./header.scss";

const Header = () => {
  const path = window.location.pathname;

  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("email");
    deleteCookie("firstname");
    deleteCookie("token");
  };

  return (
    <header className={`header w-100 transparent`}>
      {/* ${path === "/" ? "transparent" : ""} */}
      <Navbar expand="xl">
        <div
          className="container d-flex justify-content-between glassmorphism p-4 b-radius"
          itemScope
          itemType="http://www.schema.org/SiteNavigationElement"
        >
          <div className="header__logo">
            {path === "/" ? (
              <img
                src={process.env.PUBLIC_URL + "/image/logo.png"}
                alt="logo"
                className="header__logo-img"
              />
            ) : (
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/image/logo.png"}
                  alt="logo"
                  className="header__logo-img"
                />
              </Link>
            )}
          </div>

          <Navbar.Toggle
            className="header__navbar-btn"
            aria-controls="HeaderNavId"
          >
            <i className="fa fa-outdent" aria-hidden="true"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="HeaderNavId">
            <div className="d-xl-flex justify-content-end w-100">
              <ul className="header__navbar  navbar-nav gap-3 m-xl-0">
                <li className="nav-item">
                  <NavLink to="/voices" itemProp="url">
                    Голосование
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/trops" itemProp="url">
                    Тропы
                  </NavLink>
                </li>
                <li className="nav-item">
                  {getCookieValue("firstname") ? (
                    <Dropdown className="d-flex justify-content-end justify-content-sm-start">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn__outline d-flex justify-content-center align-items-center gap-2"
                      >
                        <span className="adminSidebar__username d-sm-block d-none ">
                          {getCookieValue("firstname")}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>
                          <MyLinkNS
                            to="/"
                            onClick={handleLogout}
                            className="footer__navbar-link"
                          >
                            Выйти
                          </MyLinkNS>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <OutlineButton
                      onClick={() => navigate("/login")}
                      itemProp="url"
                    >
                      Войти
                    </OutlineButton>
                  )}
                </li>
              </ul>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
