import React from "react";
import { Link, LinkProps } from "react-router-dom";
import "./link.scss";

interface MyLinkWidthProps extends LinkProps {}

export const MyLink: React.FC<MyLinkWidthProps> = (props) => {
  return (
    <Link {...props} className={`link d-flex ${props.className}`}>
      {props.children}
    </Link>
  );
};

export const NavLink: React.FC<MyLinkWidthProps> = (props) => {
  return (
    <Link {...props} className={`link__nav d-flex ${props.className}`}>
      {props.children}
    </Link>
  );
};

export const MyLinkWidth: React.FC<MyLinkWidthProps> = (props) => {
  return (
    <Link
      {...props}
      className={`link d-flex justify-content-center w-100 ${props.className}`}
    >
      {props.children}
    </Link>
  );
};

export const MyLinkNS: React.FC<MyLinkWidthProps> = (props) => {
  return (
    <Link
      {...props}
      className={`link-ns d-flex ${props.className}`}
    >
      {props.children}
    </Link>
  );
};

